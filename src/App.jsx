
import { useEffect, useMemo, useState } from "react";
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

/* =========================================
   APP CONTENT
========================================= */

function AppContent() {
  /* =========================================
     CART STATE
  ========================================= */

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        "chacha_vatija_cart"
      );

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* =========================================
     LAST ORDER
  ========================================= */

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

  /* =========================================
     SAVE CART
  ========================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        "chacha_vatija_cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Cart save error:",
        error
      );
    }
  }, [cart]);

  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = (product) => {
    if (!product) {
      console.error(
        "Add to cart failed: Product not found."
      );
      return;
    }

    const productId = Number(product.id);
    const stock = Number(product.stock) || 0;

    if (!productId) {
      console.error(
        "Add to cart failed: Invalid product ID."
      );
      return;
    }

    if (stock <= 0) {
      return;
    }

    setCart((currentCart) => {
      const safeCart = Array.isArray(
        currentCart
      )
        ? currentCart
        : [];

      const existingProduct =
        safeCart.find(
          (item) =>
            Number(item.id) === productId
        );

      /* Product already in cart */

      if (existingProduct) {
        const currentQuantity =
          Number(
            existingProduct.quantity
          ) || 0;

        if (currentQuantity >= stock) {
          return safeCart;
        }

        return safeCart.map((item) =>
          Number(item.id) === productId
            ? {
                ...item,
                quantity:
                  currentQuantity + 1,
              }
            : item
        );
      }

      /* New product */

      return [
        ...safeCart,
        {
          ...product,
          id: productId,
          price:
            Number(product.price) || 0,
          stock: stock,
          quantity: 1,
        },
      ];
    });

    /* Open Cart */

    setIsCartOpen(true);
  };

  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = (id) => {
    setCart((currentCart) => {
      const safeCart = Array.isArray(
        currentCart
      )
        ? currentCart
        : [];

      return safeCart.map((item) => {
        if (Number(item.id) !== Number(id)) {
          return item;
        }

        const quantity =
          Number(item.quantity) || 0;

        const stock =
          Number(item.stock) || 0;

        if (quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: quantity + 1,
        };
      });
    });
  };

  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = (id) => {
    setCart((currentCart) => {
      const safeCart = Array.isArray(
        currentCart
      )
        ? currentCart
        : [];

      return safeCart
        .map((item) => {
          if (
            Number(item.id) !== Number(id)
          ) {
            return item;
          }

          const quantity =
            Number(item.quantity) || 0;

          return {
            ...item,
            quantity: quantity - 1,
          };
        })
        .filter(
          (item) =>
            Number(item.quantity) > 0
        );
    });
  };

  /* =========================================
     REMOVE PRODUCT
  ========================================= */

  const removeFromCart = (id) => {
    setCart((currentCart) => {
      const safeCart = Array.isArray(
        currentCart
      )
        ? currentCart
        : [];

      return safeCart.filter(
        (item) =>
          Number(item.id) !== Number(id)
      );
    });
  };

  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = () => {
    setCart([]);

    try {
      localStorage.removeItem(
        "chacha_vatija_cart"
      );
    } catch {
      // ignore
    }
  };

  /* =========================================
     CART COUNT
  ========================================= */

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 0),
      0
    );
  }, [cart]);

  /* =========================================
     CART SUBTOTAL
  ========================================= */

  const cartSubtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return total + price * quantity;
      },
      0
    );
  }, [cart]);

  /* =========================================
     DELIVERY
  ========================================= */

  const deliveryCharge =
    cart.length > 0 ? 80 : 0;

  /* =========================================
     TOTAL
  ========================================= */

  const cartTotal =
    cartSubtotal + deliveryCharge;

  /* =========================================
     PRODUCT DETAILS
  ========================================= */

  const handleProductDetails = (
    product
  ) => {
    if (!product?.id) {
      return;
    }

    navigate(
      `/product/${product.id}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     ORDER ID
  ========================================= */

  const generateOrderId = () => {
    const randomNumber =
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    return `CVA-${randomNumber}`;
  };

  /* =========================================
     ORDER COMPLETE
  ========================================= */

  const handleOrderComplete = (order) => {
    if (!order) {
      return;
    }

    const completedOrder = {
      ...order,

      orderId:
        generateOrderId(),

      status:
        "Order Placed",

      createdAt:
        new Date().toISOString(),
    };

    setLastOrder(
      completedOrder
    );

    try {
      localStorage.setItem(
        "chacha_vatija_last_order",
        JSON.stringify(
          completedOrder
        )
      );
    } catch (error) {
      console.error(
        "Order save error:",
        error
      );
    }

    clearCart();

    setIsCartOpen(false);

    navigate(
      "/order-success"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     GO HOME
  ========================================= */

  const goHome = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="min-h-screen bg-stone-50">

      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
      />

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={
            <>
              <Home />

              <Shop
                addToCart={
                  addToCart
                }
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

        {/* =========================
            PRODUCT DETAILS
        ========================= */}

        <Route
          path="/product/:id"
          element={
            <DynamicProductDetails
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
        ========================= */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              cartSubtotal={
                cartSubtotal
              }
              deliveryCharge={
                deliveryCharge
              }
              cartTotal={
                cartTotal
              }
              clearCart={
                clearCart
              }
              onBackToShop={
                goHome
              }
              onOrderComplete={
                handleOrderComplete
              }
            />
          }
        />

        {/* =========================
            ORDER SUCCESS
        ========================= */}

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
        ========================= */}

        <Route
          path="/track-order"
          element={
            <TrackOrder
              order={lastOrder}
            />
          }
        />

        {/* =========================
            NOT FOUND
        ========================= */}

        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>

      {/* =========================
          CART DRAWER
      ========================= */}

      <CartDrawer
        cart={cart}
        cartCount={
          cartCount
        }
        cartSubtotal={
          cartSubtotal
        }
        deliveryCharge={
          deliveryCharge
        }
        cartTotal={
          cartTotal
        }
        isOpen={
          isCartOpen
        }
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
        clearCart={
          clearCart
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

/* =========================================
   DYNAMIC PRODUCT DETAILS
========================================= */

function DynamicProductDetails({
  addToCart,
  onBack,
  onProductDetails,
}) {
  const { id } =
    useParams();

  const product =
    products.find(
      (item) =>
        Number(item.id) ===
        Number(id)
    );

  if (!product) {
    return (
      <NotFound />
    );
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

/* =========================================
   ORDER SUCCESS
========================================= */

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

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl font-black text-green-700">
            ✓
          </span>
        </div>

        <h1 className="mt-7 text-3xl font-black text-green-950">
          অর্ডার সফল হয়েছে!
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          ধন্যবাদ। আপনার অর্ডারটি
          সফলভাবে গ্রহণ করা হয়েছে।
        </p>

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

/* =========================================
   TRACK ORDER
========================================= */

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

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-800 font-black text-white">
              ✓
            </div>

            <div>
              <h3 className="font-black text-green-950">
                Order Placed
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                আপনার Order সফলভাবে গ্রহণ করা হয়েছে।
              </p>
            </div>

          </div>

        </div>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-black text-green-950">
            Delivery Information
          </h2>

          <div className="mt-5 space-y-4 text-sm text-gray-600">

            <p>
              <span className="font-bold text-gray-900">
                Name:
              </span>{" "}
              {order.customer?.name ||
                "N/A"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Phone:
              </span>{" "}
              {order.customer?.phone ||
                "N/A"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                District:
              </span>{" "}
              {order.customer?.district ||
                "N/A"}
            </p>

            <p>
              <span className="font-bold text-gray-900">
                Address:
              </span>{" "}
              {order.customer?.address ||
                "N/A"}
            </p>

          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-green-950 p-6 text-white">

          <div className="flex items-center justify-between">

            <span className="font-bold text-white/60">
              Order Total
            </span>

            <span className="text-2xl font-black text-lime-400">
              ৳
              {(
                Number(
                  order.total
                ) || 0
              ).toLocaleString()}
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================
   NOT FOUND
========================================= */

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

/* =========================================
   APP
========================================= */

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

