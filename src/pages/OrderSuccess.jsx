
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const orderId =
    location.state?.orderId ||
    `CV-${Date.now().toString().slice(-8)}`;

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        {/* SUCCESS CARD */}

        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">
          {/* TOP */}

          <div className="bg-green-900 px-5 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <CheckCircle2
                size={48}
                className="text-green-700"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black sm:text-4xl">
              Order Confirmed!
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-green-100 sm:text-base">
              আপনার order সফলভাবে গ্রহণ করা হয়েছে।
              আমাদের team খুব শীঘ্রই আপনার সাথে
              যোগাযোগ করবে।
            </p>
          </div>

          {/* ORDER INFO */}

          <div className="p-5 sm:p-8">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Your Order ID
              </p>

              <p className="mt-2 text-2xl font-black tracking-wide text-green-950">
                {orderId}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                এই Order ID টি সংরক্ষণ করুন।
              </p>
            </div>

            {/* STEPS */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <PackageCheck
                    size={24}
                    className="text-green-700"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Order Received
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার order আমরা পেয়েছি।
                </p>
              </div>

              <div className="rounded-2xl bg-stone-50 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <PackageCheck
                    size={24}
                    className="text-amber-600"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Preparing
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার পণ্য প্রস্তুত করা হবে।
                </p>
              </div>

              <div className="rounded-2xl bg-stone-50 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Truck
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Delivery
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার ঠিকানায় delivery দেওয়া হবে।
                </p>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/track-order"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
              >
                Track Order
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-black text-green-800 transition hover:bg-green-50"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </div>

            {/* NOTE */}

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-center">
              <p className="text-xs leading-5 text-amber-800">
                💚 Chacha & Vatija Agro থেকে কেনাকাটা
                করার জন্য ধন্যবাদ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;

