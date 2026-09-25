import {
  Leaf,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
  Quote,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Farm Fresh",
    description:
      "সরাসরি খামার থেকে সংগ্রহ করা তাজা ও মানসম্মত পণ্য।",
  },
  {
    icon: ShieldCheck,
    title: "Quality Checked",
    description:
      "পণ্য সরবরাহের আগে quality ও freshness নিশ্চিত করার চেষ্টা করা হয়।",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    description:
      "আপনার দেওয়া ঠিকানায় নিরাপদে পণ্য পৌঁছে দেওয়ার ব্যবস্থা।",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    description:
      "Customer satisfaction এবং ভালো service-কে গুরুত্ব দেওয়া হয়।",
  },
];

const testimonials = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka",
    text: "মাছের quality ভালো ছিল এবং delivery process-ও সহজ ছিল।",
  },
  {
    name: "Sabbir Hasan",
    location: "Barisal",
    text: "Farm থেকে সরাসরি product নেওয়ার concept ভালো লেগেছে।",
  },
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    text: "Website থেকে product দেখা এবং order process করা বেশ সহজ।",
  },
];

function TrustSection() {
  return (
    <section className="bg-stone-50">

      {/* WHY CHOOSE US */}
      <div className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
              Why Chacha & Vatija Agro?
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
              কেন আমাদের থেকে অর্ডার করবেন?
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Fresh products, trusted service এবং সহজ
              ordering experience—সবকিছু এক জায়গায়।
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-green-900/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 transition group-hover:bg-green-800">
                    <Icon
                      size={25}
                      className="text-green-700 transition group-hover:text-lime-400"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-black text-green-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="border-t border-green-900/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              <Star
                size={16}
                fill="currentColor"
              />
              Customer Reviews
            </span>

            <h2 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl">
              আমাদের Customers কী বলছেন?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
              আমাদের service ব্যবহার করা customers-এর
              অভিজ্ঞতা এখানে দেখতে পারেন।
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative rounded-3xl border border-gray-100 bg-stone-50 p-7 shadow-sm"
              >
                <Quote
                  size={34}
                  className="absolute right-6 top-6 text-green-100"
                />

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="currentColor"
                      className="text-amber-500"
                    />
                  ))}
                </div>

                <p className="mt-6 min-h-[90px] text-sm leading-7 text-gray-600">
                  “{testimonial.text}”
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-800 font-black text-white">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-black text-green-950">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* FINAL CTA */}
      <div className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-green-950 px-7 py-12 sm:px-12 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
                Fresh From Our Farm
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                আজই আপনার পছন্দের পণ্য অর্ডার করুন
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                তাজা মাছ, স্বাস্থ্যকর ছাগল ও মুরগি—
                সরাসরি Chacha & Vatija Agro থেকে।
              </p>
            </div>

            <a
              href="#shop"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-black text-green-950 shadow-lg transition hover:bg-lime-300"
            >
              Shop Now
            </a>

          </div>
        </div>
      </div>

    </section>
  );
}

export default TrustSection;