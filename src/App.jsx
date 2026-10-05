import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import FAQ from "./components/FAQ";
import TrustSection from "./components/TrustSection";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import AboutFarm from "./pages/AboutFarm";
import ContactFooter from "./pages/ContactFooter";
import ProductDetails from "./pages/ProductDetails";

// Data
import products from "./data/products";

// ============================================================
// CONSTANTS
// ============================================================

const DELIVERY_CHARGE = 80;

const CART_STORAGE_KEY = "chacha_vatija_cart";

const LAST_ORDER_STORAGE_KEY =
  "chacha_vatija_last_order";

// ============================================================
// APP CONTENT
// ============================================================

function AppContent() {
  const navigate = useNavigate();

  // ==========================================================
  // CART STATE
  // ==========================================================

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  // ==========================================================
  // LAST ORDER STATE
  // ==========================================================

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem(
        LAST_ORDER_STORAGE_KEY
      );

      return savedOrder
        ? JSON.parse(savedOrder)
        : null;
    } catch (error) {
      console.error(
        "Failed to load last order:",
        error
      );

      return null;
    }
  });

  // ==========================================================
  // SAVE CART
  // ==========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cart]);

  // ==========================================================
  // CART CALCULATIONS
  // ==========================================================

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryCharge =
    cart.length > 0
      ? DELIVERY_CHARGE
      : 0;

  const cartTotal =
    cartSubtotal + deliveryCharge;

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const addToCart = (product) => {
    if (!product) return;

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

    setCartOpen(true);
  };

  // ==========================================================
  // INCREASE QUANTITY
  // ==========================================================

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  // ==========================================================
  // DECREASE QUANTITY
  // ==========================================================

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )
    );
  };

  // ==========================================================
  // REMOVE FROM CART
  // ==========================================================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ==========================================================
  // CLEAR CART
  // ==========================================================

  const clearCart = () => {
    setCart([]);
  };

  // ==========================================================
  // PRODUCT DETAILS
  // ==========================================================

  const handleProductDetails = (product) => {
    if (!product?.id) return;

    navigate(`/product/${product.id}`);
  };

  // ==========================================================
  // GENERATE ORDER ID
  // ==========================================================

  const generateOrderId = () => {
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    return `CV-${randomNumber}`;
  };

  // ==========================================================
  // ORDER COMPLETE
  // ==========================================================

  const handleOrderComplete = (orderData) => {
    const completedOrder = {
      ...orderData,

      orderId:
        orderData?.orderId ||
        generateOrderId(),

      items:
        orderData?.items ||
        [...cart],

      subtotal:
        orderData?.subtotal ??
        cartSubtotal,

      deliveryCharge:
        orderData?.deliveryCharge ??
        deliveryCharge,

      total:
        orderData?.total ??
        cartTotal,

      createdAt:
        orderData?.createdAt ||
        new Date().toISOString(),
    };

    // Save order in React state
    setLastOrder(completedOrder);

    // Save order in localStorage
    try {
      localStorage.setItem(
        LAST_ORDER_STORAGE_KEY,
        JSON.stringify(completedOrder)
      );
    } catch (error) {
      console.error(
        "Failed to save last order:",
        error
      );
    }

    // Clear cart
    setCart([]);

    // Close cart drawer
    setCartOpen(false);

    // Go to success page
    navigate("/order-success", {
      state: {
        orderId:
          completedOrder.orderId,
      },
    });
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setCartOpen(true)
        }
      />

      <CartDrawer
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
        cart={cart}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        deliveryCharge={deliveryCharge}
        cartTotal={cartTotal}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => {
          setCartOpen(false);
          navigate("/checkout");
        }}
      />

      <Routes>

        {/* ==================================================
            HOME
        ================================================== */}

        <Route
          path="/"
          element={
            <>
              <Home
                products={products}
                onAddToCart={addToCart}
                onProductDetails={
                  handleProductDetails
                }
              />

              <Shop
                products={products}
                onAddToCart={addToCart}
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

        {/* ==================================================
            PRODUCT DETAILS
        ================================================== */}

        <Route
          path="/product/:id"
          element={
            <DynamicProductDetails
              products={products}
              onAddToCart={addToCart}
            />
          }
        />

        {/* ==================================================
            CHECKOUT
        ================================================== */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              subtotal={cartSubtotal}
              deliveryCharge={
                deliveryCharge
              }
              total={cartTotal}
              onOrderComplete={
                handleOrderComplete
              }
            />
          }
        />

        {/* ==================================================
            ORDER SUCCESS
        ================================================== */}

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* ==================================================
            TRACK ORDER
        ================================================== */}

        <Route
          path="/track-order"
          element={
            <TrackOrder
              lastOrder={lastOrder}
            />
          }
        />

        {/* ==================================================
            404
        ================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}

// ============================================================
// DYNAMIC PRODUCT DETAILS
// ============================================================

function DynamicProductDetails({
  products,
  onAddToCart,
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
      onAddToCart={onAddToCart}
    />
  );
}

// ============================================================
// TRACK ORDER
// ============================================================

function TrackOrder({ lastOrder }) {
  const navigate = useNavigate();

  if (!lastOrder) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl">

          <div className="rounded-3xl border border-green-100 bg-white p-6 text-center shadow-xl sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <PackageIcon />
            </div>

            <h1 className="mt-5 text-2xl font-black text-green-950 sm:text-3xl">
              No Recent Order
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              আপনার কোনো recent order পাওয়া যায়নি।
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
              className="mt-7 inline-flex items-center justify-center rounded-2xl bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-3xl">

        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">

          {/* HEADER */}

          <div className="bg-green-900 px-5 py-8 text-center text-white sm:px-10">

            <h1 className="text-2xl font-black sm:text-4xl">
              Track Your Order
            </h1>

            <p className="mt-2 text-sm text-green-100">
              আপনার order-এর বর্তমান status দেখুন।
            </p>
          </div>

          <div className="p-5 sm:p-8">

            {/* ORDER ID */}

            <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center">

              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Order ID
              </p>

              <p className="mt-2 break-all text-2xl font-black text-green-950">
                {lastOrder.orderId}
              </p>

            </div>

            {/* TIMELINE */}

            <div className="mt-8 space-y-6">

              <TimelineItem
                title="Order Received"
                description="আপনার order সফলভাবে গ্রহণ করা হয়েছে।"
                active
              />

              <TimelineItem
                title="Preparing"
                description="আপনার পণ্য প্রস্তুত করা হবে।"
                active
              />

              <TimelineItem
                title="Delivery"
                description="পণ্য আপনার ঠিকানায় পাঠানো হবে।"
                active={false}
              />

            </div>

            {/* ORDER SUMMARY */}

            <div className="mt-8 rounded-2xl bg-stone-50 p-5">

              <h2 className="text-lg font-black text-green-950">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3">

                {Array.isArray(
                  lastOrder.items
                ) &&
                  lastOrder.items.map(
                    (item, index) => (
                      <div
                        key={
                          item.id ||
                          index
                        }
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <div>
                          <p className="font-bold text-gray-800">
                            {item.name ||
                              "Product"}
                          </p>

                          <p className="text-xs text-gray-500">
                            Qty:{" "}
                            {item.quantity ||
                              1}
                          </p>
                        </div>

                        <p className="font-black text-green-800">
                          ৳
                          {(
                            Number(
                              item.price ||
                                0
                            ) *
                            Number(
                              item.quantity ||
                                1
                            )
                          ).toLocaleString(
                            "en-BD"
                          )}
                        </p>
                      </div>
                    )
                  )}

              </div>

              <div className="my-5 border-t border-gray-200" />

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-bold">
                  ৳
                  {Number(
                    lastOrder.subtotal ||
                      0
                  ).toLocaleString(
                    "en-BD"
                  )}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-bold">
                  ৳
                  {Number(
                    lastOrder.deliveryCharge ||
                      0
                  ).toLocaleString(
                    "en-BD"
                  )}
                </span>
              </div>

              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">

                <span className="font-black text-green-950">
                  Total
                </span>

                <span className="text-xl font-black text-green-800">
                  ৳
                  {Number(
                    lastOrder.total ||
                      0
                  ).toLocaleString(
                    "en-BD"
                  )}
                </span>

              </div>

            </div>

            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-black text-green-800 transition hover:bg-green-50"
            >
              <ShoppingBagIcon />
              Continue Shopping
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// TIMELINE ITEM
// ============================================================

function TimelineItem({
  title,
  description,
  active,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {active ? (
            <CheckIcon />
          ) : (
            <PackageIcon />
          )}
        </div>

        <div className="mt-2 h-full w-px bg-gray-200" />

      </div>

      <div className="pb-5">

        <h3 className="font-black text-green-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>

      </div>
    </div>
  );
}

// ============================================================
// NOT FOUND
// ============================================================

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4 py-12">

      <div className="max-w-md text-center">

        <p className="text-7xl font-black text-green-800">
          404
        </p>

        <h1 className="mt-4 text-2xl font-black text-green-950">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          আপনি যে pageটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          className="mt-7 rounded-2xl bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
        >
          Go Home
        </button>

      </div>
    </main>
  );
}

// ============================================================
// SIMPLE ICONS
// ============================================================

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.5 9.4-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ============================================================
// ROOT APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;