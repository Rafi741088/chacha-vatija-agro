import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
  MessageCircle,
  CheckCircle2,
  Leaf,
  ShieldCheck,
} from "lucide-react";

function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Farm Location",
      value: "Barisal, Bangladesh",
      description: "Our Farm & Office",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+880 1XXXXXXXXX",
      description: "Sat–Thu, 9 AM–8 PM",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@chachavatijaagro.com",
      description: "We reply within business hours",
    },
    {
      icon: Clock3,
      title: "Business Hours",
      value: "09:00 AM – 08:00 PM",
      description: "Friday: Closed",
    },
  ];

  return (
    <>
      {/* ================= CONTACT SECTION ================= */}
      <section
        id="contact"
        className="bg-stone-50 px-4 py-16 sm:px-5 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold text-green-800 sm:text-sm">
              <MessageCircle size={16} />
              Get In Touch
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
              আমাদের সাথে যোগাযোগ করুন
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Product, order, delivery অথবা আমাদের farm
              সম্পর্কে যেকোনো প্রশ্ন থাকলে message করুন।
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-green-900/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                    <Icon
                      size={20}
                      className="text-green-700"
                    />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.title}
                  </p>

                  <p className="mt-1 break-words text-sm font-black text-green-950">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* MAIN CONTACT AREA */}
          <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-green-900/10 bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT SIDE */}
            <div className="relative overflow-hidden bg-green-950 p-7 text-white sm:p-10 lg:p-12">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

              <div className="relative z-10">

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
                  Chacha & Vatija Agro
                </p>

                <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                  Fresh products.
                  <br />
                  Trusted service.
                </h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                  আমাদের লক্ষ্য হলো খামার থেকে customer-এর
                  কাছে fresh এবং quality products পৌঁছে দেওয়া।
                </p>

                {/* TRUST ITEMS */}
                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/10 p-2.5">
                      <Leaf
                        size={18}
                        className="text-lime-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Farm Fresh
                      </p>

                      <p className="text-xs text-white/50">
                        Direct from farm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/10 p-2.5">
                      <ShieldCheck
                        size={18}
                        className="text-lime-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Quality Focused
                      </p>

                      <p className="text-xs text-white/50">
                        Fresh & trusted products
                      </p>
                    </div>
                  </div>

                </div>

                {/* QUICK CONTACT */}
                <div className="mt-10 flex flex-col gap-3">

                  <a
                    href="tel:+8801000000000"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold transition hover:bg-white/10"
                  >
                    <Phone size={18} />
                    Call Us
                  </a>

                  <a
                    href="mailto:info@chachavatijaagro.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3.5 text-sm font-black text-green-950 transition hover:bg-lime-300"
                  >
                    <Mail size={18} />
                    Send Email
                  </a>

                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="p-7 sm:p-10 lg:p-12">

              <div>
                <p className="text-sm font-bold text-green-600">
                  Send us a message
                </p>

                <h3 className="mt-2 text-2xl font-black text-green-950 sm:text-3xl">
                  কীভাবে সাহায্য করতে পারি?
                </h3>
              </div>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-green-700"
                  />

                  <div>
                    <p className="font-black text-green-900">
                      Message received!
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                      আপনার message frontend-এ গ্রহণ করা হয়েছে।
                      Backend connect করার পর এটি system-এ
                      save/email করা যাবে।
                    </p>
                  </div>
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* NAME */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    আপনার নাম
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার পূর্ণ নাম"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>

                {/* PHONE + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      মোবাইল নম্বর
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                  </div>

                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    আপনার Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="আপনার প্রশ্ন বা message লিখুন..."
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-800 py-4 font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
                >
                  Message পাঠান
                  <Send size={18} />
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  আপনার তথ্য নিরাপদে রাখা হবে এবং প্রয়োজনীয়
                  যোগাযোগের জন্য ব্যবহার করা হবে।
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-950 px-4 pb-8 pt-14 text-white sm:px-5 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-green-950">
                  CV
                </div>

                <div>
                  <h2 className="text-lg font-black">
                    Chacha & Vatija
                  </h2>

                  <p className="mt-1 text-[9px] font-black tracking-[0.3em] text-lime-400">
                    AGRO
                  </p>
                </div>

              </div>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
                Fresh fish, healthy goats and quality
                chickens—directly from our farm to your home.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
                <Leaf
                  size={14}
                  className="text-lime-400"
                />
                Fresh From Farm
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-black">
                Quick Links
              </h3>

              <div className="mt-5 grid gap-3 text-sm text-white/50">

                <a
                  href="#home"
                  className="transition hover:text-lime-400"
                >
                  Home
                </a>

                <a
                  href="#shop"
                  className="transition hover:text-lime-400"
                >
                  Shop
                </a>

                <a
                  href="#about"
                  className="transition hover:text-lime-400"
                >
                  About
                </a>

                <a
                  href="#farm"
                  className="transition hover:text-lime-400"
                >
                  Our Farm
                </a>

                <a
                  href="#faq"
                  className="transition hover:text-lime-400"
                >
                  FAQ
                </a>

                <a
                  href="#contact"
                  className="transition hover:text-lime-400"
                >
                  Contact
                </a>

              </div>
            </div>

            {/* PRODUCTS */}
            <div>
              <h3 className="font-black">
                Our Products
              </h3>

              <div className="mt-5 grid gap-3 text-sm text-white/50">

                <a
                  href="#shop"
                  className="transition hover:text-lime-400"
                >
                  Fresh Fish
                </a>

                <a
                  href="#shop"
                  className="transition hover:text-lime-400"
                >
                  Healthy Goats
                </a>

                <a
                  href="#shop"
                  className="transition hover:text-lime-400"
                >
                  Farm Chicken
                </a>

                <a
                  href="#shop"
                  className="transition hover:text-lime-400"
                >
                  All Products
                </a>

              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-black">
                Contact
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-lime-400"
                  />

                  <p className="text-sm leading-6 text-white/50">
                    Barisal, Bangladesh
                  </p>
                </div>

                <div className="flex gap-3">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-lime-400"
                  />

                  <p className="text-sm leading-6 text-white/50">
                    +880 1XXXXXXXXX
                  </p>
                </div>

                <div className="flex gap-3">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-lime-400"
                  />

                  <p className="break-all text-sm leading-6 text-white/50">
                    info@chachavatijaagro.com
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Chacha & Vatija Agro.
              All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <span>Built with</span>

              <span className="font-bold text-lime-400">
                Fresh Ideas
              </span>

              <span>•</span>

              <span>Bangladesh</span>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}

export default ContactFooter;