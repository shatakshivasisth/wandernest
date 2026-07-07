import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Cabins from "./pages/Cabins/Cabins";
import CabinDetails from "./pages/CabinDetails/CabinDetails";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Wishlist from "./pages/Wishlist/Wishlist";
import AIPlanner from "./pages/AIPlanner/AIPlanner";
import Bookings from "./pages/Bookings/Bookings";
import Profile from "./pages/Profile/Profile";

import Dashboard from "./pages/Admin/Dashboard";
import AddCabin from "./pages/Admin/AddCabin";
import Properties from "./pages/Admin/Properties";
import EditCabin from "./pages/Admin/EditCabin";

import NotFound from "./pages/NotFound/NotFound";

function App() {

    return (

        <Routes>

            {/* ================= USER ROUTES ================= */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/cabins"
                    element={<Cabins />}
                />

                <Route
                    path="/cabins/:id"
                    element={<CabinDetails />}
                />

                <Route
                    path="/ai-planner"
                    element={<AIPlanner />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <Bookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Route>

            {/* ================= ADMIN ROUTES ================= */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/add-cabin"
                element={
                    <ProtectedRoute>
                        <AddCabin />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/properties"
                element={
                    <ProtectedRoute>
                        <Properties />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/edit-cabin/:id"
                element={
                    <ProtectedRoute>
                        <EditCabin />
                    </ProtectedRoute>
                }
            />

            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;