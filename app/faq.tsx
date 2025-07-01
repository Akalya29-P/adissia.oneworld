import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import PageWrapper from "./pagewrapper";

const faqs = [
  {
    question: "What payment methods do you accept for online purchases?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay for your convenience. Yes, once your order ships, you'll receive a tracking number via email. We also offer a rewards program where you can earn points for every purchase.",
  },
  {
    question: "How long does shipping usually take?",
    answer:
      "Shipping typically takes 3–5 business days depending on your location.",
  },
  {
    question: "Can I return an item if I’m not satisfied?",
    answer:
      "Yes, we offer a 15-day return policy on most items. Items must be unused and in original packaging.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, digital gift cards are available and can be used for any product on our website.",
  },
  {
    question: "Is there a loyalty program for frequent shoppers?",
    answer:
      "Yes, our loyalty program allows you to earn points on every purchase that can be redeemed later.",
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