import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import API from "../axios";
import { CartContext } from "../Components/CartContext";

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    API.get("api/v1/dishes/")
      .then((res) => setDishes(res.data))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (query) {
      const filtered = dishes.filter((d) =>
        d.name.toLowerCase().includes(query)
      );
      setFilteredDishes(filtered);
    } else {
      setFilteredDishes(dishes);
    }
  }, [dishes, query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dishes</h2>

      {filteredDishes.length === 0 && (
        <p className="text-gray-500">No dishes found for "{query}"</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {filteredDishes.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
          >
            <h4 className="text-lg font-semibold text-gray-800 truncate">{d.name}</h4>
            <p className="text-green-600 font-bold mt-1">₹{d.price}</p>
            <p className="text-gray-400 font-bold mt-1">{d.Available_in}</p>
            <button
              onClick={() => addToCart(d)}
              className="mt-3 w-full border border-green-600 py-1 rounded-xl hover:bg-green-600 hover:text-white transition font-medium"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dishes;