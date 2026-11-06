import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUtensils, FaSearch, FaTimes, FaStore, FaCheck } from "react-icons/fa";
import API, { extractErrorMessage } from "../axios";
import { useCart } from "../Components/CartContext";
import Footer from "./Footer";

// Fallback catalog in case backend database or network is temporarily unavailable
const fallbackCatalog = [
  { id: 101, name: "Chicken Biriyani", price: 220, Available_in: "Paragon Restaurant", category: "Biriyani", img: "https://paragonrestaurant.in/wp-content/uploads/2022/10/Chicken-Biriyani.webp" },
  { id: 102, name: "Arabian Mandi", price: 350, Available_in: "Zam Zam Restaurant", category: "Rice", img: "https://www.zamzamrestaurants.com/images/g57.jpg" },
  { id: 103, name: "Prawns Mango Curry", price: 280, Available_in: "Paragon Restaurant", category: "Fish", img: "https://www.sidechef.com/recipe/43d3afcd-8bec-4ac5-8b9d-12a00e2dc0f5.jpeg?d=1408x1120" },
  { id: 104, name: "Chocolate Truffle Cake", price: 450, Available_in: "Azad Restaurant", category: "Cake", img: "https://b.zmtcdn.com/data/dish_photos/562/8297801943d0e0c882e1b0806f4db562.jpeg" },
  { id: 105, name: "Chicken Fried Rice", price: 180, Available_in: "Zam Zam Restaurant", category: "Rice", img: "https://www.zamzamrestaurants.com/images/g202.jpg" },
  { id: 106, name: "Mutton Curry Roast", price: 320, Available_in: "Azad Restaurant", category: "Chicken", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7NtKmuvNVRZ5T5hMPJOF3MwJzej4szRA2g&s" },
  { id: 107, name: "Hakka Noodles", price: 170, Available_in: "Noodle House", category: "Noodles", img: "https://www.ohmyveg.co.uk/wp-content/uploads/2024/08/hakka-noodles.jpg" },
  { id: 108, name: "Masala Dosa", price: 120, Available_in: "Hotel Aryaas Park", category: "Veg", img: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg" },
  { id: 109, name: "Creamy Chicken Soup", price: 150, Available_in: "Restaurant Chef Pillai", category: "Soup", img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/FOOD_CATALOG/IMAGES/CMS/2025/9/29/e88d3a0f-c1d0-4d7a-a6bf-7bbc7996dac3_808a01be-cbb7-4f36-aef1-0abdbc2a1f67.jpg" },
  { id: 110, name: "Fish Fry (Mackerel)", price: 210, Available_in: "Paragon Restaurant", category: "Fish", img: "https://www.kannammacooks.com/wp-content/uploads/masala-fish-fry-recipe-ayala-meen-Mackerel-fry-8.jpg" },
  { id: 111, name: "Traditional Kerala Sadhya", price: 250, Available_in: "Mothers Veg Plaza", category: "Veg", img: "https://b.zmtcdn.com/data/pictures/7/18693847/dee7e8b7df7c781654a9d267e5e35796_o2_featured_v2.jpg?fit=around|750:500&crop=750:500;*,*" },
  { id: 112, name: "Avocado Salad", price: 160, Available_in: "Green Bowl", category: "Veg", img: "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/avocado-salad.jpg" },
];

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const { addToCart, getItemQuantity } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const queryFromUrl = useMemo(() => {
    return new URLSearchParams(location.search).get("search")?.toLowerCase().trim() || "";
  }, [location.search]);

  // Keep search input in sync with query parameter
  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  const fetchDishes = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await API.get("api/v1/dishes/");
      const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      if (Array.isArray(data) && data.length > 0) {
        setDishes(data);
        setUsingFallback(false);
      } else {
        // Empty API response, provide fallback catalog for testing
        setDishes(fallbackCatalog);
        setUsingFallback(true);
      }
    } catch (err) {
      console.warn("Dishes API unreachable or database error, using fallback catalog:", err);
      const msg = extractErrorMessage(err, "Could not reach dishes server.");
      setApiError(msg);
      setDishes(fallbackCatalog);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Filtered dishes computed synchronously (derived state) to avoid cascading renders
  const filteredDishes = useMemo(() => {
    const activeSearch = searchInput.toLowerCase().trim();
    return dishes.filter((d) => {
      const dishName = (d.name || "").toLowerCase();
      const availableIn = (d.Available_in || "").toLowerCase();
      const dishCategory = (d.category || "").toLowerCase();

      // Search match
      const matchesSearch = !activeSearch || dishName.includes(activeSearch) || availableIn.includes(activeSearch);

      // Category match
      let matchesCategory = true;
      if (activeCategory !== "All") {
        const cat = activeCategory.toLowerCase();
        matchesCategory =
          dishName.includes(cat) ||
          availableIn.includes(cat) ||
          dishCategory.includes(cat);
      }

      return matchesSearch && matchesCategory;
    });
  }, [dishes, searchInput, activeCategory]);

  const handleAdd = (dish) => {
    addToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/dishes?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate("/dishes");
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    navigate("/dishes");
  };

  const categories = [
    "All",
    "Biriyani",
    "Chicken",
    "Fish",
    "Veg",
    "Rice",
    "Noodles",
    "Soup",
    "Cake",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-lime-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <FaUtensils aria-hidden="true" className="inline-block text-5xl mb-3 animate-bounce text-lime-600" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Explore Our <span className="text-lime-600">Dishes</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-6">
            Browse hundreds of delicious freshly prepared meals and fast delivery to your door.
          </p>

          {/* Search bar inside Dishes page */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch aria-hidden="true" />
              </span>
              <input
                type="text"
                placeholder="Search dish by name, ingredients, or restaurant..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-9 py-3 bg-white border border-gray-200 rounded-full text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-xs p-1 flex items-center justify-center"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-full shadow-xs hover:shadow-md transition cursor-pointer border-none text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Backend Status / Notice banner if using fallback */}
      {usingFallback && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs md:text-sm text-amber-800">
            <span>
              ℹ️ Displaying offline catalog preview {apiError ? `(${apiError})` : ""}. Live backend will connect automatically when online.
            </span>
            <button
              onClick={fetchDishes}
              className="font-bold underline text-amber-900 hover:text-amber-700 bg-transparent border-none cursor-pointer ml-3"
            >
              Retry Live
            </button>
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer border-none ${
                activeCategory === cat
                  ? "bg-lime-500 text-white shadow-xs font-semibold scale-102"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10 min-h-[50vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-lime-300 border-t-lime-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading delicious dishes...</p>
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
            <FaUtensils aria-hidden="true" className="text-6xl mx-auto block mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No dishes found{searchInput ? ` for "${searchInput}"` : ""}
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              We couldn't find any dishes matching your current search or category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchInput("");
                navigate("/dishes");
              }}
              className="px-6 py-2.5 bg-lime-500 text-white rounded-full font-medium hover:bg-lime-600 transition cursor-pointer border-none shadow-xs"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDishes.map((d) => {
              const qtyInCart = getItemQuantity(d.id);
              const dishImage = d.image || d.img || d.Images || d.Image || null;

              return (
                <div
                  key={d.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  {/* Dish image with fallback */}
                  <div className="relative h-44 bg-gradient-to-br from-lime-100 to-orange-50 overflow-hidden flex items-center justify-center">
                    {dishImage ? (
                      <img
                        src={dishImage}
                        alt={d.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full flex items-center justify-center text-4xl text-lime-500 bg-lime-50"
                      style={{ display: dishImage ? "none" : "flex" }}
                    >
                      <FaUtensils aria-hidden="true" />
                    </div>

                    {qtyInCart > 0 && (
                      <span className="absolute top-2 right-2 bg-lime-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        {qtyInCart} in cart
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-gray-800 text-base truncate mb-1">
                      {d.name}
                    </h4>
                    {d.Available_in && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3 truncate">
                        <FaStore aria-hidden="true" className="text-gray-400" />
                        <span>{d.Available_in}</span>
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-gray-400 text-xs block">Price</span>
                        <span className="text-green-600 font-extrabold text-xl">
                          ₹{Number(d.price) || 0}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAdd(d)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border-none flex items-center gap-1.5 ${
                          addedId === d.id
                            ? "bg-green-600 text-white scale-95"
                            : "bg-lime-500 hover:bg-lime-600 text-white shadow-xs hover:shadow-md"
                        }`}
                      >
                        {addedId === d.id ? (
                          <>
                            <FaCheck aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
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

export default Dishes;
