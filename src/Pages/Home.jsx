import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useCart } from "../Components/CartContext";
import {
  FaUtensils,
  FaSmile,
  FaCity,
  FaSearch,
  FaShoppingCart,
  FaCreditCard,
  FaCheckCircle,
  FaStar,
  FaStarHalfAlt,
  FaRocket,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaCheck,
} from "react-icons/fa";
import { MdStorefront } from "react-icons/md";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: "Biriyani", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHpFj4-Br8epkyTZtOnycOAr9Y_QULqTTQGA&s" },
  { name: "Chapati", img: "https://static.toiimg.com/thumb/61203720.cms?width=1200&height=900" },
  { name: "Alfaham", img: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/10/3c741864-b2ad-4a01-bc18-87b0d0065d55_171522.jpg" },
  { name: "Mandhi", img: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/wydpzezlbyahq1ao78cj" },
  { name: "Juice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1agM9OILdKJOVPArFt0EZKgDawdUoGQgnKg&s" },
  { name: "Hakka Noodles", img: "https://www.ohmyveg.co.uk/wp-content/uploads/2024/08/hakka-noodles.jpg" },
  { name: "Meals", img: "https://static.vecteezy.com/system/resources/thumbnails/069/584/808/small/traditional-indian-thali-meal-served-on-banana-leaf-with-rice-curry-and-shrimp-photo.jpg" },
  { name: "Salad", img: "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/avocado-salad.jpg" },
  { name: "Fish Curry", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClWkFI20GsdxZpw9lWE7ZKyg5eB5df0Uwkw&s" },
  { name: "Chicken Fry", img: "https://static.toiimg.com/thumb/84576633.cms?imgsize=418774&width=800&height=800" },
  { name: "Fish Fry", img: "https://www.kannammacooks.com/wp-content/uploads/masala-fish-fry-recipe-ayala-meen-Mackerel-fry-8.jpg" },
  { name: "Cakes", img: "https://whipped.in/cdn/shop/files/WhatsAppImage2023-12-12at11.29.28PM_1080x.jpg?v=1748459537" },
];

const featuredRestaurants = [
  {
    name: "Paragon Restaurant",
    location: "Calicut, Kerala",
    cuisine: "Kerala • Biriyani • Seafood",
    rating: 4.8,
    deliveryTime: "30-40 min",
    img: "https://paragonrestaurant.in/wp-content/uploads/2022/10/Chicken-Biriyani.webp",
  },
  {
    name: "Zam Zam Restaurant",
    location: "Calicut, Kerala",
    cuisine: "Arabian • Mandi • Grills",
    rating: 4.5,
    deliveryTime: "35-45 min",
    img: "https://www.zamzamrestaurants.com/images/g57.jpg",
  },
  {
    name: "Taco Bell",
    location: "Kochi, Kerala",
    cuisine: "Mexican • Fast Food • Bowls",
    rating: 4.2,
    deliveryTime: "20-30 min",
    img: "https://b.zmtcdn.com/data/dish_photos/5e3/0fbde2af0a2ed78e8092efd5715a45e3.jpeg",
  },
  {
    name: "Hotel Aryaas Park",
    location: "Thrissur, Kerala",
    cuisine: "South Indian • Dosa • Veg",
    rating: 4.6,
    deliveryTime: "25-35 min",
    img: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg",
  },
  {
    name: "Mothers Veg Plaza",
    location: "Calicut, Kerala",
    cuisine: "Vegetarian • Sadhya • Thali",
    rating: 4.7,
    deliveryTime: "30-40 min",
    img: "https://b.zmtcdn.com/data/pictures/7/18693847/dee7e8b7df7c781654a9d267e5e35796_o2_featured_v2.jpg?fit=around|750:500&crop=750:500;*,*",
  },
  {
    name: "Azad Restaurant",
    location: "Calicut, Kerala",
    cuisine: "North Indian • Mughlai • Cakes",
    rating: 4.4,
    deliveryTime: "25-35 min",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7NtKmuvNVRZ5T5hMPJOF3MwJzej4szRA2g&s",
  },
];

const popularDishes = [
  { id: 201, name: "Chicken Biriyani", restaurant: "Paragon Restaurant", Available_in: "Paragon Restaurant", price: 220, img: "https://paragonrestaurant.in/wp-content/uploads/2022/10/Chicken-Biriyani.webp" },
  { id: 202, name: "Mandi", restaurant: "Zam Zam Restaurant", Available_in: "Zam Zam Restaurant", price: 350, img: "https://www.zamzamrestaurants.com/images/g57.jpg" },
  { id: 203, name: "Prawns Mango Curry", restaurant: "Paragon Restaurant", Available_in: "Paragon Restaurant", price: 280, img: "https://www.sidechef.com/recipe/43d3afcd-8bec-4ac5-8b9d-12a00e2dc0f5.jpeg?d=1408x1120" },
  { id: 204, name: "Chocolate Cake", restaurant: "Azad Restaurant", Available_in: "Azad Restaurant", price: 450, img: "https://b.zmtcdn.com/data/dish_photos/562/8297801943d0e0c882e1b0806f4db562.jpeg" },
  { id: 205, name: "Chicken Fried Rice", restaurant: "Zam Zam Restaurant", Available_in: "Zam Zam Restaurant", price: 180, img: "https://www.zamzamrestaurants.com/images/g202.jpg" },
  { id: 206, name: "Mutton Curry Roast", restaurant: "Azad Restaurant", Available_in: "Azad Restaurant", price: 320, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7NtKmuvNVRZ5T5hMPJOF3MwJzej4szRA2g&s" },
  { id: 207, name: "Kappa Biryani", restaurant: "Square One", Available_in: "Square One", price: 190, img: "https://www.homemadetohome.com/wp-content/uploads/2025/01/1-16-1.jpg" },
  { id: 208, name: "Maxx Protein Bowl Chicken", restaurant: "Taco Bell", Available_in: "Taco Bell", price: 399, img: "https://b.zmtcdn.com/data/dish_photos/5e3/0fbde2af0a2ed78e8092efd5715a45e3.jpeg" },
];

const stats = [
  { label: "Partner Kitchens", value: "50+", icon: MdStorefront },
  { label: "Fresh Dishes", value: "500+", icon: FaUtensils },
  { label: "Happy Customers", value: "10,000+", icon: FaSmile },
  { label: "Cities Served", value: "5+", icon: FaCity },
];

const howItWorks = [
  { step: "1", title: "Browse Menus", desc: "Explore top-rated restaurants and their verified menus near you.", icon: FaSearch },
  { step: "2", title: "Choose Your Dishes", desc: "Pick delicious meals and customize your cart.", icon: FaShoppingCart },
  { step: "3", title: "Order & Pay", desc: "Pay securely online or choose Cash on Delivery.", icon: FaCreditCard },
  { step: "4", title: "Enjoy Fresh Food", desc: "Hot, freshly prepared food delivered right to your door.", icon: FaCheckCircle },
];

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-amber-400 text-xs tracking-tight flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => (
        <FaStar key={`f-${i}`} aria-hidden="true" className="text-amber-400 inline" />
      ))}
      {half && <FaStarHalfAlt aria-hidden="true" className="text-amber-400 inline" />}
      <span className="ml-1 text-gray-700 text-xs font-bold">{rating}</span>
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, getItemQuantity } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleQuickAdd = (dish) => {
    addToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-lime-50 via-white to-lime-100 overflow-hidden py-16 md:py-24">
        {/* decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-lime-200 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lime-300 rounded-full opacity-30 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <p className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-lime-200/80 text-lime-900 text-xs md:text-sm font-bold rounded-full tracking-wide shadow-xs">
            <FaRocket aria-hidden="true" className="text-lime-800" />
            <span>Fast Delivery • Freshly Prepared • Top Restaurants</span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Delicious Food,<br />
            <span className="text-lime-600">Delivered Fast To You</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            Hungry? We've got you covered! Choose from hundreds of freshly prepared dishes, customize your order, and enjoy fast doorstep delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/dishes")}
              className="px-8 py-3.5 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base cursor-pointer border-none inline-flex items-center gap-2"
            >
              <span>Order Now</span>
              <FaArrowRight aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate("/restaurants")}
              className="px-8 py-3.5 border-2 border-lime-500 text-lime-700 hover:bg-lime-50 font-bold rounded-full transition-all duration-300 text-base cursor-pointer bg-white"
            >
              View Restaurants
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────────────── */}
      <section className="bg-lime-600 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 text-center">
          {stats.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.label}>
                <span className="text-3xl block mb-1 flex justify-center">
                  <IconComp aria-hidden="true" />
                </span>
                <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                <p className="text-lime-100 text-xs md:text-sm font-medium">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Specials Carousel ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
            Today's Chef Specials
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm md:text-base">
            Hand-picked mouth-watering recipes prepared with premium ingredients
          </p>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            {[
              "https://www.happiesthealth.com/wp-content/uploads/2023/08/Onam-Sadhya-Article.jpg",
              "https://blog.swiggy.com/wp-content/uploads/2024/03/Biryani-2-1024x538.jpg",
              "https://static.toiimg.com/thumb/msid-69130460,width-1280,height-720,resizemode-4/69130460.jpg",
              "https://www.cubesnjuliennes.com/wp-content/uploads/2022/06/Fresh-Summer-Fruit-Salad-Recipe.jpg",
              "https://sinfullyspicy.com/wp-content/uploads/2014/07/1200-by-1200-images-2.jpg",
            ].map((src, i) => (
              <SwiperSlide key={i}>
                <div className="h-[360px] md:h-[440px] bg-gray-100 relative">
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt={`Today's Special ${i + 1}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── Food Categories ───────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-white to-lime-50/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
            What are you craving?
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm md:text-base">
            Tap a category to explore authentic dishes
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/dishes?search=${encodeURIComponent(cat.name)}`)}
                className="group flex flex-col items-center cursor-pointer bg-transparent border-none"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-transparent group-hover:ring-lime-400 transition-all duration-300 shadow-md group-hover:shadow-lg bg-lime-100 flex items-center justify-center">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <FaUtensils aria-hidden="true" className="text-2xl text-lime-600" style={{ display: "none" }} />
                </div>
                <span className="mt-2 text-xs md:text-sm text-gray-700 font-semibold group-hover:text-lime-700 transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 text-xs">
            Discover biriyanis, traditional thalis, noodles, grills, and desserts
          </p>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 text-center mb-12 text-sm md:text-base">
            Get your hot and fresh food in 4 simple steps
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.step} className="text-center group p-4 rounded-2xl transition hover:bg-gray-50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-100 flex items-center justify-center text-2xl text-lime-700 group-hover:bg-lime-200 transition-colors shadow-xs">
                    <IconComp aria-hidden="true" />
                  </div>
                  <div className="text-[11px] font-black text-lime-700 tracking-wider mb-1">
                    STEP {item.step}
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Restaurants ──────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-lime-50/50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Restaurants</h2>
              <p className="text-gray-500 text-sm mt-1">Top-rated dining partners our users love</p>
            </div>
            <button
              onClick={() => navigate("/restaurants")}
              className="hidden sm:inline-flex px-5 py-2.5 border-2 border-lime-500 text-lime-700 rounded-full text-xs font-bold hover:bg-lime-50 transition cursor-pointer bg-transparent"
            >
              View All Partners →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((r) => (
              <div
                key={r.name}
                onClick={() => navigate(`/dishes?search=${encodeURIComponent(r.name)}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
              >
                <div className="overflow-hidden h-44 bg-lime-50">
                  <img
                    src={r.img}
                    alt={r.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base">{r.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{r.cuisine}</p>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt aria-hidden="true" className="text-lime-600" />
                      <span>{r.location}</span>
                    </span>
                    <span className="font-medium text-lime-700 flex items-center gap-1.5">
                      <FaClock aria-hidden="true" />
                      <span>{r.deliveryTime}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Dishes ────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Popular Dishes</h2>
              <p className="text-gray-500 text-sm mt-1">Trending dishes with fast doorstep delivery</p>
            </div>
            <button
              onClick={() => navigate("/dishes")}
              className="hidden sm:inline-flex px-5 py-2.5 border-2 border-lime-500 text-lime-700 rounded-full text-xs font-bold hover:bg-lime-50 transition cursor-pointer bg-transparent"
            >
              See All Dishes →
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularDishes.map((d) => {
              const qty = getItemQuantity(d.id);

              return (
                <div
                  key={d.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="overflow-hidden h-40 bg-lime-50 relative">
                    <img
                      src={d.img}
                      alt={d.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    {qty > 0 && (
                      <span className="absolute top-2 right-2 bg-lime-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        {qty} in cart
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{d.name}</h4>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">from {d.restaurant}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                      <span className="text-green-600 font-black text-base">₹{d.price}</span>
                      <button
                        onClick={() => handleQuickAdd(d)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer border-none flex items-center gap-1 ${
                          addedId === d.id
                            ? "bg-green-600 text-white scale-95"
                            : "bg-lime-500 hover:bg-lime-600 text-white shadow-xs"
                        }`}
                      >
                        {addedId === d.id ? (
                          <>
                            <FaCheck aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          "+ Order"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-lime-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Still Craving Something Delicious?
          </h2>
          <p className="text-lime-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Explore our complete menu with hundreds of dishes from local kitchens. Your next favorite meal is only a few clicks away!
          </p>
          <button
            onClick={() => navigate("/dishes")}
            className="px-10 py-4 bg-white text-lime-700 font-extrabold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-lime-50 transition-all duration-300 cursor-pointer border-none inline-flex items-center gap-2"
          >
            <span>Explore Full Menu</span>
            <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
