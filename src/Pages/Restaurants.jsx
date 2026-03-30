import API from "../axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Restaurants(){
    const [restaurants, setRestaurants] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        API.get("restaurants/").then((res) => setRestaurants(res.data))
    }, [])

    return(
        <>
         <h2 className="text-2xl text-center italic font-extrabold mb-5 py-3">Restaurants</h2>
         <p className="text-center py-10 italic ">Welcome to your ultimate food destination. We bring together top-rated restaurants offering quality food and great service. Explore, compare and enjoy delicious meals anytime you want.</p>
         <div className="flex justify-center">
         <a href="/dishes" className="btn btn-primary px-2 w-36  my-10 py-1 bg-lime-400 rounded-xl mt-auto font-medium text-s text-center ">View Dishes</a>
         </div>
         <p className="text-center py-12 italic ">Here you can view the quality of respective restaurants by visiting their offical websites.....</p>
        <div className="grid grid-clos2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-6 py-4">     
           {restaurants.map((r)=>
            <div key={r.id} onClick={()=> navigate(`/restaurants`)} className="border rounded-lg shadow-sm bg-white overflow-hidden flex flex-col p-4 hover:shadow-xl transition duration-200" >
                <img src={r.Images} className="w-50 h-36 object-cover" alt="" />
                <div className="p-3 flex flex-col flex-grow">
                    <h5 className="text-font-semibold text-sm">{r.Restaurant_Name}</h5>
                    <p className="text-gray-600 text-xs mt-1 ">{r.Restaurant_Location}</p>
                    <p className="text-gray-900 hover:underline" >{r. Mobile_Number}</p>
                    <br />
                    <a href= {r.Url_Offical} className="btn btn-primary px-2 py-1 bg-lime-300 rounded-xl mt-auto font-medium text-xs text-center ">Visit Now</a>
                </div>
            </div>
            )} 
        </div>
        </>
    )
}

export default Restaurants