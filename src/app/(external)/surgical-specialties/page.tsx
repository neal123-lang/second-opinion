import type { Metadata } from "next";
import SpecialitiesClient from "./SpecialitiesClient";

export const metadata: Metadata = {
  title: "Surgical Specialties | Expert Second Opinions | Qikplus",
  description:
    "Explore 20+ surgical specialties supported by Qikplus. Get your medical reports reviewed by verified specialists, understand your surgical options, and make informed treatment decisions.",
  keywords: [
    "surgical specialties",
    "surgical second opinion",
    "online second opinion",
    "expert surgical consultation",
    "second opinion for surgery",
    "specialist second opinion",
    "Qikplus surgical specialties",
    "medical second opinion",
  ],
  alternates: {
    canonical: "/surgical-specialties",
  },
  openGraph: {
    title: "Surgical Specialties | Expert Second Opinions | Qikplus",
    description:
      "Explore 20+ surgical specialties and connect your medical case with verified specialists through Qikplus.",
    type: "website",
  },
};

const specialtyData = [
  {
    id: 1,
    category: "General",
    title: "General Surgery",
    description:
      "Expert review for common and complex surgical conditions involving the abdomen, breast, thyroid and gastrointestinal system.",
    procedures: [
      "Hernia Repair",
      "Gallbladder Surgery",
      "Appendix Surgery",
      "Thyroid Surgery",
      "Piles, Fissure & Fistula Surgery",
      "Breast Surgery",
    ],
  },
  {
    id: 2,
    category: "Ortho & Spine",
    title: "Orthopaedics",
    description:
      "Second opinions for joint replacement, sports injuries, fractures, ligament problems and other orthopaedic procedures.",
    procedures: [
      "Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "ACL & Ligament Reconstruction",
      "Arthroscopy",
      "Shoulder Replacement",
      "Sports Injury Surgery",
      "Trauma & Fracture Fixation",
    ],
  },
  {
    id: 3,
    category: "Ortho & Spine",
    title: "Spine Surgery",
    description:
      "Specialist review for spinal conditions and proposed procedures including minimally invasive and complex spine surgery.",
    procedures: [
      "Slip Disc Surgery",
      "Lumbar Decompression",
      "Cervical Spine Surgery",
      "Spinal Fusion",
      "Minimally Invasive Spine Surgery",
    ],
  },
  {
    id: 4,
    category: "Neuro & Heart",
    title: "Neurosurgery",
    description:
      "Expert second opinions for conditions affecting the brain, spine, skull base and nervous system that may require surgery.",
    procedures: [
      "Brain Tumor Surgery",
      "Stroke Intervention",
      "Aneurysm Surgery",
      "Hydrocephalus",
      "Skull Base Surgery",
    ],
  },
  {
    id: 5,
    category: "Neuro & Heart",
    title: "Cardiac Surgery",
    description:
      "Specialist consultation for heart conditions requiring surgical treatment, including bypass, valve and aortic procedures.",
    procedures: [
      "CABG (Bypass Surgery)",
      "Valve Replacement",
      "Minimally Invasive Cardiac Surgery",
      "Aortic Surgery",
      "Congenital Heart Surgery",
    ],
  },
  {
    id: 6,
    category: "Neuro & Heart",
    title: "Cardiology (Interventional)",
    description:
      "Specialist review for minimally invasive cardiovascular procedures and catheter-based interventions.",
    procedures: [
      "Angiography",
      "Angioplasty",
      "Pacemaker Implantation",
      "TAVI / TAVR",
      "Device Closure Procedures",
    ],
  },
  {
    id: 7,
    category: "Organs & Oncology",
    title: "Urology",
    description:
      "Expert review for urinary tract, kidney, bladder and prostate conditions that may require surgical or procedural treatment.",
    procedures: [
      "Kidney Stone Surgery",
      "TURP",
      "Laser Prostate Surgery",
      "Kidney Surgery",
      "Bladder Surgery",
      "Ureteric Reconstruction",
    ],
  },
  {
    id: 8,
    category: "Organs & Oncology",
    title: "Nephrology & Renal Transplant",
    description:
      "Specialist support for kidney-related procedures, renal replacement needs and transplant-related surgical care.",
    procedures: [
      "Kidney Transplant",
      "Dialysis Access Surgery",
    ],
  },
  {
    id: 9,
    category: "Organs & Oncology",
    title: "Gastroenterology & GI Surgery",
    description:
      "Second opinions for gastrointestinal conditions and procedures involving the stomach, bowel, liver and pancreas.",
    procedures: [
      "Bariatric Surgery",
      "Liver Surgery",
      "Pancreatic Surgery",
      "Colorectal Surgery",
      "Laparoscopic GI Surgery",
    ],
  },
  {
    id: 10,
    category: "Organs & Oncology",
    title: "Oncology",
    description:
      "Specialist surgical review for cancer-related procedures across multiple organ systems and cancer types.",
    procedures: [
      "Breast Cancer Surgery",
      "Head & Neck Cancer Surgery",
      "GI Cancer Surgery",
      "Gynecological Cancer Surgery",
      "Urological Cancer Surgery",
      "Thoracic Oncology Surgery",
    ],
  },
  {
    id: 11,
    category: "Women & Children",
    title: "Gynecology",
    description:
      "Expert second opinions for gynecological conditions and procedures involving the uterus, ovaries and reproductive system.",
    procedures: [
      "Hysterectomy",
      "Fibroid Surgery",
      "Ovarian Cyst Surgery",
      "Endometriosis Surgery",
      "Urogynecology Procedures",
    ],
  },
  {
    id: 12,
    category: "Women & Children",
    title: "Obstetrics",
    description:
      "Specialist review for pregnancy-related procedures and high-risk obstetric care.",
    procedures: [
      "High-Risk Pregnancy Procedures",
      "Caesarean Section (C-Section)",
    ],
  },
  {
    id: 13,
    category: "Women & Children",
    title: "IVF & Fertility",
    description:
      "Specialist guidance for fertility procedures, assisted reproductive treatment and fertility preservation.",
    procedures: [
      "IVF Procedures",
      "ICSI",
      "Fertility Preservation",
      "Male Infertility Procedures",
    ],
  },
  {
    id: 14,
    category: "Specialized",
    title: "ENT",
    description:
      "Expert review for ear, nose and throat conditions and procedures involving hearing, sinuses, tonsils and the neck.",
    procedures: [
      "Cochlear Implant",
      "Tonsil Surgery",
      "Sinus Surgery",
      "Septoplasty",
      "Thyroid & Neck Procedures",
    ],
  },
  {
    id: 15,
    category: "Specialized",
    title: "Ophthalmology",
    description:
      "Specialist second opinions for eye conditions and procedures involving the lens, retina, cornea and glaucoma.",
    procedures: [
      "Cataract Surgery",
      "LASIK",
      "Retina Surgery",
      "Cornea Transplant",
      "Glaucoma Surgery",
    ],
  },
  {
    id: 16,
    category: "Specialized",
    title: "Plastic, Cosmetic & Reconstructive Surgery",
    description:
      "Expert review for reconstructive, cosmetic and complex procedures involving soft tissue, burns, hand and facial reconstruction.",
    procedures: [
      "Reconstructive Surgery",
      "Burns Management",
      "Hand Surgery",
      "Cosmetic Procedures",
      "Maxillofacial Reconstruction",
    ],
  },
  {
    id: 17,
    category: "Specialized",
    title: "Vascular Surgery",
    description:
      "Specialist review for conditions affecting blood vessels and procedures involving arterial and venous circulation.",
    procedures: [
      "Varicose Vein Surgery",
      "AV Fistula Creation",
      "Peripheral Vascular Procedures",
      "Endovascular Aneurysm Repair",
    ],
  },
  {
    id: 18,
    category: "Specialized",
    title: "Thoracic Surgery",
    description:
      "Expert consultation for surgical conditions involving the lungs, chest and mediastinum.",
    procedures: [
      "Lung Surgery",
      "VATS Procedures",
      "Mediastinal Tumor Surgery",
    ],
  },
  {
    id: 19,
    category: "Women & Children",
    title: "Pediatric Surgery",
    description:
      "Specialist surgical review for children requiring treatment for congenital, urological and general surgical conditions.",
    procedures: [
      "Congenital Anomaly Surgery",
      "Pediatric Urology",
      "Pediatric General Surgery",
    ],
  },
  {
    id: 20,
    category: "Specialized",
    title: "Dental & Maxillofacial Surgery",
    description:
      "Expert review for surgical conditions involving the mouth, jaw, face and maxillofacial region.",
    procedures: [
      "Dental Implants",
      "Jaw Surgery",
      "Oral Cancer Surgery",
      "Facial Trauma Reconstruction",
    ],
  },
  {
    id: 21,
    category: "Organs & Oncology",
    title: "Transplant Surgery",
    description:
      "Specialist consultation for transplant-related surgical procedures and complex organ replacement pathways.",
    procedures: [
      "Kidney Transplant",
      "Liver Transplant",
      "Bone Marrow Transplant (Partner Centers)",
    ],
  },
];

