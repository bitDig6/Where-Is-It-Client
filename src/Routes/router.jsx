import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";


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
            path: '/login',
            element: <Login></Login>
           }
        ]
    }
]);

export default router;