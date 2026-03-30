import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
    const navigate = useNavigate()

    const handleNavigate = () =>{
            navigate("/dishes")
    }
    return (
        <>
        <div className="text-center py-12 italic">
            <h1 className="text-3xl font-extrabold mb-5">Welcome </h1>
            <p className="mb-6">"Hungry? We've got you! Choose from a wide range of restaurants and dishes, add them to your cart, pay online or on delivery, and  enjoy delicious food at your doorstep."</p>
            <button onClick={handleNavigate} className="px-6 py-3 bg-lime-300 rounded-xl">Order Now</button>
        </div>
        <div>
            <div className="w-full max-w-6xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        pagination={{ clickable: true }}
        navigation={true}
      >
        <SwiperSlide>
          <img src="https://www.happiesthealth.com/wp-content/uploads/2023/08/Onam-Sadhya-Article.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://blog.swiggy.com/wp-content/uploads/2024/03/Biryani-2-1024x538.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://static.toiimg.com/thumb/msid-69130460,width-1280,height-720,resizemode-4/69130460.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://www.cubesnjuliennes.com/wp-content/uploads/2022/06/Fresh-Summer-Fruit-Salad-Recipe.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://sinfullyspicy.com/wp-content/uploads/2014/07/1200-by-1200-images-2.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://t4.ftcdn.net/jpg/04/79/28/61/360_F_479286137_AcrQjR6LH6dEziyzX9udDmGR7S2PGSzo.jpg" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://media.istockphoto.com/id/538045178/photo/codfish.jpg?s=612x612&w=0&k=20&c=MZvpsN8jdBNcf-FM78qFfqShuCRWxiJhgrQXohcdL98=" className="w-full h-150 object-cover rounded-xl" />
        </SwiperSlide>

      </Swiper>
    </div>
    <br />
    <br />
    </div>
        <div className="flex justify-center ">
            <div className="grid sm:grid-cols-8 lg:grid-cols-6 w-full max-w-6xl mx-auto gap-4 px=10 py-8">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHpFj4-Br8epkyTZtOnycOAr9Y_QULqTTQGA&s" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Biriyani</p>
                <img src="https://static.toiimg.com/thumb/61203720.cms?width=1200&height=900" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Chapati</p>
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/10/3c741864-b2ad-4a01-bc18-87b0d0065d55_171522.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Alfaham</p>
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/wydpzezlbyahq1ao78cj" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Mandhi</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1agM9OILdKJOVPArFt0EZKgDawdUoGQgnKg&s" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Juice</p>
                <img src="https://www.ohmyveg.co.uk/wp-content/uploads/2024/08/hakka-noodles.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 "> Hakka Noodles</p>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/069/584/808/small/traditional-indian-thali-meal-served-on-banana-leaf-with-rice-curry-and-shrimp-photo.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Meals</p>
                <img src="https://cdn.loveandlemons.com/wp-content/uploads/2024/07/avocado-salad.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Salad</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClWkFI20GsdxZpw9lWE7ZKyg5eB5df0Uwkw&s" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Fish Curry</p>
                <img src="https://static.toiimg.com/thumb/84576633.cms?imgsize=418774&width=800&height=800" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Chicken Fry</p>
                <img src="https://www.kannammacooks.com/wp-content/uploads/masala-fish-fry-recipe-ayala-meen-Mackerel-fry-8.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Fish Fry</p>
                <img src="https://whipped.in/cdn/shop/files/WhatsAppImage2023-12-12at11.29.28PM_1080x.jpg?v=1748459537" alt="" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-gray-600 text-sm mt-1 ">Cakes</p>
            </div>
        </div>
        <p className="text-center font-semibold mb-5 ">And Many More Dishes🤤 Choose Your Favorites......</p>
        <br />
        <br />
     <div className="bg-lime-100 rounded-2xl shadow hover:shadow-lg transition p-4">
        <p className="text-center font-semibold  mb-6 "><i>A dish loved by many that truly makes your mouth water 🤤</i></p>
        <div className=" grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://paragonrestaurant.in/wp-content/uploads/2022/10/Chicken-Biriyani.webp" alt="" />
                <h6>Biriyani from Paragon Restaurant</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://www.zamzamrestaurants.com/images/g57.jpg" alt="" />
                <h6>Mandi from Zam Zam Restaurant</h6>
            </div>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://www.sidechef.com/recipe/43d3afcd-8bec-4ac5-8b9d-12a00e2dc0f5.jpeg?d=1408x1120" alt="" />
                <h6>Prawns Mango Curry from Paragon Restaurant </h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://b.zmtcdn.com/data/dish_photos/562/8297801943d0e0c882e1b0806f4db562.jpeg" alt="" />
                <h6>Cakes from Azad Restaurant</h6>
            </div>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://www.zamzamrestaurants.com/images/g202.jpg" alt="" />
                <h6>Chicken Fried Rice from Zam Zam Restaurant</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7NtKmuvNVRZ5T5hMPJOF3MwJzej4szRA2g&s" alt="" />
                <h6>Mutton Curry Roast from Azad Restaurant</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://www.homemadetohome.com/wp-content/uploads/2025/01/1-16-1.jpg" alt="" />
                <h6>Kappa Biryani from Square One HomeMade Treats</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://b.zmtcdn.com/data/dish_photos/5e3/0fbde2af0a2ed78e8092efd5715a45e3.jpeg" alt="" />
                <h6>Maxx Protein Bowl Chicken from Taco Bell</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg" alt="" />
                <h6>Masala Dosa from Hotel Aryaas Park</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://www.inspiredtaste.net/wp-content/uploads/2024/07/Chicken-Alfredo-Recipe.jpg" alt="" />
                <h6>Alfredo Chicken from Alfredo Chicken</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://b.zmtcdn.com/data/pictures/7/18693847/dee7e8b7df7c781654a9d267e5e35796_o2_featured_v2.jpg?fit=around|750:500&crop=750:500;*,*" alt="" />
                <h6>Kerala Sadhya from Mothers Veg Plaza</h6>
            </div>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://b.zmtcdn.com/data/dish_photos/4e4/bfd1ee754c45ebae235565d73a9544e4.png" alt="" />
                <h6>Lemon Rice from Pazhayidom Ruchi</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://s3-ap-southeast-1.amazonaws.com/sb-singleserver-prod-bucket/0dddf7efd95448bdafd7ad92146f580d/o_1486458255.jpg" alt="" />
                <h6>Naan from Mothers Veg Plaza</h6>
            </div> 
             
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/FOOD_CATALOG/IMAGES/CMS/2025/9/29/e88d3a0f-c1d0-4d7a-a6bf-7bbc7996dac3_808a01be-cbb7-4f36-aef1-0abdbc2a1f67.jpg" alt="" />
                <h6>Creamy Chicken Soup from Restaurant Chef Pillai</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://notoutofthebox.in/wp-content/uploads/2023/06/ef2-500x500.jpg" alt="" />
                <h6>Egg Fried Rice from Pankayam</h6>
            </div> 
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                <img className="w-50 h-36 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7uwrTLzr63wj4FkEENGOg76_6yPeIq-FPA&s" alt="" />
                <h6>Beef Steak With Creamy Mushroom Sauce from  Tomato's Bakes & Grills</h6>
            </div> 
            
        </div>
     </div>      
        <Footer/>
        </>
    )
}
