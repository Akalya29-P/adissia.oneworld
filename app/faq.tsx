import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import PageWrapper from "./pagewrapper";

const faqs = [
  {
    question: "Will Kalapatti benefit from the proposed Coimbatore Metro project?",
    answer:
      "Yes, Kalapatti falls under the planned Metro Phase 1 corridor, boosting future land value and daily connectivity.",
  },
  {
    question: "What IT and tech hubs are developing around One World?",
    answer:
      " The area is surrounded by TIDEL Park, Chil SEZ, KGISL, and new tech parks—making it a fast-growing job and rental zone.",
  },
  {
    question: "What makes One World a safer investment compared to other projects?",
    answer:
      "It’s DTCP approved, legally clear, and backed by Adissia—ensuring secure ownership and future-ready development.",
  },
  {
    question: " Are there flexible plot sizes or any early investor benefits?",
    answer:
      "Yes, multiple plot sizes are available with early-buyer pricing, pre-launch offers, and first-pick advantage.",
  },
  {
    question: "How does Kalapatti’s location influence future resale and ROI potential?",
    answer:
      "With its airport access and upcoming infrastructure, Kalapatti promises high resale demand and long-term ROI.",
  },
];

export default function Faq() {
     const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageWrapper>
    <section className="py-3 py-md-5">
        <div className="container">
            <div>
                <div className="row align-items-center">
                    <div className="col-md-6" data-aos="fade-right">
                        <h1 className='text-blue robot-text-style fs-60px mb-3'><b>Frequently Asked Questions</b></h1>
                        <p className="fs-18px font-poppins w-90">Got questions about One World by Adissia Developers? Find quick answers on plots, approvals, location, and investment benefits—all in one place.</p>
                    </div>
                    <div className="col-md-6">
                        <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className=" pb-4">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left font-medium text-gray-900 text-lg focus:outline-none fs-24px font-poppins text-blue"
            data-aos="fade-left">
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 fw-medium font-poppins"data-aos="fade-left">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
     
  </PageWrapper>
  );
}