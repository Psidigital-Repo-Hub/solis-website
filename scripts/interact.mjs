/**
 * Interaction QA: exercises the drawer, the appointment form's validation
 * and success paths, the doctor directory filters, and keyboard focus.
 * Captures a screenshot at each interesting state.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const dir = "/tmp/solis-shots/interact";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
const results = [];
const note = (label, ok, detail = "") =>
  results.push(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);

const hideDevTools = `nextjs-portal,[data-nextjs-toast]{display:none!important}`;

/* ---------------------------------------------------------------- */
/*  1. Mobile drawer                                                 */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideDevTools });

  await page.getByRole("button", { name: /open main menu/i }).click();
  await page.waitForTimeout(600);
  const dialogVisible = await page.getByRole("dialog").isVisible();
  note("drawer opens", dialogVisible);

  // Expand the Services submenu.
  await page.getByRole("button", { name: /expand services submenu/i }).click();
  await page.waitForTimeout(350);
  const subItem = page.getByRole("link", { name: "Cardiology", exact: true });
  note("submenu expands", await subItem.isVisible());
  await page.screenshot({ path: `${dir}/drawer-open.png` });

  // Escape closes.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  note("Escape closes drawer", !(await page.getByRole("dialog").isVisible().catch(() => false)));

  // Navigating closes it.
  await page.getByRole("button", { name: /open main menu/i }).click();
  await page.waitForTimeout(500);
  await page.getByRole("link", { name: "Doctors", exact: true }).click();
  await page.waitForTimeout(900);
  const closedAfterNav = !(await page
    .getByRole("dialog")
    .isVisible()
    .catch(() => false));
  note("drawer closes on navigation", closedAfterNav, page.url());

  await page.close();
}

/* ---------------------------------------------------------------- */
/*  2. Appointment form                                              */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/appointments`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideDevTools });

  // Submit empty — expect blocking validation, no navigation.
  await page.getByRole("button", { name: /send appointment request/i }).click();
  await page.waitForTimeout(700);
  const errorCount = await page.locator("p.text-destructive").count();
  note("empty submit shows errors", errorCount >= 5, `${errorCount} messages`);

  const invalidInputs = await page.locator("[aria-invalid='true']").count();
  note("invalid controls flagged for AT", invalidInputs >= 4, `${invalidInputs} controls`);
  await page.screenshot({ path: `${dir}/form-errors.png`, fullPage: false });

  // Dependent select is disabled until a department is chosen.
  const doctorDisabledBefore = await page.locator("#doctor").isDisabled();
  await page.selectOption("#department", "cardiology");
  await page.waitForTimeout(400);
  const doctorDisabledAfter = await page.locator("#doctor").isDisabled();
  const doctorOptions = await page.locator("#doctor option").count();
  note(
    "clinician select unlocks with department",
    doctorDisabledBefore && !doctorDisabledAfter && doctorOptions > 1,
    `${doctorOptions} options`,
  );

  // Fill a valid request.
  await page.fill("#fullName", "Jordan Whitfield");
  await page.fill("#email", "jordan@example.com");
  await page.fill("#phone", "+1 555 010 2030");
  await page.selectOption("#isNewPatient", "no");
  const future = new Date();
  future.setDate(future.getDate() + 14);
  await page.fill("#preferredDate", future.toISOString().slice(0, 10));
  await page.selectOption("#preferredTime", "morning");
  await page.fill("#reason", "Follow-up after a recent echocardiogram.");
  await page.check("#consent");

  await page.getByRole("button", { name: /send appointment request/i }).click();
  await page.waitForTimeout(1800);

  const success = await page.getByText(/request received/i).isVisible();
  note("valid submit reaches success state", success);

  const focused = await page.evaluate(
    () => document.activeElement?.getAttribute("role") ?? "",
  );
  note("focus moves to confirmation", focused === "status", `activeElement role="${focused}"`);
  await page.screenshot({ path: `${dir}/form-success.png` });

  // Past dates are rejected.
  await page.getByRole("button", { name: /request another appointment/i }).click();
  await page.waitForTimeout(500);
  await page.fill("#preferredDate", "2020-01-01");
  await page.locator("#preferredDate").blur();
  await page.waitForTimeout(500);
  const dateError = await page.locator("#preferredDate-error").textContent();
  note("past date rejected", Boolean(dateError), dateError?.trim());

  await page.close();
}

/* ---------------------------------------------------------------- */
/*  3. Doctor directory                                              */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/doctors`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideDevTools });

  const initial = await page.locator("ul > li > a[href^='/doctors/']").count();

  await page.fill("#doctor-search", "spanish");
  await page.waitForTimeout(500);
  const byLanguage = await page.locator("ul > li > a[href^='/doctors/']").count();
  note("search matches language", byLanguage === 1 && initial === 8, `${initial} → ${byLanguage}`);

  await page.fill("#doctor-search", "");
  await page.selectOption("#doctor-department", "cardiology");
  await page.waitForTimeout(400);
  const byDept = await page.locator("ul > li > a[href^='/doctors/']").count();
  note("department filter works", byDept === 1, `${byDept} result`);

  await page.fill("#doctor-search", "zzzznomatch");
  await page.waitForTimeout(400);
  const empty = await page.getByText(/no clinicians match that search/i).isVisible();
  note("empty state renders", empty);
  await page.screenshot({ path: `${dir}/directory-empty.png` });

  await page.close();
}

/* ---------------------------------------------------------------- */
/*  4. Keyboard + focus visibility                                   */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideDevTools });

  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  note("skip link is first tab stop", /skip to main content/i.test(first ?? ""), first);
  await page.screenshot({ path: `${dir}/skip-link.png` });

  // Tab into the header nav; the "About" trigger should open on focus.
  // Scoped to <header> because the footer carries the same link labels.
  const header = page.locator("header");
  for (let i = 0; i < 2; i += 1) await page.keyboard.press("Tab");
  await page.waitForTimeout(400);

  const aboutTrigger = header.getByRole("link", { name: "About", exact: true });
  const dropdownOpen =
    (await aboutTrigger.getAttribute("aria-expanded")) === "true" &&
    (await header.getByRole("link", { name: /^Our story/ }).isVisible());
  note("nav dropdown opens on keyboard focus", dropdownOpen);
  await page.screenshot({ path: `${dir}/nav-focus.png` });

  // Focus should move into the panel, not skip past it.
  await page.keyboard.press("Tab");
  await page.waitForTimeout(250);
  const insidePanel = await page.evaluate(() =>
    /Our story/.test(document.activeElement?.textContent ?? ""),
  );
  note("focus enters the dropdown panel", insidePanel);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  const dropdownClosed =
    (await header.getByRole("link", { name: /^Our story/ }).count()) === 0;
  note("Escape closes nav dropdown", dropdownClosed);

  await page.close();
}

/* ---------------------------------------------------------------- */
/*  5. Reduced motion                                                */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: hideDevTools });
  await page.waitForTimeout(900);

  // Content well below the fold must already be visible, not waiting on a
  // scroll trigger that never fires without motion.
  const hidden = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("main *"));
    return nodes.filter((el) => {
      const style = getComputedStyle(el);
      return style.opacity === "0" && el.getBoundingClientRect().height > 40;
    }).length;
  });
  note("no content stuck at opacity 0 under reduced motion", hidden === 0, `${hidden} nodes`);

  const counter = await page.getByText("240k").first().isVisible();
  note("counters show final value under reduced motion", counter);

  await page.close();
}

console.log(results.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL")).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);

await browser.close();
process.exit(failed ? 1 : 0);
