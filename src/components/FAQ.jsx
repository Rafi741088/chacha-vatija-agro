import { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "আপনারা কি সরাসরি খামার থেকে পণ্য দেন?",
    answer:
      "জি। Chacha & Vatija Agro থেকে সরাসরি মাছ, ছাগল ও মুরগির পণ্য সংগ্রহ করে customers-এর কাছে পৌঁছে দেওয়ার লক্ষ্য আমাদের।",
  },
  {
    question: "কোন কোন পণ্য অর্ডার করা যাবে?",
    answer:
      "বর্তমানে আমাদের website-এ মাছ, ছাগল এবং মুরগির বিভিন্ন পণ্য রয়েছে। ভবিষ্যতে আরও farm products যুক্ত করা হবে।",
  },
  {
    question: "Home Delivery কি available?",
    answer:
      "জি। বর্তমানে Home Delivery option রাখা হয়েছে। Checkout করার সময় আপনার জেলা ও সম্পূর্ণ ঠিকানা দিতে হবে।",
  },
  {
    question: "Payment কীভাবে করতে হবে?",
    answer:
      "বর্তমানে Cash on Delivery available আছে। অর্থাৎ পণ্য হাতে পাওয়ার সময় payment করতে পারবেন। ভবিষ্যতে bKash, Nagad এবং online payment যুক্ত করা হবে।",
  },
  {
    question: "Order করার পর কীভাবে track করব?",
    answer:
      "Order successfully complete হলে একটি Order ID পাবেন। সেই Order ID ব্যবহার করে আপনার order status track করার ব্যবস্থা থাকবে।",
  },
  {
    question: "পণ্য available না থাকলে কী হবে?",
    answer:
      "যে পণ্যের stock শেষ হয়ে যাবে সেটি unavailable হিসেবে দেখানো হবে। নতুন stock আসলে আবার available করা যাবে।",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className="bg-white px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
            <HelpCircle size={17} />
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-green-950 sm:text-4xl">
            আপনার প্রশ্নের উত্তর
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            Chacha & Vatija Agro সম্পর্কে সাধারণ
            প্রশ্নগুলোর উত্তর এখানে সহজভাবে দেওয়া হয়েছে।
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-green-200 bg-green-50/60 shadow-sm"
                    : "border-gray-100 bg-white hover:border-green-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-black sm:text-base ${
                      isOpen
                        ? "text-green-900"
                        : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-green-800 text-white"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-green-100 px-5 pb-6 pt-4 text-sm leading-7 text-gray-600 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TRUST BOX */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-green-950 p-7 sm:p-9">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-lime-400">
                Need More Help?
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                আপনার আরও কোনো প্রশ্ন আছে?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                আমাদের Contact section থেকে সরাসরি
                message পাঠাতে পারেন।
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-lime-400 px-6 py-3.5 text-sm font-black text-green-950 transition hover:bg-lime-300"
            >
              Contact করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;