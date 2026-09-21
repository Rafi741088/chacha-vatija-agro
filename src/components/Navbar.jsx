import { ShoppingCart, UserRound } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-green-900/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-800 text-sm font-black text-white">
            CV
          </div>

          <div>
            <h1 className="text-lg font-bold text-green-950">
              Chacha & Vatija
            </h1>

            <p className="text-[10px] font-semibold tracking-[0.3em] text-amber-600">
              AGRO
            </p>
          </div>
        </a>

        {/* Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm font-medium text-green-950 hover:text-amber-600"
          >
            Home
          </a>

          <a
            href="#shop"
            className="text-sm font-medium text-green-950 hover:text-amber-600"
          >
            Shop
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-green-950 hover:text-amber-600"
          >
            About
          </a>

          <a
            href="#farm"
            className="text-sm font-medium text-green-950 hover:text-amber-600"
          >
            Our Farm
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-green-950 hover:text-amber-600"
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative rounded-full p-2 text-green-950 hover:bg-green-50">
            <ShoppingCart size={21} />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              0
            </span>
          </button>

          <button className="rounded-full p-2 text-green-950 hover:bg-green-50">
            <UserRound size={21} />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;