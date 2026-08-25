import * as React from "react";
import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  BriefcaseMedical,
  Building2,
  CalendarDays,
  Clock,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Layers,
  LineChart,
  MessageCircle,
  Pill,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Brand glyphs.
 *
 * Lucide removed its brand marks in v1, so the three social icons the
 * footer needs are declared locally. They take the same props as a Lucide
 * icon so the registry can treat them interchangeably.
 */
type GlyphProps = React.SVGProps<SVGSVGElement>;

const glyphBase = (props: GlyphProps) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

function Facebook(props: GlyphProps) {
  return (
    <svg {...glyphBase(props)}>
      <path d="M14.5 8.5V6.9c0-.7.2-1.1 1.2-1.1H17V3.1c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H9.2V11h2.4v8h2.9v-8h2.4l.4-2.5h-2.8Z" />
    </svg>
  );
}

function Linkedin(props: GlyphProps) {
  return (
    <svg {...glyphBase(props)}>
      <path d="M7.1 19H4.4V9.4h2.7V19ZM5.7 8.2a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM19.6 19h-2.7v-4.7c0-1.2-.4-2-1.5-2-.8 0-1.3.6-1.5 1.1-.1.2-.1.5-.1.8V19H9.1s0-8.6 0-9.6h2.7v1.4c.4-.6 1-1.5 2.6-1.5 1.9 0 3.2 1.2 3.2 3.9V19Z" />
    </svg>
  );
}

function Instagram(props: GlyphProps) {
  return (
    <svg {...glyphBase(props)}>
      <path
        fillRule="evenodd"
        d="M8.2 3h7.6A5.2 5.2 0 0 1 21 8.2v7.6a5.2 5.2 0 0 1-5.2 5.2H8.2A5.2 5.2 0 0 1 3 15.8V8.2A5.2 5.2 0 0 1 8.2 3Zm0 1.8A3.4 3.4 0 0 0 4.8 8.2v7.6a3.4 3.4 0 0 0 3.4 3.4h7.6a3.4 3.4 0 0 0 3.4-3.4V8.2a3.4 3.4 0 0 0-3.4-3.4H8.2ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.9-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Icon registry.
 *
 * Content records reference icons by name so that data can live in a CMS
 * without importing components. Unknown names fall back to a neutral mark
 * rather than throwing at render time.
 */
const registry = {
  activity: Activity,
  ambulance: Ambulance,
  baby: Baby,
  bone: Bone,
  brain: Brain,
  "briefcase-medical": BriefcaseMedical,
  "building-2": Building2,
  "calendar-days": CalendarDays,
  clock: Clock,
  facebook: Facebook,
  "flask-conical": FlaskConical,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  instagram: Instagram,
  layers: Layers,
  "line-chart": LineChart,
  linkedin: Linkedin,
  "message-circle": MessageCircle,
  pill: Pill,
  "scan-line": ScanLine,
  "shield-check": ShieldCheck,
  stethoscope: Stethoscope,
  users: Users,
};

export type IconName = keyof typeof registry;

type AnyIcon = LucideIcon | ((props: GlyphProps) => React.ReactElement);

export function getIcon(name: string): AnyIcon {
  return registry[name as IconName] ?? ShieldCheck;
}

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  const Component = getIcon(name) as LucideIcon;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />;
}
