function Footer(){
    return(
        <>
        <footer className="bg-lime-500 text-black mt-16 p-5 w-full">
            <div className="max-full grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <h2 className="text-xl font-bold mb-3"><i>EatyGo</i></h2>
                    <p className="text-sm ">Order delicious food from your favorite restaurants.</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm grid grid-cols-3 md:grid-cols-4 gap-4">
                        <li className="hover:text cursor-pointer">About</li>
                        <li className="hover:text cursor-pointer">Careers</li>
                        <li className="hover:text cursor-pointer">Blog</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm grid grid-cols-3 md:grid-cols-4 gap-4">
                        <li className="hover:text cursor-pointer">Help Center</li>
                        <li className="hover:text cursor-pointer">Terms</li>
                        <li className="hover:text cursor-pointer">Privacy</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <p className="text-sm">support@foodie.com</p>
                    <p className="text-sm">+91 000 000 0000</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 text-center text-sm ">
                &copy; 2026 Foodie. All rights reserved.
            </div>
        </footer>
        </>
    )
}
export default Footer