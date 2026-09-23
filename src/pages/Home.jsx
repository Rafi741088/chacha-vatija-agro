import agroHero from "../assets/agro-hero.png";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden"
      >

        {/* Demo Farm Image */}
        <img
          src={agroHero}
          alt="Chacha & Vatija Agro - Fish, Goat and Chicken Farm"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Green Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-950/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              <Leaf
                size={16}
                className="text-amber-400"
              />

              Fresh From Our Farm
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">

              আমাদের খামার থেকে

              <span className="mt-2 block text-amber-400">
                আপনার ঘরে
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Chacha & Vatija Agro থেকে সরাসরি সংগ্রহ করুন
              তাজা মাছ, মানসম্মত ছাগল এবং স্বাস্থ্যকর মুরগি।
              খামার থেকে আপনার ঘরে—বিশ্বাস ও যত্নের সাথে।
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 font-bold text-green-950 transition hover:bg-amber-300"
              >
                এখনই অর্ডার করুন
                <ArrowRight size={18} />
              </a>

              <a
                href="#farm"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                আমাদের খামার দেখুন
              </a>

            </div>

          </div>
        </div>

        {/* Bottom Features */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl">

          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            {/* Feature 1 */}
            <div className="flex items-center gap-3 px-5 py-5">
              <Leaf
                size={25}
                className="text-amber-400"
              />

              <div>
                <p className="font-bold text-white">
                  Farm Fresh
                </p>

                <p className="text-xs text-white/60">
                  সরাসরি খামার থেকে
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 px-5 py-5">
              <ShieldCheck
                size={25}
                className="text-amber-400"
              />

              <div>
                <p className="font-bold text-white">
                  Trusted Quality
                </p>

                <p className="text-xs text-white/60">
                  মানের নিশ্চয়তা
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 px-5 py-5">
              <Truck
                size={25}
                className="text-amber-400"
              />

              <div>
                <p className="font-bold text-white">
                  Home Delivery
                </p>

                <p className="text-xs text-white/60">
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