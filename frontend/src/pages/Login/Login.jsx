import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaMountain } from "react-icons/fa";
import toast from "react-hot-toast";

import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login: authLogin } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await login(form);

            authLogin(response.token, {
                id: response.id,
                fullName: response.fullName,
                email: response.email,
            });

            toast.success(response.message);

            setTimeout(() => {

                navigate("/");

            }, 1000);

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-cyan-50 flex items-center justify-center px-6 py-32">

            <div className="w-full max-w-md rounded-[35px] bg-white p-10 shadow-2xl">

                <div className="text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 shadow-xl">

                        <FaMountain className="text-5xl text-white" />

                    </div>

                    <h1 className="mt-8 text-4xl font-black">

                        Welcome Back

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Login to continue

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-semibold">

                            <FaEnvelope className="text-teal-600" />

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-teal-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-semibold">

                            <FaLock className="text-teal-600" />

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-teal-500"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-teal-600
                        to-cyan-600
                        py-4
                        text-lg
                        font-bold
                        text-white
                        transition
                        hover:scale-[1.02]
                        disabled:opacity-60
                        "
                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

                <p className="mt-8 text-center">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-bold text-teal-600"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </main>

    );

}

export default Login;