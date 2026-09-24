
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
} from "lucide-react";

function ContactFooter() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("ধন্যবাদ! আপনার message গ্রহণ করা হয়েছে।");

    e.target.reset();
  };

  return (
    <>
      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section
        id="contact"
        className="bg-stone-50 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">

            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
              Contact Us
            </span>

            <h2 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl lg:text-5xl">
              আমাদের সাথে যোগাযোগ করুন
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              পণ্য, অর্ডার, ডেলিভারি অথবা খামার সম্পর্কে
              যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>

          </div>

          {/* Contact Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            {/* =========================
                CONTACT INFORMATION
            ========================== */}
            <div className="rounded-3xl bg-green-950 p-7 shadow-xl sm:p-9">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
                Get In Touch
              </span>

              <h3 className="mt-4 text-2xl font-black text-white">
                Chacha & Vatija Agro
              </h3>

              <p className="mt-4 leading-7 text-white/60">
                আমাদের farm সম্পর্কে জানতে অথবা অর্ডারের
                বিষয়ে কথা বলতে সরাসরি যোগাযোগ করুন।
              </p>

              <div className="mt-8 space-y-6">

                {/* Location */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-400">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Farm Location
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Barisal, Bangladesh
                    </p>
                  </div>

                </div>

                {/* Phone */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-400">
                    <Phone size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      +880 1XXXXXXXXX
                    </p>
                  </div>

                </div>

                {/* Email */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-400">
                    <Mail size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm text-white/50">
                      info@chachavatijaagro.com
                    </p>
                  </div>

                </div>

                {/* Business Hours */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-400">
                    <Clock3 size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Business Hours
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Every day • 8:00 AM – 8:00 PM
                    </p>
                  </div>

                </div>

              </div>

              {/* Social */}
              <div className="mt-9 border-t border-white/10 pt-7">

                <p className="text-sm font-bold text-white">
                  Follow Us
                </p>

                <div className="mt-4 flex gap-3">

                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white transition duration-300 hover:bg-lime-400 hover:text-green-950"
                  >
                    f
                  </a>

                  <a
                    href="#"
                    aria-label="Messenger"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white transition duration-300 hover:bg-lime-400 hover:text-green-950"
                  >
                    MS
                  </a>

                </div>

              </div>

            </div>

            {/* =========================
                CONTACT FORM
            ========================== */}
            <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

              <h3 className="text-2xl font-black text-green-950">
                Send Us a Message
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                নিচের form পূরণ করে আমাদের message পাঠান।
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* Name + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">

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
                      required
                      placeholder="আপনার নাম"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      মোবাইল
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white"
                    />
                  </div>

                </div>

                {/* Email */}
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
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="আপনি কী বিষয়ে জানতে চান?"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="5"
                    placeholder="আপনার message লিখুন..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 py-4 font-black text-white shadow-lg shadow-green-900/20 transition duration-300 hover:bg-green-700"
                >
                  Message পাঠান
                  <Send size={18} />
                </button>

                <p className="text-center text-xs text-gray-400">
                  আমরা যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।
                </p>

              </form>

            </div>

          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="bg-green-950 text-white">

        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="lg:col-span-2">

              <a
                href="#home"
                className="inline-flex items-center gap-3"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 font-black text-green-950 shadow-lg">
                  CV
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    Chacha & Vatija
                  </h2>

                  <p className="mt-1 text-[10px] font-bold tracking-[0.3em] text-amber-400">
                    AGRO
                  </p>
                </div>

              </a>

              <p className="mt-5 max-w-md leading-7 text-white/55">
                Fresh fish, healthy goats and quality chicken
                directly from our farm to your family.
              </p>

              <div className="mt-6 flex gap-3">

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-black transition hover:bg-lime-400 hover:text-green-950"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="Messenger"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[10px] font-black transition hover:bg-lime-400 hover:text-green-950"
                >
                  MS
                </a>

              </div>

            </div>

            {/* Quick Links */}
            <div>

              <h3 className="font-black">
                Quick Links
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/55">

                <a
                  href="#home"
                  className="block transition hover:text-lime-400"
                >
                  Home
                </a>

                <a
                  href="#shop"
                  className="block transition hover:text-lime-400"
                >
                  Shop
                </a>

                <a
                  href="#about"
                  className="block transition hover:text-lime-400"
                >
                  About Us
                </a>

                <a
                  href="#farm"
                  className="block transition hover:text-lime-400"
                >
                  Our Farm
                </a>

                <a
                  href="#contact"
                  className="block transition hover:text-lime-400"
                >
                  Contact
                </a>

              </div>

            </div>

            {/* Products */}
            <div>

              <h3 className="font-black">
                Our Products
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/55">

                <p>Fresh Fish</p>
                <p>Healthy Goat</p>
                <p>Farm Chicken</p>
                <p>Home Delivery</p>
                <p>Cash on Delivery</p>

              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Chacha & Vatija Agro.
              All rights reserved.
            </p>

            <p>
              Farm Fresh • Natural • Trusted
            </p>

          </div>

        </div>

      </footer>
    </>
  );
}

export default ContactFooter;

