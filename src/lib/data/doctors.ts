import type { Doctor } from "@/types";

/**
 * Fictional clinicians used for demonstration. Names, credentials and
 * biographies are placeholders and do not describe real practitioners.
 */
export const doctors: Doctor[] = [
  {
    id: "doc-1",
    slug: "amara-osei",
    name: "Dr Amara Osei",
    credentials: "MD, FACC",
    specialty: "Interventional Cardiology",
    department: "cardiology",
    image: "/images/doctor-amara-osei.jpg",
    bio: "Dr Osei leads the interventional cardiology service and has a particular interest in the long-term management of coronary artery disease. She runs a combined clinic with the heart failure nursing team so that medication reviews, rehabilitation and follow-up imaging are planned in a single visit rather than spread across several appointments.",
    qualifications: [
      "MD, Wraithmoor University School of Medicine",
      "Fellowship in Interventional Cardiology",
      "Member, National Cardiovascular Society",
    ],
    focusAreas: [
      "Coronary artery disease",
      "Heart failure",
      "Preventive cardiology",
    ],
    languages: ["English", "French"],
    experience: 16,
    location: "Cardiovascular Institute, Level 3",
  },
  {
    id: "doc-2",
    slug: "daniel-reyes",
    name: "Dr Daniel Reyes",
    credentials: "MD, FAAP",
    specialty: "General Paediatrics",
    department: "pediatrics",
    image: "/images/doctor-daniel-reyes.jpg",
    bio: "Dr Reyes has worked in general paediatrics for over a decade and sees children from infancy through adolescence. He is known for taking time over explanations, and his clinics are scheduled with longer slots so that families leave understanding both the plan and the reasoning behind it.",
    qualifications: [
      "MD, Ridgemont College of Medicine",
      "Residency in Paediatrics",
      "Certified in Paediatric Advanced Life Support",
    ],
    focusAreas: [
      "Childhood asthma",
      "Developmental assessment",
      "Allergy and immunology",
    ],
    languages: ["English", "Spanish"],
    experience: 12,
    location: "Children's Wing, Level 1",
  },
  {
    id: "doc-3",
    slug: "hannah-lindqvist",
    name: "Dr Hannah Lindqvist",
    credentials: "MD, PhD",
    specialty: "Neurology",
    department: "neurology",
    image: "/images/doctor-hannah-lindqvist.jpg",
    bio: "Dr Lindqvist specialises in headache disorders and epilepsy. Her research background informs a methodical approach to diagnosis, and she works closely with the neurophysiology team so that investigations are sequenced sensibly rather than requested all at once.",
    qualifications: [
      "MD, PhD in Clinical Neuroscience",
      "Fellowship in Epilepsy and Neurophysiology",
      "Member, International Headache Society",
    ],
    focusAreas: ["Epilepsy", "Chronic migraine", "Neurophysiology"],
    languages: ["English", "Swedish", "German"],
    experience: 14,
    location: "Neurosciences Centre, Level 4",
  },
  {
    id: "doc-4",
    slug: "marcus-bell",
    name: "Mr Marcus Bell",
    credentials: "MBBS, FRCS",
    specialty: "Orthopaedic Surgery",
    department: "orthopedics",
    image: "/images/doctor-marcus-bell.jpg",
    bio: "Mr Bell is an orthopaedic surgeon focused on hip and knee conditions. He assesses jointly with the physiotherapy team, and where surgery is the right option he plans rehabilitation before the operation is booked so recovery expectations are clear from the outset.",
    qualifications: [
      "MBBS, Harborough Medical School",
      "FRCS (Trauma & Orthopaedics)",
      "Fellowship in Lower Limb Reconstruction",
    ],
    focusAreas: [
      "Hip and knee replacement",
      "Sports injury",
      "Joint preservation",
    ],
    languages: ["English"],
    experience: 19,
    location: "Musculoskeletal Unit, Level 2",
  },
  {
    id: "doc-5",
    slug: "priya-raman",
    name: "Dr Priya Raman",
    credentials: "MD, MRCOG",
    specialty: "Obstetrics & Maternal Medicine",
    department: "maternity",
    image: "/images/doctor-priya-raman.jpg",
    bio: "Dr Raman supports families through routine and higher-risk pregnancies. She works within a midwife-led continuity model, stepping in where obstetric input is needed while keeping the same named midwife alongside the family throughout.",
    qualifications: [
      "MD, Calverton School of Medicine",
      "MRCOG, Royal College of Obstetricians and Gynaecologists",
      "Subspecialty training in Maternal Medicine",
    ],
    focusAreas: [
      "Higher-risk pregnancy",
      "Gestational diabetes",
      "Birth planning",
    ],
    languages: ["English", "Tamil", "Hindi"],
    experience: 15,
    location: "Maternity Centre, Level 2",
  },
  {
    id: "doc-6",
    slug: "tomas-varga",
    name: "Dr Tomas Varga",
    credentials: "MD, FRCR",
    specialty: "Diagnostic Radiology",
    department: "diagnostic-imaging",
    image: "/images/doctor-tomas-varga.jpg",
    bio: "Dr Varga reports musculoskeletal and abdominal imaging and leads the department's image-guided procedure list. He introduced the current reporting workflow, which pairs each scan with a short plain-language summary for the patient record.",
    qualifications: [
      "MD, Eastbourne University",
      "FRCR, Royal College of Radiologists",
      "Fellowship in Musculoskeletal Imaging",
    ],
    focusAreas: [
      "Musculoskeletal MRI",
      "Image-guided biopsy",
      "Abdominal imaging",
    ],
    languages: ["English", "Hungarian"],
    experience: 11,
    location: "Imaging Department, Ground Floor",
  },
  {
    id: "doc-7",
    slug: "nora-halim",
    name: "Dr Nora Halim",
    credentials: "MD, FACEP",
    specialty: "Emergency Medicine",
    department: "emergency-care",
    image: "/images/doctor-nora-halim.jpg",
    bio: "Dr Halim is a consultant in emergency medicine and clinical lead for the department's triage pathways. Her work has centred on reducing the time between arrival and first senior assessment, particularly for older patients and for children.",
    qualifications: [
      "MD, Northvale University",
      "FACEP, American College of Emergency Physicians",
      "Advanced Trauma Life Support instructor",
    ],
    focusAreas: [
      "Acute assessment",
      "Trauma care",
      "Paediatric emergencies",
    ],
    languages: ["English", "Arabic"],
    experience: 13,
    location: "Emergency Department, Ground Floor",
  },
  {
    id: "doc-8",
    slug: "elias-mensah",
    name: "Mr Elias Mensah",
    credentials: "MBChB, FRCS",
    specialty: "General & Colorectal Surgery",
    department: "general-surgery",
    image: "/images/doctor-elias-mensah.jpg",
    bio: "Mr Mensah performs planned and emergency general surgery with a focus on laparoscopic technique. He runs the pre-admission clinic personally for his own list, which keeps the surgical plan and the recovery plan in the same conversation.",
    qualifications: [
      "MBChB, Aldergate University",
      "FRCS (General Surgery)",
      "Fellowship in Minimally Invasive Surgery",
    ],
    focusAreas: [
      "Laparoscopic surgery",
      "Colorectal conditions",
      "Hernia repair",
    ],
    languages: ["English", "Twi"],
    experience: 18,
    location: "Surgical Suite, Level 3",
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

export function getDoctorsByDepartment(department: string): Doctor[] {
  return doctors.filter((doctor) => doctor.department === department);
}
