import API from "../axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await API.post("api/v1/user/", form)

            alert("Registered Successfully")
            navigate("/login")
        } catch (error) {
            alert("Registration Failed")
            console.log(error.response.data)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 border">
                <h2 className="text-xl font-semibold text-center mb-4 text-green-700">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter Username"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <br />
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter Email"
                            required
                            autoComplete="email"

                        />
                    </div>
                    <br />
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter Password"
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <br />
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <br />
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                </p>
                <br />
                <a
                    href="/login"
                    className="block text-center text-green-600 font-medium hover:underline"
                >
                    Login
                </a>
            </div>
        </div>
    )
}

export default Register