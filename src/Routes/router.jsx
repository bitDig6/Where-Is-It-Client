import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import LostAndFoundItems from "../pages/LostAndFoundItems";
import PrivateRoute from "./PrivateRoute";
import PostDetails from "../pages/private/PostDetails";
import AddItems from "../pages/private/AddItems";
import MyItems from "../pages/private/MyItems";
import UpdateItems from "../pages/private/UpdateItems";
import RecoveredItems from "../pages/private/RecoveredItems";
import ErrorPage from "../pages/ErrorPage";
import SearchItems from "../pages/SearchItems";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allItems',
                element: <LostAndFoundItems></LostAndFoundItems>,
                loader: () => fetch('https://where-is-it-server-xi.vercel.app/totalPostsCount')
            },
           {
            path: '/login',
            element: <Login></Login>
           },
           {
            path: '/register',
            element: <Register></Register>
           },
           {
            path: '/items/:id',
            element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>
           },
           {
            path: '/addItems',
            element: <PrivateRoute><AddItems></AddItems></PrivateRoute>
           },
           {
            path: '/myItems',
            element: <PrivateRoute><MyItems></MyItems></PrivateRoute>
           },
           {
            path: 'updateItems/:id',
            element: <PrivateRoute><UpdateItems></UpdateItems></PrivateRoute>
           },
           {
            path: '/allRecovered',
            element: <PrivateRoute><RecoveredItems></RecoveredItems></PrivateRoute>
           },
           {
            path: '/searchItem/:search',
            element: <SearchItems></SearchItems>
           }
        ]
    }
]);

export default router;