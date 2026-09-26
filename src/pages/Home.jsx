import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

import agroHero from "../assets/agro-hero.png";

function Home() {
  return (
    <main>
      <section
        id="home"
        className="relative min-h-[calc(100svh-72px)] overflow-hidden"
      >
        {/* HERO IMAGE */}
        <img
          src={agroHero}
          alt="Chacha & Vatija Agro Farm"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-950/50 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-4 pb-44 pt-20 sm:px-5 sm:pb-40 lg:px-8 lg:pb-32">
          <div className="w-full max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:px-5 sm:text-sm">
              <Leaf
                size={16}
                className="text-lime-400"
              />

              সরাসরি খামার থেকে
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              আমাদের খামার থেকে

              <span className="mt-2 block text-lime-400">
                আপনার ঘরে
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              তাজা মাছ, স্বাস্থ্যকর মুরগি এবং মানসম্মত
              ছাগল—সরাসরি Chacha & Vatija Agro থেকে
              আপনার পরিবারের জন্য।
            </p>

            {/* BUTTONS */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">

              <a
                href="#shop"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 text-sm font-black text-green-950 shadow-lg transition hover:bg-lime-300 sm:w-auto sm:px-7"
              >
                এখনই অর্ডার করুন
                <ArrowRight size={18} />
              </a>

              <a
                href="#farm"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto sm:px-7"
              >
                আমাদের খামার দেখুন
              </a>

            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15 bg-green-950/85 backdrop-blur-xl">

          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="shrink-0 rounded-full bg-lime-400/15 p-2.5 sm:p-3">
                <Leaf
                  size={20}
                  className="text-lime-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white sm:text-base">
                  তাজা মাছ
                </p>

                <p className="truncate text-[11px] text-white/60 sm:text-xs">
                  সরাসরি পুকুর থেকে
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="shrink-0 rounded-full bg-lime-400/15 p-2.5 sm:p-3">
                <ShieldCheck
                  size={20}
                  className="text-lime-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white sm:text-base">
                  মানসম্মত ছাগল
                </p>

                <p className="truncate text-[11px] text-white/60 sm:text-xs">
                  স্বাস্থ্যকর ও নিরাপদ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="shrink-0 rounded-full bg-lime-400/15 p-2.5 sm:p-3">
                <Truck
                  size={20}
                  className="text-lime-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white sm:text-base">
                  Home Delivery
                </p>

                <p className="truncate text-[11px] text-white/60 sm:text-xs">
                  আপনার ঠিকানায় পৌঁছে দিই
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;