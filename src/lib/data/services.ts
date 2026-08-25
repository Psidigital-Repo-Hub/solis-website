import type { Service, ServiceSlug } from "@/types";

/**
 * Demonstration content for a fictional hospital. Clinical descriptions are
 * illustrative and are not medical advice.
 */
export const services: Service[] = [
  {
    id: "svc-cardiology",
    slug: "cardiology",
    name: "Cardiology",
    summary:
      "Assessment, monitoring and long-term management of heart and vascular conditions.",
    description:
      "Our cardiology team supports people living with heart and vascular conditions from first assessment through long-term follow-up. Consultants, specialist nurses and physiologists review each case together so that investigations, medication and lifestyle support are planned as one coordinated pathway.",
    icon: "heart-pulse",
    image: "/images/service-cardiology.jpg",
    imageAlt: "An anatomical model of a human heart held in gloved hands",
    highlights: [
      "Same-week outpatient assessment for referred patients",
      "On-site echocardiography and rhythm monitoring",
      "Shared follow-up plans sent to your primary care team",
    ],
    conditions: [
      "Coronary artery disease",
      "Heart failure",
      "Atrial fibrillation and arrhythmia",
      "Hypertension",
      "Valve disease",
    ],
    procedures: [
      "Echocardiogram",
      "Exercise tolerance testing",
      "Ambulatory rhythm monitoring",
      "Cardiac rehabilitation programme",
    ],
    extension: "Ext. 2140",
  },
  {
    id: "svc-pediatrics",
    slug: "pediatrics",
    name: "Pediatrics",
    summary:
      "Everyday and specialist care for infants, children and adolescents.",
    description:
      "From routine developmental checks to specialist referral, our paediatric team looks after children and their families in spaces designed to feel calm and unhurried. Parents and carers are part of every conversation, and appointments are scheduled with school and family routines in mind.",
    icon: "baby",
    image: "/images/service-pediatrics.jpg",
    imageAlt: "A young child laughing, face painted, outdoors",
    highlights: [
      "Dedicated child-friendly assessment rooms",
      "Paediatric nurses present at every appointment",
      "Coordinated referrals to allied health services",
    ],
    conditions: [
      "Asthma and respiratory illness",
      "Allergy and eczema",
      "Growth and development concerns",
      "Recurrent infections",
      "Feeding and nutrition support",
    ],
    procedures: [
      "Developmental assessment",
      "Allergy testing",
      "Spirometry",
      "Childhood immunisation review",
    ],
    extension: "Ext. 2210",
  },
  {
    id: "svc-orthopedics",
    slug: "orthopedics",
    name: "Orthopedics",
    summary:
      "Care for bones, joints and soft tissue, including surgical and non-surgical routes.",
    description:
      "Our orthopaedic service covers injury, joint pain and mobility problems across all age groups. Surgeons and physiotherapists assess together, so non-surgical options are explored properly before an operation is considered, and rehabilitation is planned from the first appointment.",
    icon: "bone",
    image: "/images/service-orthopedics.jpg",
    imageAlt: "A therapist's hands working on a patient's shoulder during treatment",
    highlights: [
      "Joint assessment clinics with physiotherapy input",
      "Pre-operative preparation and recovery planning",
      "Structured rehabilitation after surgery",
    ],
    conditions: [
      "Osteoarthritis",
      "Sports and soft tissue injury",
      "Fractures",
      "Back and neck pain",
      "Shoulder and knee instability",
    ],
    procedures: [
      "Joint injection",
      "Arthroscopic surgery",
      "Joint replacement",
      "Fracture fixation",
    ],
    extension: "Ext. 2265",
  },
  {
    id: "svc-neurology",
    slug: "neurology",
    name: "Neurology",
    summary:
      "Diagnosis and ongoing management of conditions affecting the brain and nerves.",
    description:
      "Neurological symptoms can be difficult to describe and slow to diagnose. Our neurologists work alongside imaging and neurophysiology colleagues to reach clarity as efficiently as possible, and specialist nurses stay in contact between appointments so questions do not have to wait.",
    icon: "brain",
    image: "/images/service-neurology.jpg",
    imageAlt: "A cross-sectional anatomical model of the human brain",
    highlights: [
      "Combined clinics with neurophysiology",
      "Named specialist nurse for long-term conditions",
      "Direct access to advanced imaging",
    ],
    conditions: [
      "Migraine and headache disorders",
      "Epilepsy",
      "Multiple sclerosis",
      "Parkinson's disease",
      "Peripheral neuropathy",
    ],
    procedures: [
      "Electroencephalography (EEG)",
      "Nerve conduction studies",
      "Cognitive assessment",
      "Botulinum toxin therapy for chronic migraine",
    ],
    extension: "Ext. 2318",
  },
  {
    id: "svc-general-surgery",
    slug: "general-surgery",
    name: "General Surgery",
    summary:
      "Planned and urgent surgical care with a focus on shorter, smoother recovery.",
    description:
      "Our surgical teams handle both planned procedures and urgent operations. Wherever it is clinically appropriate we use minimally invasive techniques, and every patient receives a written recovery plan covering pain relief, wound care and the point at which normal activity can resume.",
    icon: "stethoscope",
    image: "/images/service-general-surgery.jpg",
    imageAlt: "A surgical team operating under theatre lights",
    highlights: [
      "Pre-admission clinic before every planned procedure",
      "Minimally invasive techniques where suitable",
      "Follow-up call within 72 hours of discharge",
    ],
    conditions: [
      "Gallbladder disease",
      "Hernia",
      "Appendicitis",
      "Colorectal conditions",
      "Skin and soft tissue lesions",
    ],
    procedures: [
      "Laparoscopic cholecystectomy",
      "Hernia repair",
      "Diagnostic endoscopy",
      "Day-case excision",
    ],
    extension: "Ext. 2402",
  },
  {
    id: "svc-emergency-care",
    slug: "emergency-care",
    name: "Emergency Care",
    summary:
      "A 24-hour emergency department with resuscitation and rapid diagnostics on site.",
    description:
      "The emergency department is open every hour of every day. Patients are assessed on arrival by a senior triage nurse, and imaging, laboratory and critical care teams are located alongside the department so that urgent decisions are not delayed by transfers.",
    icon: "ambulance",
    image: "/images/service-emergency-care.jpg",
    imageAlt: "A hospital ward with made-up beds and drawn curtains",
    highlights: [
      "Senior triage assessment on arrival",
      "Resuscitation bays and imaging on the same floor",
      "Dedicated paediatric emergency area",
    ],
    conditions: [
      "Chest pain",
      "Major and minor trauma",
      "Breathing difficulty",
      "Severe abdominal pain",
      "Suspected stroke",
    ],
    procedures: [
      "Emergency imaging",
      "Wound care and suturing",
      "Fracture immobilisation",
      "Observation and short-stay admission",
    ],
    extension: "Ext. 2000",
  },
  {
    id: "svc-maternity",
    slug: "maternity",
    name: "Maternity",
    summary:
      "Antenatal, birth and postnatal care shaped around each family's preferences.",
    description:
      "Our maternity service supports families through pregnancy, birth and the weeks that follow. Midwives lead continuity of care, obstetric and neonatal colleagues are immediately available when they are needed, and birth preferences are discussed in detail well before the due date.",
    icon: "heart-handshake",
    image: "/images/service-maternity.jpg",
    imageAlt: "A mother sitting on a sofa with her two young children",
    highlights: [
      "Continuity of midwifery care through pregnancy",
      "Birthing rooms with partner accommodation",
      "Neonatal team available on site at all times",
    ],
    conditions: [
      "Routine and higher-risk pregnancy",
      "Gestational diabetes",
      "Multiple pregnancy",
      "Postnatal recovery",
      "Infant feeding support",
    ],
    procedures: [
      "Antenatal ultrasound",
      "Foetal monitoring",
      "Assisted and operative birth",
      "Postnatal home visits",
    ],
    extension: "Ext. 2530",
  },
  {
    id: "svc-diagnostic-imaging",
    slug: "diagnostic-imaging",
    name: "Diagnostic Imaging",
    summary:
      "MRI, CT, ultrasound and X-ray reported by subspecialist radiologists.",
    description:
      "Imaging sits at the centre of most diagnostic pathways, so our department is built for speed and clarity. Scans are reported by radiologists who subspecialise in the relevant area, and results are released to the referring clinician and to your patient record together.",
    icon: "scan-line",
    image: "/images/service-diagnostic-imaging.jpg",
    imageAlt: "Two clinicians reviewing a brain scan together on diagnostic monitors",
    highlights: [
      "Extended scanning hours including weekends",
      "Subspecialist radiology reporting",
      "Results shared with your referring clinician",
    ],
    conditions: [
      "Suspected fracture",
      "Abdominal and pelvic investigation",
      "Neurological investigation",
      "Cancer staging and surveillance",
      "Vascular assessment",
    ],
    procedures: [
      "MRI",
      "CT",
      "Ultrasound",
      "Digital X-ray",
      "Image-guided biopsy",
    ],
    extension: "Ext. 2612",
  },
  {
    id: "svc-laboratory-services",
    slug: "laboratory-services",
    name: "Laboratory Services",
    summary:
      "On-site pathology with rapid turnaround for urgent and routine testing.",
    description:
      "Our laboratory processes routine and urgent samples on site, which keeps waiting times short and avoids the delays that come with off-site transport. Phlebotomy runs on a walk-in basis for most routine requests, and urgent results are telephoned directly to the requesting clinician.",
    icon: "flask-conical",
    image: "/images/service-laboratory-services.jpg",
    imageAlt: "A pathology laboratory lined with automated analysers",
    highlights: [
      "Walk-in phlebotomy for routine requests",
      "Urgent results phoned to the requesting clinician",
      "Sample tracking visible to your care team",
    ],
    conditions: [
      "Anaemia and blood disorders",
      "Diabetes monitoring",
      "Thyroid and hormone testing",
      "Infection screening",
      "Kidney and liver function",
    ],
    procedures: [
      "Full blood count",
      "Biochemistry panels",
      "Microbiology culture",
      "Histopathology",
    ],
    extension: "Ext. 2708",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceName(slug: ServiceSlug): string {
  return services.find((service) => service.slug === slug)?.name ?? slug;
}

export const serviceSlugs = services.map((service) => service.slug);
