import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import FAQ from "./components/FAQ";
import TrustSection from "./components/TrustSection";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import AboutFarm from "./pages/AboutFarm";
import ContactFooter from "./pages/ContactFooter";
import ProductDetails from "./pages/ProductDetails";

import products from "./data/products";

const DELIVERY_CHARGE = 80;

function AppContent() {
  const navigate = useNavigate();

  /* =========================
     CART
  ========================= */

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "chacha_vatija_cart"
      );

      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* =========================
     LAST ORDER
  ========================= */

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "chacha_vatija_last_order"
      );

      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  /* =========================
     SAVE CART
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "chacha_vatija_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* =========================
     CART CALCULATIONS
  ========================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item?.price || 0) *
        Number(item?.quantity || 0),
    0
  );

  const deliveryCharge =
    cart.length > 0 ? DELIVERY_CHARGE : 0;

  const cartTotal =
    cartSubtotal + deliveryCharge;

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {
    if (!product) return;

    const stock = Number(product.stock || 0);

    if (stock <= 0) return;

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (
          Number(existing.quantity || 0) >= stock
        ) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  /* =========================
     INCREASE
  ========================= */

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const quantity = Number(
          item.quantity || 0
        );

        const stock = Number(item.stock || 0);

        if (quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: quantity + 1,
        };
      })
    );
  };

  /* =========================
     DECREASE
  ========================= */

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity:
              Number(item.quantity || 0) - 1,
          };
        })
        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )
    );
  };

  /* =========================
     REMOVE
  ========================= */

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================
     CLEAR CART
  ========================= */

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(
      "chacha_vatija_cart"
    );
  };

  /* =========================
     PRODUCT DETAILS
  ========================= */

  const handleProductDetails = (product) => {
    if (!product) return;

    navigate(`/product/${product.id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     ORDER ID
  ========================= */

  const generateOrderId = () => {
    const number = Math.floor(
      100000 + Math.random() * 900000
    );

    return `CVA-${number}`;
  };

  /* =========================
     ORDER COMPLETE
  ========================= */

  const handleOrderComplete = (order) => {
    const completedOrder = {
      ...order,

      orderId:
        order?.orderId || generateOrderId(),

      status: "Order Placed",

      createdAt:
        order?.createdAt ||
        new Date().toISOString(),

      subtotal:
        Number(order?.subtotal || cartSubtotal),

      deliveryCharge:
        Number(
          order?.deliveryCharge ||
            deliveryCharge
        ),

      total:
        Number(order?.total || cartTotal),
    };

    setLastOrder(completedOrder);

    localStorage.setItem(
      "chacha_vatija_last_order",
      JSON.stringify(completedOrder)
    );

    clearCart();

    setIsCartOpen(false);

    navigate("/order-success");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     HOME
  ========================= */

  const goHome = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* NAVBAR */}

      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
      />

      {/* ROUTES */}

      <Routes>
        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            <>
              <Home />

              <Shop
                addToCart={addToCart}
                onProductDetails={
                  handleProductDetails
                }
              />

              <AboutFarm />

              <TrustSection />

              <FAQ />

              <ContactFooter />
            </>
          }
        />

        {/* ================= PRODUCT ================= */}

        <Route
          path="/product/:id"
          element={
            <DynamicProductDetails
              addToCart={addToCart}
              onBack={goHome}
              onProductDetails={
                handleProductDetails
              }
            />
          }
        />

        {/* ================= CHECKOUT ================= */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              cartSubtotal={cartSubtotal}
              deliveryCharge={deliveryCharge}
              cartTotal={cartTotal}
              onBackToShop={goHome}
              onOrderComplete={
                handleOrderComplete
              }
            />
          }
        />

        {/* ================= ORDER SUCCESS ================= */}

        <Route
          path="/order-success"
          element={
            <OrderSuccess
              order={lastOrder}
            />
          }
        />

        {/* ================= TRACK ORDER ================= */}

        <Route
          path="/track-order"
          element={
            <TrackOrder
              order={lastOrder}
            />
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      {/* CART DRAWER */}

      <CartDrawer
        cart={cart}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        deliveryCharge={deliveryCharge}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
        increaseQuantity={
          increaseQuantity
        }
        decreaseQuantity={
          decreaseQuantity
        }
        removeFromCart={
          removeFromCart
        }
        clearCart={clearCart}
        onCheckout={() => {
          setIsCartOpen(false);

          navigate("/checkout");

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}

/* =====================================================
   DYNAMIC PRODUCT DETAILS
===================================================== */

function DynamicProductDetails({
  addToCart,
  onBack,
  onProductDetails,
}) {
  const { id } = useParams();

  const product = products.find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!product) {
    return <NotFound />;
  }

  return (
    <ProductDetails
      product={product}
      addToCart={addToCart}
      onBack={onBack}
      onProductDetails={
        onProductDetails
      }
    />
  );
}

/* =====================================================
   ORDER SUCCESS
===================================================== */

function OrderSuccess({ order }) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-4 py-16 sm:px-6">
      <div className="w-full max-w-xl rounded-3xl border border-green-100 bg-white p-7 text-center shadow-xl sm:p-12">
        {/* Success Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl font-black text-green-700">
            ✓
          </span>
        </div>

        <h1 className="mt-7 text-3xl font-black text-green-950 sm:text-4xl">
          অর্ডার সফল হয়েছে!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          ধন্যবাদ। আপনার অর্ডারটি সফলভাবে
          গ্রহণ করা হয়েছে।
        </p>

        {order && (
          <>
            {/* Order ID */}

            <div className="mt-7 rounded-2xl bg-green-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Your Order ID
              </p>

              <p className="mt-2 break-all text-2xl font-black text-green-900">
                {order.orderId}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                এই Order ID সংরক্ষণ করে রাখুন।
              </p>
            </div>

            {/* Total */}

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-stone-50 px-5 py-4">
              <span className="text-sm font-bold text-gray-500">
                Order Total
              </span>

              <span className="text-xl font-black text-green-800">
                ৳
                {Number(
                  order.total || 0
                ).toLocaleString()}
              </span>
            </div>
          </>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={goHome}
            className="flex-1 rounded-full bg-green-800 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
          >
            Shopping করুন
          </button>

          {order && (
            <button
              type="button"
              onClick={() =>
                navigate("/track-order")
              }
              className="flex-1 rounded-full border border-green-200 px-6 py-3.5 font-bold text-green-800 transition hover:bg-green-50"
            >
              Order Track করুন
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   TRACK ORDER
===================================================== */

function TrackOrder({ order }) {
  const navigate = useNavigate();

  if (!order) {
    return (
      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-5 py-20">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-3xl">
            📦
          </div>

          <h1 className="mt-6 text-3xl font-black text-green-950">
            কোনো Order পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-gray-500">
            প্রথমে একটি order করুন।
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Shop করুন
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-73px)] bg-stone-50 px-4 py-12 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
            Order Tracking
          </span>

          <h1 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl">
            আপনার Order Track করুন
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Order ID:{" "}
            <strong className="text-green-800">
              {order.orderId}
            </strong>
          </p>
        </div>

        {/* Timeline */}

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <TimelineItem
            active
            number="✓"
            title="Order Placed"
            description="আপনার Order সফলভাবে গ্রহণ করা হয়েছে।"
          />

          <TimelineItem
            number="2"
            title="Processing"
            description="আপনার order প্রস্তুত করা হবে।"
          />

          <TimelineItem
            number="3"
            title="Out for Delivery"
            description="Delivery rider আপনার কাছে পৌঁছে দেবে।"
          />

          <TimelineItem
            last
            number="4"
            title="Delivered"
            description="Order successfully delivered."
          />
        </div>

        {/* Customer Information */}

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-black text-green-950">
            Delivery Information
          </h2>

          <div className="mt-5 space-y-4 text-sm text-gray-600">
            <p>
              <span className="font-bold text-gray-900">
                Name:
              </span>{" "}
              {order.customer?.name || "-"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Phone:
              </span>{" "}
              {order.customer?.phone || "-"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                District:
              </span>{" "}
              {order.customer?.district || "-"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Address:
              </span>{" "}
              {order.customer?.address || "-"}
            </p>
          </div>
        </div>

        {/* Total */}

        <div className="mt-6 rounded-3xl bg-green-950 p-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <span className="font-bold text-white/60">
              Order Total
            </span>

            <span className="text-2xl font-black text-lime-400">
              ৳
              {Number(
                order.total || 0
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Home এ ফিরে যান
          </button>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   TIMELINE ITEM
===================================================== */

function TimelineItem({
  active = false,
  last = false,
  number,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-black ${
            active
              ? "bg-green-800 text-white"
              : "border-2 border-gray-200 bg-gray-50 text-gray-400"
          }`}
        >
          {number}
        </div>

        {!last && (
          <div className="mt-2 h-full min-h-8 w-px bg-gray-200" />
        )}
      </div>

      <div className="pb-8">
        <h3
          className={`font-black ${
            active
              ? "text-green-950"
              : "text-gray-600"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   404
===================================================== */

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-5">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
          Chacha & Vatija Agro
        </p>

        <h1 className="mt-3 text-7xl font-black text-green-800">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-black text-green-950">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          আপনি যে page খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-7 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
        >
          Home এ যান
        </button>
      </div>
    </section>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

