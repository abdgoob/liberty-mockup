import type { LucideIcon } from "lucide-react";
import {
  Flower2,
  Hammer,
  House,
  Leaf,
  MessagesSquare,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";

export type ProjectType =
  | "landscape-design"
  | "patios-hardscaping"
  | "outdoor-living"
  | "garden-care";

export type QualificationAnswers = {
  projectType: ProjectType | "";
  propertyScope: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  notes: string;
};

export type ProjectOption = {
  value: ProjectType;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const projectOptions: ProjectOption[] = [
  {
    value: "landscape-design",
    title: "Landscape design",
    description: "A complete, considered plan for a garden that feels naturally yours.",
    icon: PencilRuler,
  },
  {
    value: "patios-hardscaping",
    title: "Patios and hardscaping",
    description: "Beautifully laid stonework, paths, walls, and practical structure.",
    icon: Hammer,
  },
  {
    value: "outdoor-living",
    title: "Outdoor living",
    description: "Inviting spaces for cooking, gathering, relaxing, and staying awhile.",
    icon: House,
  },
  {
    value: "garden-care",
    title: "Garden care",
    description: "Thoughtful seasonal care that keeps every detail looking its best.",
    icon: Flower2,
  },
];

export const trustPoints = [
  { value: "15+", label: "years of craft" },
  { value: "120", label: "gardens transformed" },
  { value: "4.9", label: "homeowner rating" },
  { value: "5 yr", label: "workmanship promise" },
];

export const portfolio = [
  {
    title: "A garden made for gathering",
    category: "Outdoor living · West Chester",
    image: "/images/project-01.png",
    alt: "Landscaped outdoor living terrace with natural stone and mature planting",
    className: "md:col-span-7",
  },
  {
    title: "A gracious new arrival",
    category: "Front garden · Wayne",
    image: "/images/project-02.png",
    alt: "Refined front garden entry with stone path and layered planting",
    className: "md:col-span-5",
  },
  {
    title: "A quiet corner, reimagined",
    category: "Garden retreat · Media",
    image: "/images/project-03.png",
    alt: "Intimate garden path with rich planting and warm landscape lighting",
    className: "md:col-span-12",
  },
];

export const benefits = [
  {
    title: "Designed around real life",
    text: "Every choice begins with how you want to use your outdoor space—not a one-size-fits-all template.",
    icon: Trees,
  },
  {
    title: "One team, start to finish",
    text: "Designers, craftspeople, and horticulturalists work as one, with a single point of contact throughout.",
    icon: MessagesSquare,
  },
  {
    title: "Built beautifully, built to last",
    text: "Proven construction methods, honest materials, and details that age with character rather than wear out.",
    icon: ShieldCheck,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Walk the space",
    text: "We listen, look, and learn how the garden needs to work for you.",
  },
  {
    number: "02",
    title: "Shape the vision",
    text: "A clear design brings together layout, materials, planting, and budget.",
  },
  {
    number: "03",
    title: "Build with care",
    text: "Our own team delivers the work with tidy sites and regular updates.",
  },
  {
    number: "04",
    title: "Let it flourish",
    text: "A thoughtful handover and optional care plan protect your investment.",
  },
];

export const testimonials = [
  {
    quote:
      "Liberty understood that we wanted something elegant, but never precious. The garden feels as though it has always belonged to the house.",
    name: "Claire & David M.",
    detail: "Full garden transformation",
  },
  {
    quote:
      "From the first sketch to the final planting day, communication was exceptional. We use the terrace almost every evening now.",
    name: "Sarah T.",
    detail: "Outdoor living terrace",
  },
];

export const scopeOptions = [
  "One focused area",
  "Several connected spaces",
  "A full property transformation",
  "Not sure yet — I need guidance",
];

export const budgetOptions = [
  "$15k – $30k",
  "$30k – $60k",
  "$60k – $100k",
  "$100k+",
  "I’d like help setting a budget",
];

export const timelineOptions = [
  "As soon as possible",
  "Within 3–6 months",
  "Within 6–12 months",
  "I’m planning ahead",
];

export const footerLinks = ["Services", "Our work", "Process", "Start a project"];

export const brandMarks = { primary: Leaf, accent: Sparkles };
