import './index.css' 
import ReactDOM from "react-dom/client";
import App from "./App";

import { CartProvider } from './Components/CartContext';


ReactDOM.createRoot(document.getElementById("root")).render(
 
    <CartProvider>
      <App />
    </CartProvider>
  
);

