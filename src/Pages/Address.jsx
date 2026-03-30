import {useState} from "react"
import {useNavigate} from "react-router-dom"

function Address(){
    const navigate = useNavigate()

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        house: "",
        city : "",
        pincode : ""
    })

    const handleChange = (e)=> {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSumbit = (e)=> {
        e.preventDefault()

        localStorage.setItem("address", JSON.stringify(address))
        navigate("/payment")
    }

    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Delivery Address</h2>
                <form onSubmit={handleSumbit} className="space-y-3" >
                    <input type="text" 
                            name="name"
                            placeholder="Full Name"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <input type="text" 
                            name="phone"
                            placeholder="Phone Number"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <input type="text" 
                            name="house"
                            placeholder="House/Street"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <input type="text" 
                            name="city"
                            placeholder="City"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <input type="text" 
                            name="pincode"
                            placeholder="Pincode"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <br />
                    <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition duration-200">Proceed to Pay</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Address