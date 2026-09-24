
import {
  Award,
  Fish,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

function AboutFarm() {
  const features = [
    {
      icon: <Leaf size={24} />,
      title: "Natural Farming",
      text: "প্রাকৃতিক পরিবেশে যত্নসহকারে আমাদের মাছ, ছাগল ও মুরগি পালন করা হয়।",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Quality & Safety",
      text: "গ্রাহকের জন্য মানসম্মত ও স্বাস্থ্যসম্মত পণ্য নিশ্চিত করাই আমাদের লক্ষ্য।",
    },
    {
      icon: <HeartHandshake size={24} />,
      title: "Trusted Service",
      text: "গ্রাহকের বিশ্বাস ও সন্তুষ্টিকে আমরা ব্যবসার সবচেয়ে গুরুত্বপূর্ণ অংশ মনে করি।",
    },
    {
      icon: <Truck size={24} />,
      title: "Fresh Delivery",
      text: "সম্ভব হলে খামার থেকে সরাসরি গ্রাহকের কাছে তাজা পণ্য পৌঁছে দেওয়া হয়।",
    },
  ];

  return (
    <>
      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
                <Sprout size={17} />
                আমাদের সম্পর্কে
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight text-green-950 sm:text-4xl lg:text-5xl">
                Farm থেকে সরাসরি
                <span className="block text-green-700">
                  আপনার পরিবারের জন্য
                </span>
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Chacha & Vatija Agro একটি পরিবারভিত্তিক কৃষি ও
                খামার ব্যবসা। আমাদের খামারে মাছ, ছাগল এবং
                মুরগি পালন করা হয় যত্ন ও দায়িত্বের সাথে।
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                আমাদের উদ্দেশ্য হলো স্থানীয় গ্রাহকদের কাছে
                খামারের তাজা ও মানসম্মত পণ্য সহজভাবে পৌঁছে
                দেওয়া এবং একটি দীর্ঘমেয়াদি বিশ্বাসযোগ্য
                সম্পর্ক তৈরি করা।
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">

                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-2xl font-black text-green-800">
                    3+
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    Product Categories
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-2xl font-black text-amber-700">
                    100%
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    Farm Focused
                  </p>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-2xl font-black text-green-800">
                    Fresh
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    Farm Products
                  </p>
                </div>

              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">

              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-lime-200/50 blur-2xl" />

              <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-amber-200/50 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-green-900/10 bg-stone-100 shadow-xl">

                <div className="grid grid-cols-2 gap-1">

                  <div className="h-72 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1545816250-e12bedba42ba?auto=format&fit=crop&w=900&q=80"
                      alt="Fresh fish"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="h-72 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80"
                      alt="Healthy goat"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-1">

                  <div className="h-52 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80"
                      alt="Farm chicken"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="flex h-52 flex-col justify-center bg-green-950 p-6">
                    <Award
                      size={30}
                      className="text-lime-400"
                    />

                    <h3 className="mt-4 text-xl font-black text-white">
                      Farm Fresh
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Quality products with care from our farm.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-stone-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800 transition group-hover:bg-green-800 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-black text-green-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= OUR FARM ================= */}
      <section
        id="farm"
        className="relative overflow-hidden bg-green-950 px-5 py-20 lg:px-8"
      >
        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-lime-400/10 blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-lime-400">
              <Sprout size={17} />
              Our Farm
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              যেখানে যত্নের সাথে
              <span className="block text-lime-400">
                প্রতিটি প্রাণী ও পণ্য
                বেড়ে ওঠে
              </span>
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-white/65">
              আমাদের খামারের প্রতিটি কাজের মূল লক্ষ্য হলো
              ভালো পরিবেশ, নিয়মিত যত্ন এবং মানসম্মত উৎপাদন।
              আমরা ধীরে ধীরে আমাদের farm operation আরও
              উন্নত করার চেষ্টা করছি।
            </p>
          </div>

          {/* Farm Categories */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Fish */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545816250-e12bedba42ba?auto=format&fit=crop&w=900&q=80"
                  alt="Fish farming"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="rounded-xl bg-white/15 p-3 text-white backdrop-blur-md">
                    <Fish size={22} />
                  </div>

                  <div>
                    <h3 className="font-black text-white">
                      Fish
                    </h3>

                    <p className="text-xs text-white/60">
                      Fresh pond fish
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-white/60">
                  খামারের পুকুরে যত্নসহকারে মাছ চাষ করা হয়
                  এবং বাজারের জন্য তাজা মাছ প্রস্তুত করা হয়।
                </p>
              </div>
            </div>

            {/* Goat */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=80"
                  alt="Goat farming"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="rounded-xl bg-white/15 p-3 text-white backdrop-blur-md">
                    <HeartHandshake size={22} />
                  </div>

                  <div>
                    <h3 className="font-black text-white">
                      Goat
                    </h3>

                    <p className="text-xs text-white/60">
                      Healthy livestock
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-white/60">
                  স্বাস্থ্যকর পরিবেশে ছাগলের যত্ন নেওয়া হয়
                  এবং বিক্রির আগে প্রয়োজনীয় পরিচর্যা করা হয়।
                </p>
              </div>
            </div>

            {/* Chicken */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80"
                  alt="Chicken farming"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="rounded-xl bg-white/15 p-3 text-white backdrop-blur-md">
                    <Leaf size={22} />
                  </div>

                  <div>
                    <h3 className="font-black text-white">
                      Chicken
                    </h3>

                    <p className="text-xs text-white/60">
                      Farm raised
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-white/60">
                  খামারে মুরগি পালন ও পরিচর্যার মাধ্যমে
                  গ্রাহকদের জন্য মানসম্মত পণ্য প্রস্তুত করা হয়।
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default AboutFarm;

