import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

const districts = [
  "Barisal",
  "Barguna",
  "Bhola",
  "Jhalokati",
  "Pirojpur",
  "Patuakhali",
  "Dhaka",
  "Chattogram",
  "Cumilla",
  "Feni",
  "Noakhali",
  "Lakshmipur",
  "Cox's Bazar",
  "Rajshahi",
  "Natore",
  "Naogaon",
  "Chapainawabganj",
  "Pabna",
  "Bogura",
  "Joypurhat",
  "Rangpur",
  "Dinajpur",
  "Kurigram",
  "Gaibandha",
  "Nilphamari",
  "Lalmonirhat",
  "Thakurgaon",
  "Panchagarh",
  "Khulna",
  "Bagerhat",
  "Satkhira",
  "Jessore",
  "Jhenaidah",
  "Magura",
  "Narail",
  "Kushtia",
  "Chuadanga",
  "Meherpur",
  "Sylhet",
  "Moulvibazar",
  "Habiganj",
  "Sunamganj",
  "Mymensingh",
  "Jamalpur",
  "Netrokona",
  "Sherpur",
  "Narsingdi",
  "Narayanganj",
  "Gazipur",
  "Tangail",
  "Kishoreganj",
  "Faridpur",
  "Gopalganj",
  "Madaripur",
  "Rajbari",
  "Shariatpur",
  "Manikganj",
];

function Checkout({
  cart,
  onBackToShop,
  onOrderComplete,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 ? 80 : 0;

  const total =
    subtotal + deliveryCharge;

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "আপনার নাম লিখুন";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "মোবাইল নম্বর লিখুন";
    } else if (
      !/^01[3-9]\d{8}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "সঠিক বাংলাদেশি মোবাইল নম্বর দিন";
    }

    if (!formData.district) {
      newErrors.district =
        "জেলা নির্বাচন করুন";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "সম্পূর্ণ ঠিকানা লিখুন";
    } else if (
      formData.address.trim().length <
      10
    ) {
      newErrors.address =
        "আরও বিস্তারিত ঠিকানা দিন";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        district: formData.district,
        address: formData.address.trim(),
      },

      products: cart,

      subtotal,

      deliveryCharge,

      total,

      totalItems,

      paymentMethod:
        "Cash on Delivery",

      createdAt:
        new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);

      onOrderComplete(order);
    }, 700);
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-stone-50 px-5 py-20">

        <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

            <ShoppingBag
              size={34}
              className="text-green-700"
            />

          </div>

          <h2 className="mt-6 text-2xl font-black text-green-950">
            আপনার Cart খালি
          </h2>

          <p className="mt-3 text-gray-500">
            Checkout করার আগে একটি পণ্য
            Cart-এ যোগ করুন।
          </p>

          <button
            type="button"
            onClick={onBackToShop}
            className="mt-7 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Shop এ ফিরে যান
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-stone-50 px-5 py-12 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <button
          type="button"
          onClick={onBackToShop}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-800 transition hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Shop এ ফিরে যান
        </button>

        {/* HEADER */}

        <div className="mb-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
            <ShieldCheck size={16} />
            Secure Checkout
          </span>

          <h1 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl lg:text-5xl">
            আপনার অর্ডার সম্পন্ন করুন
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-gray-500">
            আপনার সঠিক তথ্য দিন। আমরা আপনার
            দেওয়া ঠিকানায় পণ্য পৌঁছে দেব।
          </p>

        </div>

        {/* MAIN GRID */}

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* =========================
              FORM
          ========================== */}

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <Truck
                  size={21}
                  className="text-green-700"
                />
              </div>

              <div>
                <h2 className="text-xl font-black text-green-950">
                  Delivery Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  পণ্য পৌঁছানোর তথ্য দিন
                </p>
              </div>

            </div>

            {/* NAME */}

            <div className="mt-8">

              <label
                htmlFor="checkout-name"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                আপনার নাম
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="checkout-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার পূর্ণ নাম"
                  className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:bg-white ${
                    errors.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-green-600"
                  }`}
                />

              </div>

              {errors.name && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.name}
                </p>
              )}

            </div>

            {/* PHONE */}

            <div className="mt-5">

              <label
                htmlFor="checkout-phone"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                মোবাইল নম্বর
              </label>

              <div className="relative">

                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                  className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:bg-white ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-green-600"
                  }`}
                />

              </div>

              {errors.phone && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* DISTRICT */}

            <div className="mt-5">

              <label
                htmlFor="checkout-district"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                জেলা
              </label>

              <div className="relative">

                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  id="checkout-district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={`w-full appearance-none rounded-xl border bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:bg-white ${
                    errors.district
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-green-600"
                  }`}
                >

                  <option value="">
                    জেলা নির্বাচন করুন
                  </option>

                  {districts.map(
                    (district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    )
                  )}

                </select>

              </div>

              {errors.district && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.district}
                </p>
              )}

            </div>

            {/* ADDRESS */}

            <div className="mt-5">

              <label
                htmlFor="checkout-address"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                সম্পূর্ণ ঠিকানা
              </label>

              <textarea
                id="checkout-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="5"
                placeholder="গ্রাম/এলাকা, ইউনিয়ন, থানা, বাড়ির ঠিকানা..."
                className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:bg-white ${
                  errors.address
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-green-600"
                }`}
              />

              {errors.address && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.address}
                </p>
              )}

            </div>

            {/* PAYMENT */}

            <div className="mt-8">

              <p className="mb-3 text-sm font-bold text-gray-700">
                Payment Method
              </p>

              <div className="rounded-2xl border-2 border-green-600 bg-green-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-800 text-white">
                    <CheckCircle2 size={21} />
                  </div>

                  <div>

                    <p className="font-black text-green-950">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      পণ্য হাতে পাওয়ার সময়
                      টাকা পরিশোধ করবেন।
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 py-4 font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Order Processing...
                </>
              ) : (
                <>
                  অর্ডার কনফার্ম করুন
                  <CheckCircle2 size={20} />
                </>
              )}

            </button>

          </form>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7 lg:sticky lg:top-24">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-black text-green-950">
                  Order Summary
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {totalItems} টি item
                </p>

              </div>

              <ShoppingBag
                size={22}
                className="text-green-700"
              />

            </div>

            {/* PRODUCTS */}

            <div className="mt-6 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-100 pb-4"
                >

                  <div className="relative shrink-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-800 px-1 text-[9px] font-black text-white">
                      {item.quantity}
                    </span>

                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-bold text-green-950">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.quantity} × ৳
                      {item.price.toLocaleString()}
                    </p>

                  </div>

                  <p className="font-black text-green-800">
                    ৳
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>

            {/* PRICE */}

            <div className="mt-6 space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-bold">
                  ৳
                  {subtotal.toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Delivery Charge
                </span>

                <span className="font-bold">
                  ৳
                  {deliveryCharge.toLocaleString()}
                </span>

              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-black text-green-950">
                    Total
                  </span>

                  <span className="text-2xl font-black text-green-800">
                    ৳
                    {total.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            {/* TRUST */}

            <div className="mt-6 rounded-2xl bg-stone-50 p-4">

              <p className="text-xs leading-7 text-gray-500">
                ✓ সরাসরি খামার থেকে পণ্য
                <br />
                ✓ নিরাপদ Home Delivery
                <br />
                ✓ Cash on Delivery
                <br />
                ✓ Trusted Farm Service
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;