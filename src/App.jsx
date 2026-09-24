import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import AboutFarm from "./pages/AboutFarm";
import ContactFooter from "./pages/ContactFooter";
import ProductDetails from "./pages/ProductDetails";

function AppContent() {
  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        "chacha_vatija_cart"
      );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch {
      return [];
    }
  });

  // =========================
  // SELECTED PRODUCT
  // =========================

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =========================
  // CART DRAWER
  // =========================

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  // =========================
  // LAST ORDER
  // =========================

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem(
        "chacha_vatija_last_order"
      );

      return savedOrder
        ? JSON.parse(savedOrder)
        : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "chacha_vatija_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
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

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // =========================
  // REMOVE PRODUCT
  // =========================

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =========================
  // PRODUCT DETAILS
  // =========================

  const handleProductDetails = (
    product
  ) => {
    setSelectedProduct(product);

    navigate("/product");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // ORDER ID
  // =========================

  const generateOrderId = () => {
    const randomNumber =
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    return `CVA-${randomNumber}`;
  };

  // =========================
  // ORDER COMPLETE
  // =========================

  const handleOrderComplete = (
    order
  ) => {
    const completedOrder = {
      ...order,

      orderId:
        generateOrderId(),

      status: "Order Placed",

      createdAt:
        new Date().toISOString(),
    };

    setLastOrder(
      completedOrder
    );

    localStorage.setItem(
      "chacha_vatija_last_order",
      JSON.stringify(
        completedOrder
      )
    );

    setCart([]);

    localStorage.removeItem(
      "chacha_vatija_cart"
    );

    setIsCartOpen(false);

    navigate("/order-success");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // GO HOME
  // =========================

  const goHome = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">

      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
      />

      {/* =========================
          ROUTES
      ========================== */}

      <Routes>

        {/* =========================
            HOME
        ========================== */}

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

              <ContactFooter />
            </>
          }
        />

        {/* =========================
            PRODUCT DETAILS
        ========================== */}

        <Route
          path="/product"
          element={
            <ProductDetails
              product={
                selectedProduct
              }
              addToCart={
                addToCart
              }
              onBack={goHome}
              onProductDetails={
                handleProductDetails
              }
            />
          }
        />

        {/* =========================
            CHECKOUT
        ========================== */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onBackToShop={goHome}
              onOrderComplete={
                handleOrderComplete
              }
            />
          }
        />

        {/* =========================
            ORDER SUCCESS
        ========================== */}

        <Route
          path="/order-success"
          element={
            <OrderSuccess
              order={lastOrder}
            />
          }
        />

        {/* =========================
            TRACK ORDER
        ========================== */}

        <Route
          path="/track-order"
          element={
            <TrackOrder
              order={lastOrder}
            />
          }
        />

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      {/* =========================
          CART DRAWER
      ========================== */}

      <CartDrawer
        cart={cart}
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
        onCheckout={() => {
          setIsCartOpen(false);

          navigate(
            "/checkout"
          );

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />

    </div>
  );
}

// =====================================================
// ORDER SUCCESS
// =====================================================

function OrderSuccess({
  order,
}) {
  const navigate =
    useNavigate();

  const goHome = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-5 py-20">

      <div className="w-full max-w-xl rounded-3xl border border-green-100 bg-white p-8 text-center shadow-xl sm:p-12">

        {/* SUCCESS ICON */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

          <span className="text-4xl font-black text-green-700">
            ✓
          </span>

        </div>

        {/* TITLE */}

        <h1 className="mt-7 text-3xl font-black text-green-950">
          অর্ডার সফল হয়েছে!
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          ধন্যবাদ। আপনার অর্ডারটি
          সফলভাবে গ্রহণ করা হয়েছে।
        </p>

        {/* ORDER ID */}

        {order && (
          <div className="mt-6 rounded-2xl bg-green-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-green-600">
              Your Order ID
            </p>

            <p className="mt-2 text-2xl font-black text-green-900">
              {order.orderId}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              এই Order ID সংরক্ষণ করে রাখুন।
            </p>

          </div>
        )}

        {/* BUTTONS */}

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
                navigate(
                  "/track-order"
                )
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

// =====================================================
// TRACK ORDER
// =====================================================

function TrackOrder({
  order,
}) {
  const navigate =
    useNavigate();

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
            onClick={() =>
              navigate("/")
            }
            className="mt-6 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Shop করুন
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-73px)] bg-stone-50 px-5 py-16">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <div className="text-center">

          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
            Order Tracking
          </span>

          <h1 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl">
            আপনার Order Track করুন
          </h1>

          <p className="mt-3 text-gray-500">
            Order ID:{" "}
            <strong className="text-green-800">
              {order.orderId}
            </strong>
          </p>

        </div>

        {/* TIMELINE */}

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          {/* STEP 1 */}

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-800 font-black text-white">
              ✓
            </div>

            <div className="pb-8">

              <h3 className="font-black text-green-950">
                Order Placed
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                আপনার Order সফলভাবে গ্রহণ করা হয়েছে।
              </p>

            </div>

          </div>

          {/* STEP 2 */}

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-green-200 bg-green-50 font-bold text-green-700">
              2
            </div>

            <div className="pb-8">

              <h3 className="font-bold text-gray-700">
                Processing
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                আপনার order প্রস্তুত করা হবে।
              </p>

            </div>

          </div>

          {/* STEP 3 */}

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50 font-bold text-gray-400">
              3
            </div>

            <div className="pb-8">

              <h3 className="font-bold text-gray-500">
                Out for Delivery
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Delivery rider আপনার কাছে পৌঁছে দেবে।
              </p>

            </div>

          </div>

          {/* STEP 4 */}

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50 font-bold text-gray-400">
              4
            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Delivered
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Order successfully delivered.
              </p>

            </div>

          </div>

        </div>

        {/* DELIVERY INFORMATION */}

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-black text-green-950">
            Delivery Information
          </h2>

          <div className="mt-5 space-y-4 text-sm text-gray-600">

            <p>
              <span className="font-bold text-gray-900">
                Name:
              </span>{" "}
              {order.customer?.name}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Phone:
              </span>{" "}
              {order.customer?.phone}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                District:
              </span>{" "}
              {order.customer?.district}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Address:
              </span>{" "}
              {order.customer?.address}
            </p>

          </div>

        </div>

        {/* TOTAL */}

        <div className="mt-6 rounded-3xl bg-green-950 p-6 text-white">

          <div className="flex items-center justify-between">

            <span className="font-bold text-white/60">
              Order Total
            </span>

            <span className="text-2xl font-black text-lime-400">
              ৳
              {order.total?.toLocaleString()}
            </span>

          </div>

        </div>

        {/* HOME */}

        <div className="mt-7 text-center">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Home এ ফিরে যান
          </button>

        </div>

      </div>

    </section>
  );
}

// =====================================================
// 404
// =====================================================

function NotFound() {
  const navigate =
    useNavigate();

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
          onClick={() =>
            navigate("/")
          }
          className="mt-7 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
        >
          Home এ যান
        </button>

      </div>

    </section>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;