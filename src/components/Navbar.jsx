
import { useState } from "react";
import {
  ShoppingCart,
  UserRound,
  Menu,
  X,
  PackageSearch,
} from "lucide-react";

function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-green-900/10 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">

        {/* ================= LOGO ================= */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-800 text-sm font-black text-white shadow-md">
            CV
          </div>

          <div>
            <h1 className="text-lg font-black leading-none text-green-950">
              Chacha & Vatija
            </h1>

            <p className="mt-1 text-[10px] font-bold tracking-[0.3em] text-amber-600">
              AGRO
            </p>
          </div>
        </a>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden items-center gap-7 lg:flex">
          <a
            href="#home"
            className="text-sm font-semibold text-green-950 transition hover:text-green-600"
          >
            Home
          </a>

          <a
            href="#shop"
            className="text-sm font-semibold text-green-950 transition hover:text-green-600"
          >
            Shop
          </a>

          <a
            href="#about"
            className="text-sm font-semibold text-green-950 transition hover:text-green-600"
          >
            About
          </a>

          <a
            href="#farm"
            className="text-sm font-semibold text-green-950 transition hover:text-green-600"
          >
            Our Farm
          </a>

          <a
            href="#contact"
            className="text-sm font-semibold text-green-950 transition hover:text-green-600"
          >
            Contact
          </a>

          {/* Order Tracking */}
          <a
            href="/track-order"
            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800 transition hover:border-green-300 hover:bg-green-100"
          >
            <PackageSearch size={17} />
            Track Order
          </a>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-1">

          {/* Cart */}
          <button
            type="button"
            onClick={onCartClick}
            className="relative rounded-full p-2.5 text-green-950 transition hover:bg-green-50"
            aria-label="Open shopping cart"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <button
            type="button"
            className="hidden rounded-full p-2.5 text-green-950 transition hover:bg-green-50 sm:block"
            aria-label="User account"
          >
            <UserRound size={21} />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2.5 text-green-950 transition hover:bg-green-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-green-900/10 bg-white transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4">

          <div className="grid gap-1">

            <a
              href="#home"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-bold text-green-950 transition hover:bg-green-50"
            >
              Home
            </a>

            <a
              href="#shop"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-bold text-green-950 transition hover:bg-green-50"
            >
              Shop
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-bold text-green-950 transition hover:bg-green-50"
            >
              About
            </a>

            <a
              href="#farm"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-bold text-green-950 transition hover:bg-green-50"
            >
              Our Farm
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-bold text-green-950 transition hover:bg-green-50"
            >
              Contact
            </a>

            {/* Mobile Track Order */}
            <a
              href="/track-order"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <PackageSearch size={18} />
              Track Your Order
            </a>
          </div>

          {/* Mobile Account */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={closeMenu}
              className="flex w-full items-center gap-3 rounded-xl bg-stone-50 px-4 py-3 text-left text-sm font-bold text-green-950"
            >
              <UserRound size={19} />
              My Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

