import { useContext } from "react";
import { CartContext } from "../Components/CartContext";

function Cart() {
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart, totalAmount } = useContext(CartContext)
  console.log(cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart, totalAmount)

  if (cartItems.length === 0){
    return (
      <div className="h-[70vh] flex text-gray-500">🛒Your cart is empty</div>
    )
  }
  return (
    <>
    <div className="max-w-4xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between item-center bg-white p-4 rounded-xl shadow mb-3">
          <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-green-600">₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-8 h-8 border rounded-full" onClick={()=> decreaseQty(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button className="w-8 h-8 border rounded-full" onClick={()=> increaseQty(item.id)}>+</button>
             <button className="text-red-500 text-sm" onClick={()=> removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}   
      <div className=" left-0 w-full bg-white border-t shadow-lg">
          <div className="max-w-4xl ma-auto p-4">
            <div className="flex justify-between item-center mb-3">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-lg font-bold text-green-600">₹{totalAmount}</span>
              <button className="w-1/3 text-red-500 py-2 rounded-lg " onClick={clearCart}>Clear Cart</button>
            <br />
             <a className="w-50 mt-6 bg-green-600 text-center text-white py-3 font-semibold rounded-xl" href="/address">Click to Continue</a>
             <br />
             
              </div>
          </div>
      </div>
      
    </div>
    </>
  )
}

export default Cart;




