import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import LostAndFoundItems from "../pages/LostAndFoundItems";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allItems',
                element: <LostAndFoundItems></LostAndFoundItems>,
                // loader: () => fetch('https://where-is-it-server-xi.vercel.app/allItems')
            },
           {
            path: '/login',
            element: <Login></Login>
           },
           {
            path: '/register',
            element: <Register></Register>
           }
        ]
    }
]);

export default router;