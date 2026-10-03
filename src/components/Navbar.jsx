
import { useState } from "react";
import {
  ShoppingCart,
  UserRound,
  Menu,
  X,
  PackageSearch,
  ChevronDown,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar({
  cartCount = 0,
  onCartClick = () => {},
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [accountOpen, setAccountOpen] =
    useState(false);

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

  /* =========================
     CLOSE ALL MENUS
  ========================= */

  const closeMenus = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  /* =========================
     SECTION NAVIGATION
  ========================= */

  const goToSection = (id) => {
    closeMenus();

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section =
          document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);

      return;
    }

    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =========================
     LOGO
  ========================= */

  const handleLogoClick = () => {
    goToSection("home");
  };

  /* =========================
     CART
  ========================= */

  const handleCart = () => {
    closeMenus();
    onCartClick();
  };

  /* =========================
     TRACK ORDER
  ========================= */

  const handleTrackOrder = () => {
    closeMenus();

    navigate("/track-order");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-900/10 bg-white/95 shadow-sm backdrop-blur-xl">
      {/* =========================
          MAIN NAVBAR
      ========================= */}

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 lg:px-8">
        {/* =========================
            LOGO
        ========================= */}

        <button
          type="button"
          onClick={handleLogoClick}
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Go to home"
        >
          {/* LOGO ICON */}

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-900 text-xs font-black text-white shadow-md sm:h-11 sm:w-11 sm:text-sm">
            CV

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-lime-400" />
          </div>

          {/* LOGO TEXT */}

          <div className="min-w-0 text-left">
            <h1 className="truncate text-sm font-black leading-none text-green-950 sm:text-lg">
              Chacha & Vatija
            </h1>

            <p className="mt-1 text-[7px] font-black tracking-[0.3em] text-amber-600 sm:text-[9px]">
              AGRO
            </p>
          </div>
        </button>

        {/* =========================
            DESKTOP NAV
        ========================= */}

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                goToSection(item.id)
              }
              className="rounded-full px-3 py-2 text-sm font-bold text-green-950 transition hover:bg-green-50 hover:text-green-700"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* =========================
            RIGHT ACTIONS
        ========================= */}

        <div className="flex shrink-0 items-center gap-1">
          {/* TRACK ORDER */}

          <button
            type="button"
            onClick={handleTrackOrder}
            className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-100 lg:inline-flex"
          >
            <PackageSearch size={17} />

            <span>Track Order</span>
          </button>

          {/* =========================
              ACCOUNT DESKTOP
          ========================= */}

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() =>
                setAccountOpen(
                  (value) => !value
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-green-950 transition hover:bg-green-50"
              aria-label="Open account menu"
              aria-expanded={accountOpen}
            >
              <UserRound size={21} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-12 z-[100] w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold text-green-600">
                    Customer Account
                  </p>

                  <p className="mt-1 text-sm font-black text-green-950">
                    Coming Soon
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTrackOrder}
                  className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold text-gray-600 transition hover:bg-gray-50 hover:text-green-800"
                >
                  <PackageSearch
                    size={17}
                  />

                  My Orders / Track Order
                </button>
              </div>
            )}
          </div>

          {/* =========================
              CART
          ========================= */}

          <button
            type="button"
            onClick={handleCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-green-950 transition hover:bg-green-50"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={21} />

            {Number(cartCount) > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-white">
                {Number(cartCount) > 99
                  ? "99+"
                  : Number(cartCount)}
              </span>
            )}
          </button>

          {/* =========================
              MOBILE MENU BUTTON
          ========================= */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-green-950 transition hover:bg-green-50 xl:hidden"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
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

      {/* =========================
          MOBILE MENU
      ========================= */}

      {menuOpen && (
        <div className="border-t border-green-900/10 bg-white shadow-lg xl:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5">
            {/* NAV LINKS */}

            <nav
              className="space-y-1"
              aria-label="Mobile navigation"
            >
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
            </nav>

            {/* EXTRA ACTIONS */}

            <div className="mt-3 border-t border-gray-100 pt-3">
              {/* TRACK ORDER */}

              <button
                type="button"
                onClick={handleTrackOrder}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                <PackageSearch size={18} />

                Track Your Order
              </button>

              {/* ACCOUNT */}

              <button
                type="button"
                onClick={() =>
                  setAccountOpen(
                    (value) => !value
                  )
                }
                className="mt-2 flex min-h-12 w-full items-center gap-3 rounded-xl bg-stone-50 px-4 py-3 text-sm font-bold text-green-950"
                aria-expanded={accountOpen}
              >
                <UserRound size={19} />

                <span className="flex-1 text-left">
                  My Account
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    accountOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* ACCOUNT INFO */}

              {accountOpen && (
                <div className="mt-2 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold text-green-700">
                    Customer Account
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Account system will be
                    available after backend
                    integration.
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

