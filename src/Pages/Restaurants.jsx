import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaInfoCircle,
  FaSearch,
  FaStore,
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
} from "react-icons/fa";
import API, { API_BASE_URL, extractErrorMessage } from "../axios";
import Footer from "./Footer";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80";

// Curated fallback restaurants if remote database/service is temporarily offline
const fallbackRestaurants = [
  {
    id: 1,
    Restaurant_Name: "Paragon Restaurant",
    Restaurant_Location: "Calicut, Kerala",
    Mobile_Number: "+91 495 276 7020",
    Url_Offical: "https://paragonrestaurant.in",
    Image: "https://paragonrestaurant.in/wp-content/uploads/2022/10/Chicken-Biriyani.webp",
    cuisine: "Kerala • Biriyani • Seafood",
    rating: 4.8,
  },
  {
    id: 2,
    Restaurant_Name: "Zam Zam Restaurant",
    Restaurant_Location: "Calicut, Kerala",
    Mobile_Number: "+91 495 272 5555",
    Url_Offical: "https://www.zamzamrestaurants.com",
    Image: "https://www.zamzamrestaurants.com/images/g57.jpg",
    cuisine: "Arabian • Mandi • Grills",
    rating: 4.5,
  },
  {
    id: 3,
    Restaurant_Name: "Taco Bell",
    Restaurant_Location: "Kochi, Kerala",
    Mobile_Number: "+91 484 402 1234",
    Url_Offical: "https://tacobell.co.in",
    Image: "https://b.zmtcdn.com/data/dish_photos/5e3/0fbde2af0a2ed78e8092efd5715a45e3.jpeg",
    cuisine: "Mexican • Fast Food • Bowls",
    rating: 4.2,
  },
  {
    id: 4,
    Restaurant_Name: "Hotel Aryaas Park",
    Restaurant_Location: "Thrissur, Kerala",
    Mobile_Number: "+91 487 238 8899",
    Url_Offical: "https://aryaas.com",
    Image: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg",
    cuisine: "South Indian • Dosa • Pure Veg",
    rating: 4.6,
  },
  {
    id: 5,
    Restaurant_Name: "Mothers Veg Plaza",
    Restaurant_Location: "Calicut, Kerala",
    Mobile_Number: "+91 495 272 1200",
    Url_Offical: "https://mothersveg.com",
    Image: "https://b.zmtcdn.com/data/pictures/7/18693847/dee7e8b7df7c781654a9d267e5e35796_o2_featured_v2.jpg?fit=around|750:500&crop=750:500;*,*",
    cuisine: "Vegetarian • Sadhya • Thali",
    rating: 4.7,
  },
  {
    id: 6,
    Restaurant_Name: "Azad Restaurant",
    Restaurant_Location: "Calicut, Kerala",
    Mobile_Number: "+91 495 272 4433",
    Url_Offical: "https://azadrestaurant.in",
    Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7NtKmuvNVRZ5T5hMPJOF3MwJzej4szRA2g&s",
    cuisine: "North Indian • Mughlai • Desserts",
    rating: 4.4,
  },
];

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await API.get("api/v1/restaurants/");
      const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      if (Array.isArray(data) && data.length > 0) {
        setRestaurants(data);
        setUsingFallback(false);
      } else {
        setRestaurants(fallbackRestaurants);
        setUsingFallback(true);
      }
    } catch (err) {
      console.warn("Restaurants API error, falling back to partner directory:", err);
      const msg = extractErrorMessage(err, "Could not connect to restaurant directory.");
      setApiError(msg);
      setRestaurants(fallbackRestaurants);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return restaurants;
    return restaurants.filter((r) => {
      const name = (r.Restaurant_Name || "").toLowerCase();
      const loc = (r.Restaurant_Location || "").toLowerCase();
      const cuisine = (r.cuisine || "").toLowerCase();
      return name.includes(q) || loc.includes(q) || cuisine.includes(q);
    });
  }, [restaurants, searchFilter]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-lime-50 via-white to-lime-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Partner <span className="text-lime-600">Restaurants</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Discover top-rated culinary destinations partnering with EatyGo. Order freshly cooked dishes from your favorite local kitchens.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/dishes")}
              className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border-none text-sm inline-flex items-center gap-2"
            >
              Browse All Dishes <FaUtensils aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Offline/Fallback info notice if backend is down */}
      {usingFallback && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs md:text-sm text-amber-800">
            <span className="inline-flex items-center gap-1.5">
              <FaInfoCircle aria-hidden="true" className="text-amber-600 flex-shrink-0" />
              Displaying verified partner directory {apiError ? `(${apiError})` : ""}.
            </span>
            <button
              onClick={fetchRestaurants}
              className="font-bold underline text-amber-900 hover:text-amber-700 bg-transparent border-none cursor-pointer ml-3"
            >
              Retry Live Sync
            </button>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants or location..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>
        <p className="text-xs text-gray-500">
          Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Restaurant grid */}
      <section className="max-w-6xl mx-auto px-6 py-6 pb-16 min-h-[40vh]">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-lime-300 border-t-lime-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading partner restaurants...</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
            <FaStore aria-hidden="true" className="text-5xl mx-auto mb-4 block text-gray-300" />
            <p className="text-gray-700 text-lg font-bold mb-2">No restaurants match your search</p>
            <p className="text-gray-500 text-sm mb-4">Try searching for a different name or location.</p>
            <button
              onClick={() => setSearchFilter("")}
              className="px-5 py-2 bg-lime-500 text-white rounded-full text-xs font-semibold hover:bg-lime-600 transition cursor-pointer border-none"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredRestaurants.map((c) => {
              // Use c.Image (not c.Images), add placeholder when null, and prefix relative URLs with API_BASE_URL
              let imageUrl = PLACEHOLDER_IMAGE;
              if (c.Image) {
                if (c.Image.startsWith("http://") || c.Image.startsWith("https://")) {
                  imageUrl = c.Image;
                } else {
                  const path = c.Image.startsWith("/") ? c.Image : `/${c.Image}`;
                  imageUrl = `${API_BASE_URL}${path}`;
                }
              }

              return (
                <div
                  key={c.id || c.Restaurant_Name}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-lime-50">
                    <img
                      src={imageUrl}
                      alt={c.Restaurant_Name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER_IMAGE;
                      }}
                    />

                    {c.Rating && (
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-green-700 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <FaStar aria-hidden="true" className="text-amber-400" /> {c.Rating}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-extrabold text-gray-900 text-lg mb-1 truncate">
                      {c.Restaurant_Name}
                    </h3>
                    {c.cuisine && (
                      <p className="text-xs font-medium text-lime-700 mb-2">{c.cuisine}</p>
                    )}
                    <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1.5">
                      <FaMapMarkerAlt aria-hidden="true" className="text-lime-600 flex-shrink-0" />
                      <span className="truncate">{c.Restaurant_Location || "Kerala, India"}</span>
                    </p>
                    {c.Mobile_Number && (
                      <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-4">
                        <FaPhoneAlt aria-hidden="true" className="text-lime-600 flex-shrink-0" />
                        <span>{c.Mobile_Number}</span>
                      </p>
                    )}

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/dishes?search=${encodeURIComponent(c.Restaurant_Name)}`)
                        }
                        className="flex-1 text-center px-4 py-2.5 bg-lime-500 hover:bg-lime-600 text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer border-none inline-flex items-center justify-center gap-1.5"
                      >
                        Order Dishes <FaUtensils aria-hidden="true" />
                      </button>

                      {c.Url_Offical && (
                        <a
                          href={c.Url_Offical}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 border border-gray-200 text-gray-600 hover:text-lime-700 hover:bg-lime-50 font-semibold text-xs rounded-xl transition text-center inline-flex items-center justify-center gap-1"
                          title="Visit official website"
                        >
                          <FaGlobe aria-hidden="true" /> Site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Restaurants;