const faqData = [
  {
    question: "What surgical specialties does Qikplus support?",
    answer:
      "Qikplus currently supports more than 20 surgical and procedure-focused specialties, including general surgery, orthopaedics, spine surgery, neurosurgery, cardiac surgery, urology, oncology, gynecology, ENT, ophthalmology, vascular surgery, thoracic surgery, pediatric surgery and transplant surgery.",
  },
  {
    question: "Can I get a second opinion before surgery?",
    answer:
      "Yes. You can upload your relevant medical reports and documents so your case can be structured for specialist review. The purpose is to help you understand your condition, proposed procedure and available treatment options before making an informed decision.",
  },
  {
    question: "What medical documents should I upload?",
    answer:
      "Depending on your condition, you may upload laboratory reports, MRI or other imaging reports, DICOM scans, biopsy reports, prescriptions, previous consultation notes, discharge summaries and other relevant medical records.",
  },
  {
    question: "Will a doctor review my case?",
    answer:
      "Qikplus is designed to combine AI-powered organization of medical information with specialist review. AI helps structure the available information, while clinical judgment remains with qualified medical professionals.",
  },
  {
    question: "Can I consult a specialist directly?",
    answer:
      "Depending on the service available for your case, Qikplus can facilitate access to selected specialists for consultation after your case information has been organized.",
  },
  {
    question: "Is Qikplus a replacement for my treating doctor?",
    answer:
      "No. Qikplus is intended to support informed healthcare decisions and second-opinion discussions. It does not replace your treating physician, emergency medical care or an in-person clinical examination.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Surgical Specialties | Qikplus",
  description:
    "Explore surgical specialties supported by Qikplus for expert second opinions and specialist consultations.",
  url: "https://devui.secondopinion.intellisiatechnologies.com/surgical-specialties",
  about: specialtyData.map((specialty) => ({
    "@type": "MedicalSpecialty",
    name: specialty.title,
  })),
  mainEntity: specialtyData.map((specialty) => ({
    "@type": "MedicalProcedure",
    name: specialty.title,
    procedureType: specialty.procedures,
  })),
};

export default function SurgicalSpecialtiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <SpecialitiesClient
        specialtyData={specialtyData}
        faqData={faqData}
      />
    </>
  );
}