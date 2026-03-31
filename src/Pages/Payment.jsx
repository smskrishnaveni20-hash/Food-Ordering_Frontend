import { useState } from "react";
import axios from "axios";

function Payment(){
    const [method, setMethod] = useState(" ")
    const token = localStorage.getItem("token")

    const payNow = ()=> {
        axios.post(
            "api/v1/orders/payments",
            {
                order : 1,
                payment_method : method
            },
            {
                headers:{
                    Authorization : `Bearer ${token}` 
                },
            }
        ).then(()=> alert("Payment Successful✅"))
    }
    
    return(
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
            <br />
            <label className="flex item-center rounded-xl cursor-pointer hover:border-green-500 transition">
                <input  type="radio"
                        name="payment"
                        value= "GPAY"
                        onChange={(e)=> setMethod(e.target.value)} 
                />Google Pay
            </label>
            <br />
            <label className="flex item-center rounded-xl cursor-pointer hover:border-green-500 transition">
                <input  type="radio"
                        name="payment"
                        value= "PHONEPE"
                        onChange={(e)=> setMethod(e.target.value)} 
                />PhonePe
            </label>
            <br />
            <label className="flex item-center rounded-xl cursor-pointer hover:border-green-500 transition">
                <input  type="radio"
                        name="payment" 
                        value= "PAYTM"
                        onChange={(e)=> setMethod(e.target.value)}
                />Paytm
            </label>
            <br />
            <label className="flex item-center rounded-xl cursor-pointer hover:border-green-500 transition">
                <input  type="radio"
                        name="payment"
                        value= "CARD"
                        onChange={(e)=> setMethod(e.target.value)} 
                />Debit / Credit Card
            </label>
            <br />
            <label className="flex item-center rounded-xl cursor-pointer hover:border-green-500 transition">
                <input  type="radio" 
                        name="payment"
                        value= "COD"
                        onChange={(e)=> setMethod(e.target.value)}
                />Cash On Delivery
            </label>
            <br />
            <br />
            <button className="hover:underline" onClick={payNow} disabled= {!method}>Pay Now</button>
        </div>
    )
}

export default Payment