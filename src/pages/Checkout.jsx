
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  UserRound,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

function Checkout({
  cart = [],
  cartSubtotal = 0,
  deliveryCharge = 0,
  cartTotal = 0,
  onBackToShop = () => {},
  onOrderComplete = () => {},
})  {
  const safeCart = Array.isArray(cart) ? cart : [];

  /* =========================
     SAFE PRICE CALCULATION
  ========================= */

  const calculatedSubtotal = safeCart.reduce(
    (total, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;

      return total + price * quantity;
    },
    0
  );

  const passedSubtotal = Number(cartSubtotal);

  const safeSubtotal =
    Number.isFinite(passedSubtotal) && passedSubtotal > 0
      ? passedSubtotal
      : calculatedSubtotal;

  const passedDelivery = Number(deliveryCharge);

  const safeDeliveryCharge =
    Number.isFinite(passedDelivery) && passedDelivery >= 0
      ? passedDelivery
      : safeCart.length > 0
        ? 80
        : 0;

  const calculatedTotal =
    safeSubtotal + safeDeliveryCharge;

  const passedTotal = Number(cartTotal);

  const safeTotal =
    Number.isFinite(passedTotal) && passedTotal > 0
      ? passedTotal
      : calculatedTotal;

  const totalItems = safeCart.reduce(
    (total, item) =>
      total + (Number(item?.quantity) || 0),
    0
  );

  /* =========================
     FORM STATE
  ========================= */

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [errors, setErrors] = useState({});

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();

    if (!name) {
      newErrors.name = "আপনার নাম লিখুন";
    }

    if (!phone) {
      newErrors.phone = "মোবাইল নম্বর লিখুন";
    } else if (!/^01[3-9]\d{8}$/.test(phone)) {
      newErrors.phone =
        "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন";
    }

    if (!formData.district) {
      newErrors.district =
        "জেলা নির্বাচন করুন";
    }

    if (!address) {
      newErrors.address =
        "সম্পূর্ণ ঠিকানা লিখুন";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     PLACE ORDER
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (safeCart.length === 0) {
      return;
    }

    /*
      IMPORTANT:
      App.jsx will generate the final Order ID.
      Checkout does NOT generate an ID here.
    */

    const order = {
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        district: formData.district,
        address: formData.address.trim(),
        note: formData.note.trim(),
      },

      paymentMethod: paymentMethod,

      items: safeCart.map((item, index) => ({
        id:
          item?.id ??
          `product-${index}`,

        name:
          item?.name ||
          "Agro Product",

        image:
          item?.image || "",

        price:
          Number(item?.price) || 0,

        quantity:
          Number(item?.quantity) || 0,

        unit:
          item?.unit || "unit",
      })),

      subtotal: safeSubtotal,

      deliveryCharge:
        safeDeliveryCharge,

      total: safeTotal,

      status: "Order Placed",

      createdAt:
        new Date().toISOString(),
    };

    /*
      App.jsx:
      - generates Order ID
      - saves order
      - clears cart
      - navigates to success page
    */

    onOrderComplete(order);
  };

  /* =========================
     EMPTY CART
  ========================= */

  if (safeCart.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <ShoppingBag
              size={36}
              className="text-green-700"
            />
          </div>

          <h1 className="mt-5 text-2xl font-black text-green-950">
            আপনার Cart খালি
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Checkout করার জন্য প্রথমে কিছু পণ্য
            Cart-এ যোগ করুন।
          </p>

          <button
            type="button"
            onClick={onBackToShop}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={17} />
            Shopping শুরু করুন
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-amber-600">
            Chacha & Vatija Agro
          </p>

          <h1 className="mt-2 text-3xl font-black text-green-950 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার delivery information দিয়ে
            order সম্পন্ন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="space-y-6">

              {/* CUSTOMER INFORMATION */}

              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <UserRound
                      size={19}
                      className="text-green-800"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-green-950">
                      Customer Information
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      আপনার সঠিক তথ্য দিন।
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      আপনার নাম{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="আপনার নাম"
                        className={`min-h-12 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition focus:ring-4 ${
                          errors.name
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <ErrorText>
                        {errors.name}
                      </ErrorText>
                    )}
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      মোবাইল নম্বর{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className={`min-h-12 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition focus:ring-4 ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      />
                    </div>

                    {errors.phone && (
                      <ErrorText>
                        {errors.phone}
                      </ErrorText>
                    )}
                  </div>

                  {/* DISTRICT */}

                  <div>
                    <label
                      htmlFor="district"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      জেলা{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`min-h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition focus:ring-4 ${
                          errors.district
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      >
                        <option value="">
                          জেলা নির্বাচন করুন
                        </option>

                        <option value="Dhaka">
                          ঢাকা
                        </option>

                        <option value="Barishal">
                          বরিশাল
                        </option>

                        <option value="Chattogram">
                          চট্টগ্রাম
                        </option>

                        <option value="Khulna">
                          খুলনা
                        </option>

                        <option value="Rajshahi">
                          রাজশাহী
                        </option>

                        <option value="Rangpur">
                          রংপুর
                        </option>

                        <option value="Sylhet">
                          সিলেট
                        </option>

                        <option value="Mymensingh">
                          ময়মনসিংহ
                        </option>

                        <option value="Gazipur">
                          গাজীপুর
                        </option>

                        <option value="Narayanganj">
                          নারায়ণগঞ্জ
                        </option>

                        <option value="Cumilla">
                          কুমিল্লা
                        </option>
                      </select>
                    </div>

                    {errors.district && (
                      <ErrorText>
                        {errors.district}
                      </ErrorText>
                    )}
                  </div>

                  {/* ADDRESS */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      সম্পূর্ণ ঠিকানা{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={4}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="বাড়ি/রোড, এলাকা, থানা/উপজেলা..."
                      className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-4 ${
                        errors.address
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                      }`}
                    />

                    {errors.address && (
                      <ErrorText>
                        {errors.address}
                      </ErrorText>
                    )}
                  </div>

                  {/* NOTE */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="note"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Order Note{" "}
                      <span className="font-normal text-gray-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    />
                  </div>
                </div>
              </section>

              {/* PAYMENT */}

              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <CreditCard
                      size={19}
                      className="text-amber-700"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-green-950">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      এখন Cash on Delivery available।
                    </p>
                  </div>
                </div>

                <label
                  className={`mt-6 flex cursor-pointer gap-4 rounded-2xl border p-4 ${
                    paymentMethod === "cod"
                      ? "border-green-700 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                    className="mt-1 h-4 w-4 accent-green-700"
                  />

                  <div className="flex flex-1 items-start gap-3">
                    <Truck
                      size={22}
                      className="mt-1 text-green-700"
                    />

                    <div>
                      <p className="text-sm font-black text-green-950">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        পণ্য হাতে পাওয়ার সময়
                        payment করুন।
                      </p>
                    </div>
                  </div>
                </label>

                <div className="mt-4 rounded-xl bg-amber-50 p-4">
                  <p className="text-xs font-bold text-amber-800">
                    Online Payment Coming Soon
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-amber-700">
                    পরবর্তী ধাপে bKash, Nagad এবং
                    অন্যান্য payment integration
                    করা হবে।
                  </p>
                </div>
              </section>
            </div>

            {/* =========================
                RIGHT SIDE
            ========================= */}

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                {/* SUMMARY HEADER */}

                <div className="bg-green-950 p-5 text-white sm:p-6">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} />

                    <h2 className="text-lg font-black">
                      Order Summary
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-white/60">
                    {totalItems} টি পণ্য
                  </p>
                </div>

                {/* PRODUCTS */}

                <div className="max-h-80 overflow-y-auto p-5">
                  <div className="space-y-4">
                    {safeCart.map(
                      (item, index) => {
                        const price =
                          Number(item?.price) || 0;

                        const quantity =
                          Number(item?.quantity) || 0;

                        const itemTotal =
                          price * quantity;

                        return (
                          <div
                            key={
                              item?.id ??
                              `checkout-${index}`
                            }
                            className="flex gap-3"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                              {item?.image ? (
                                <img
                                  src={item.image}
                                  alt={
                                    item?.name ||
                                    "Product"
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-400">
                                  No Image
                                </div>
                              )}

                              <span className="absolute right-1 top-1 rounded-full bg-green-800 px-1.5 py-0.5 text-[9px] font-black text-white">
                                {quantity}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-bold text-green-950">
                                {item?.name ||
                                  "Agro Product"}
                              </h3>

                              <p className="mt-1 text-[11px] text-gray-500">
                                ৳
                                {price.toLocaleString()}{" "}
                                × {quantity}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-black text-green-800">
                              ৳
                              {itemTotal.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* PRICE */}

                <div className="border-t border-gray-100 p-5 sm:p-6">
                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>

                      <span className="font-semibold text-gray-800">
                        ৳
                        {safeSubtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>Delivery</span>

                      <span className="font-semibold text-gray-800">
                        ৳
                        {safeDeliveryCharge.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-green-950">
                          Total
                        </span>

                        <span className="text-2xl font-black text-green-800">
                          ৳
                          {safeTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CONFIRM */}

                  <button
                    type="submit"
                    className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99]"
                  >
                    <CheckCircle2 size={18} />
                    Order Confirm করুন
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-400 sm:text-xs">
                    <ShieldCheck size={15} />
                    আপনার তথ্য নিরাপদে রাখা হবে
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

/* =========================
   ERROR MESSAGE
========================= */

function ErrorText({ children }) {
  return (
    <p className="mt-1.5 text-xs font-semibold text-red-500">
      {children}
    </p>
  );
}

export default Checkout;

