import type { Article } from "@/types";

/**
 * Demonstration articles. General wellbeing information only — nothing here
 * is medical advice, and all authors are fictional.
 */
export const articles: Article[] = [
  {
    id: "art-1",
    slug: "what-to-expect-at-a-routine-health-check",
    title: "What to expect at a routine health check",
    excerpt:
      "A routine check is mostly conversation and a handful of simple measurements. Knowing the shape of the appointment makes it easier to use the time well.",
    category: "Preventive Health",
    image: "/images/article-screening.jpg",
    imageAlt: "A clinician measuring a patient's blood pressure with a cuff and stethoscope",
    publishedAt: "2025-11-18",
    readingTime: 6,
    author: {
      name: "Dr Amara Osei",
      role: "Consultant Cardiologist",
      avatar: "/images/doctor-amara-osei.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "Most people arrive at a routine health check expecting tests. In practice, the majority of the appointment is a structured conversation: what has changed since last time, what you have noticed, and what matters to you over the next year. The measurements that follow are there to give that conversation something concrete to sit on.",
      },
      { type: "heading", text: "Before the appointment" },
      {
        type: "paragraph",
        text: "It helps to arrive with a short list. Clinicians work with limited time, and a written prompt means the thing you most wanted to raise does not get remembered on the walk back to the car park.",
      },
      {
        type: "list",
        items: [
          "Any symptoms you have noticed, and roughly when they started",
          "A current list of medicines, including anything bought over the counter",
          "Relevant family history, particularly heart, diabetes or cancer",
          "Questions you would like answered before you leave",
        ],
      },
      { type: "heading", text: "During the appointment" },
      {
        type: "paragraph",
        text: "Expect height, weight, blood pressure and, depending on your age and history, a blood test. None of these are pass or fail. A single reading is a snapshot, and clinicians are far more interested in the direction of travel across several readings than in any one number.",
      },
      {
        type: "callout",
        title: "A note on blood pressure",
        text: "It is common for a first reading to be higher than usual simply because you are in a clinical setting. If yours is raised, your clinician may repeat it later in the appointment or ask you to record readings at home over a week.",
      },
      { type: "heading", text: "Afterwards" },
      {
        type: "paragraph",
        text: "You should leave knowing three things: what was measured, what the results mean in your particular context, and what happens next. If any of those are unclear, it is entirely reasonable to ask before the appointment ends. Results that come back later are added to your record, and your care team will contact you if anything needs action.",
      },
      {
        type: "paragraph",
        text: "If you are unsure whether a check is due, speak to your primary care team. Frequency depends on age, family history and any existing conditions rather than on a fixed schedule that applies to everyone.",
      },
    ],
  },
  {
    id: "art-2",
    slug: "understanding-blood-pressure-numbers",
    title: "Understanding your blood pressure numbers",
    excerpt:
      "Two numbers, one reading, and a great deal of confusion. Here is what systolic and diastolic actually describe, and why context matters more than a single result.",
    category: "Heart & Vascular",
    image: "/images/article-heart.jpg",
    imageAlt: "A stethoscope and blood pressure cuff resting on a folded cloth",
    publishedAt: "2025-10-29",
    readingTime: 7,
    author: {
      name: "Dr Amara Osei",
      role: "Consultant Cardiologist",
      avatar: "/images/doctor-amara-osei.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "A blood pressure reading is written as one number over another. The first, systolic, is the pressure in your arteries when the heart contracts. The second, diastolic, is the pressure between beats, when the heart is refilling. Both are measured in millimetres of mercury.",
      },
      { type: "heading", text: "Why one reading is rarely enough" },
      {
        type: "paragraph",
        text: "Blood pressure moves throughout the day. It rises with activity, stress, caffeine and conversation, and falls during rest and sleep. A reading taken two minutes after hurrying into a waiting room is not describing the same thing as a reading taken after five quiet minutes seated.",
      },
      {
        type: "list",
        items: [
          "Sit quietly for a few minutes before measuring",
          "Keep your arm supported at roughly heart height",
          "Avoid caffeine and exercise in the half hour beforehand",
          "Record the date and time alongside each reading",
        ],
      },
      { type: "heading", text: "What clinicians look for" },
      {
        type: "paragraph",
        text: "Your care team considers the pattern across multiple readings, alongside your age, medical history and other risk factors. That combined picture, rather than any single result, is what informs whether treatment is discussed.",
      },
      {
        type: "callout",
        title: "When to seek help sooner",
        text: "Very high readings accompanied by chest pain, breathlessness, visual changes or severe headache should be treated as urgent. Contact emergency services rather than waiting for a scheduled appointment.",
      },
      {
        type: "paragraph",
        text: "Lifestyle measures — regular movement, reduced salt, moderating alcohol, and sleep — remain the first line of discussion for most people. Where medication is appropriate, your clinician will explain what it does and how it will be reviewed.",
      },
    ],
  },
  {
    id: "art-3",
    slug: "sleep-and-recovery-after-surgery",
    title: "Sleep and recovery after surgery",
    excerpt:
      "Rest does more for post-operative recovery than most people expect, and it is often the part of the plan that gets least attention.",
    category: "Family Care",
    image: "/images/article-sleep.jpg",
    imageAlt: "A quiet single hospital room with a made bed and a chair by the window",
    publishedAt: "2025-10-07",
    readingTime: 5,
    author: {
      name: "Mr Elias Mensah",
      role: "Consultant Surgeon",
      avatar: "/images/doctor-elias-mensah.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "Recovery plans tend to focus on wound care, medication and activity. Sleep is mentioned less often, which is unfortunate, because it is during rest that a good deal of tissue repair takes place.",
      },
      { type: "heading", text: "Why sleep is disrupted after an operation" },
      {
        type: "paragraph",
        text: "Several things converge at once: discomfort, an unfamiliar sleeping position, changes to routine, and sometimes the medication itself. It is very common for the first several nights at home to be broken, and that is expected rather than a sign something is wrong.",
      },
      {
        type: "list",
        items: [
          "Take pain relief as prescribed rather than waiting for discomfort to build",
          "Keep the room cool, dark and as quiet as is practical",
          "Return to a regular wake time even after a poor night",
          "Limit daytime naps to short periods in the early afternoon",
        ],
      },
      {
        type: "callout",
        title: "Speak to your team if",
        text: "Pain is not controlled by your prescribed medication, you develop a fever, or the wound becomes increasingly red, swollen or begins to discharge. These warrant a call rather than watchful waiting.",
      },
      {
        type: "paragraph",
        text: "Most people find sleep settles within two to three weeks as discomfort reduces and normal routine returns. If it has not, mention it at your follow-up appointment — it is a legitimate part of recovery and worth reviewing properly.",
      },
    ],
  },
  {
    id: "art-4",
    slug: "building-a-balanced-plate",
    title: "Building a balanced plate without counting anything",
    excerpt:
      "Practical structure beats arithmetic for most people. A simple way to think about proportions that survives contact with real life.",
    category: "Nutrition",
    image: "/images/article-nutrition.jpg",
    imageAlt: "A bowl of mixed vegetables, chickpeas and avocado seen from above",
    publishedAt: "2025-09-22",
    readingTime: 6,
    author: {
      name: "Ines Carvalho",
      role: "Clinical Dietitian",
      avatar: "/images/avatar-author-1.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "Detailed tracking works well for some people and collapses quickly for most. A proportional approach asks a simpler question at each meal: what is on the plate, and roughly in what ratio.",
      },
      { type: "heading", text: "A workable starting structure" },
      {
        type: "list",
        items: [
          "Around half the plate: vegetables or salad, with variety across the week",
          "Around a quarter: a protein source — fish, poultry, pulses, eggs or tofu",
          "Around a quarter: a starchy food, favouring wholegrain versions",
          "A small amount of unsaturated fat — olive oil, nuts or seeds",
        ],
      },
      {
        type: "paragraph",
        text: "This is a guide, not a rule. Meals that do not fit the shape are not a failure, and a week is a more useful unit of assessment than a single plate.",
      },
      { type: "heading", text: "Where it needs adjusting" },
      {
        type: "paragraph",
        text: "People living with diabetes, kidney conditions, coeliac disease or during pregnancy may need a different balance. Recovery from illness or surgery often requires more protein than usual. In any of these situations, a referral to a dietitian is worthwhile.",
      },
      {
        type: "callout",
        title: "This is general information",
        text: "Nothing here replaces individual advice. If you have a diagnosed condition or take medication that interacts with diet, speak to your clinician before making significant changes.",
      },
    ],
  },
  {
    id: "art-5",
    slug: "a-familys-year-in-cardiac-rehabilitation",
    title: "A family's year in cardiac rehabilitation",
    excerpt:
      "Rehabilitation is rarely a straight line. One family describes what the twelve months after a cardiac event actually looked like.",
    category: "Patient Stories",
    image: "/images/article-recovery.jpg",
    imageAlt: "A person exercising on a mat during a supervised rehabilitation session",
    publishedAt: "2025-09-03",
    readingTime: 8,
    author: {
      name: "Solis Editorial Team",
      role: "Communications",
      avatar: "/images/avatar-author-2.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "This account is a composite drawn from anonymised experiences shared with our rehabilitation team. It is included to illustrate the shape of a typical year, not to describe any individual patient.",
      },
      { type: "heading", text: "The first six weeks" },
      {
        type: "paragraph",
        text: "The early phase is mostly about confidence. Many people describe being reluctant to exert themselves at all, uncertain which sensations are normal. Supervised sessions exist partly to rebuild that confidence in a monitored setting.",
      },
      { type: "heading", text: "Months two to six" },
      {
        type: "paragraph",
        text: "Progress tends to be uneven. A strong fortnight is often followed by a flat one, and families frequently find the emotional adjustment harder than the physical one. Rehabilitation programmes usually include psychological support for exactly this reason.",
      },
      {
        type: "list",
        items: [
          "Structured exercise sessions, gradually increasing in intensity",
          "Medication review at regular intervals",
          "Dietary support where it is wanted",
          "Sessions that include partners and family members",
        ],
      },
      {
        type: "paragraph",
        text: "By the end of the first year most participants have moved to independent activity with periodic review. The measure that matters is not a number on a treadmill but whether ordinary life — work, travel, time with family — has become possible again.",
      },
    ],
  },
  {
    id: "art-6",
    slug: "how-imaging-fits-into-a-diagnosis",
    title: "How imaging fits into a diagnosis",
    excerpt:
      "A scan answers a specific question. Understanding which question yours was ordered to answer makes the result far easier to interpret.",
    category: "Research & Innovation",
    image: "/images/article-imaging.jpg",
    imageAlt: "A laboratory technician working at a bench of specialist equipment",
    publishedAt: "2025-08-14",
    readingTime: 7,
    author: {
      name: "Dr Tomas Varga",
      role: "Consultant Radiologist",
      avatar: "/images/doctor-tomas-varga.jpg",
    },
    body: [
      {
        type: "paragraph",
        text: "Imaging is often described as though it produces a verdict. It is better understood as a tool for answering a narrow question that a clinician has already formed. The value of the answer depends heavily on how good the question was.",
      },
      { type: "heading", text: "Different tools, different questions" },
      {
        type: "list",
        items: [
          "X-ray — quick assessment of bone and some chest conditions",
          "Ultrasound — soft tissue and blood flow, with no ionising radiation",
          "CT — detailed cross-sections, valuable in urgent situations",
          "MRI — high soft-tissue detail, particularly for the brain, spine and joints",
        ],
      },
      {
        type: "paragraph",
        text: "Choosing between them is a clinical judgement that weighs what needs to be seen against how quickly it is needed and what exposure is involved. More detail is not automatically better if it does not change what happens next.",
      },
      { type: "heading", text: "Incidental findings" },
      {
        type: "paragraph",
        text: "Scans occasionally show something unrelated to the original question. Most incidental findings turn out to be harmless, but they can cause considerable anxiety. Your clinician will explain whether a finding needs follow-up or simply noting in your record.",
      },
      {
        type: "callout",
        title: "Waiting for results",
        text: "Reporting takes time because it is done carefully. Urgent scans are prioritised and results are passed directly to the requesting clinician. If you have not heard within the timeframe you were given, it is reasonable to contact the department.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, limit);
  const sameCategory = articles.filter(
    (article) => article.slug !== slug && article.category === current.category,
  );
  const others = articles.filter(
    (article) => article.slug !== slug && article.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const articleCategories = Array.from(
  new Set(articles.map((article) => article.category)),
);
