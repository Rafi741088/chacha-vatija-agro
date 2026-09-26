
import { useState } from "react";
import {
  ShoppingCart,
  UserRound,
  Menu,
  X,
  PackageSearch,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cartCount = 0,
  onCartClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      id: "home",
    },
    {
      label: "Shop",
      id: "shop",
    },
    {
      label: "About",
      id: "about",
    },
    {
      label: "Our Farm",
      id: "farm",
    },
    {
      label: "FAQ",
      id: "faq",
    },
    {
      label: "Contact",
      id: "contact",
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  const goToSection = (id) => {
    closeMenu();

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);

      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCart = () => {
    closeMenu();

    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-900/10 bg-white/95 shadow-sm backdrop-blur-xl">

      {/* ================= NAVBAR ================= */}

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-8">

        {/* LOGO */}

        <button
          type="button"
          onClick={() => goToSection("home")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-green-900 text-xs font-black text-white shadow-md sm:h-11 sm:w-11 sm:text-sm">
            CV

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-lime-400" />
          </div>

          <div className="text-left">
            <h1 className="text-sm font-black leading-none text-green-950 sm:text-lg">
              Chacha & Vatija
            </h1>

            <p className="mt-1 text-[7px] font-black tracking-[0.3em] text-amber-600 sm:text-[9px]">
              AGRO
            </p>
          </div>
        </button>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="rounded-full px-3 py-2 text-sm font-bold text-green-950 transition hover:bg-green-50 hover:text-green-700"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-1">

          {/* TRACK ORDER */}

          <Link
            to="/track-order"
            className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-100 lg:inline-flex"
          >
            <PackageSearch size={17} />
            Track Order
          </Link>

          {/* ACCOUNT */}

          <div className="relative hidden sm:block">

            <button
              type="button"
              onClick={() =>
                setAccountOpen((value) => !value)
              }
              className="rounded-full p-2.5 text-green-950 transition hover:bg-green-50"
              aria-label="Account"
            >
              <UserRound size={21} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-14 z-[100] w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold text-green-600">
                    Customer Account
                  </p>

                  <p className="mt-1 text-sm font-black text-green-950">
                    Coming Soon
                  </p>
                </div>

                <Link
                  to="/track-order"
                  onClick={closeMenu}
                  className="mt-2 block rounded-xl px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  My Orders / Track Order
                </Link>

              </div>
            )}
          </div>

          {/* CART */}

          <button
            type="button"
            onClick={handleCart}
            className="relative rounded-full p-2.5 text-green-950 transition hover:bg-green-50"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="rounded-full p-2.5 text-green-950 transition hover:bg-green-50 xl:hidden"
            aria-label="Menu"
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

      {menuOpen && (
        <div className="border-t border-green-900/10 bg-white xl:hidden">

          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5">

            <div className="space-y-1">

              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    goToSection(item.id)
                  }
                  className="flex min-h-11 w-full items-center rounded-xl px-4 py-3 text-left text-sm font-bold text-green-950 transition hover:bg-green-50 hover:text-green-700"
                >
                  {item.label}
                </button>
              ))}

            </div>

            <div className="mt-3 border-t border-gray-100 pt-3">

              <Link
                to="/track-order"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3 text-sm font-bold text-white"
              >
                <PackageSearch size={18} />
                Track Your Order
              </Link>

              <button
                type="button"
                onClick={() =>
                  setAccountOpen((value) => !value)
                }
                className="mt-2 flex min-h-12 w-full items-center gap-3 rounded-xl bg-stone-50 px-4 py-3 text-sm font-bold text-green-950"
              >
                <UserRound size={19} />

                <span className="flex-1 text-left">
                  My Account
                </span>

                <span>
                  {accountOpen ? "−" : "+"}
                </span>
              </button>

              {accountOpen && (
                <div className="mt-2 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold text-green-700">
                    Customer Account
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Account system will be available after
                    backend integration.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;

