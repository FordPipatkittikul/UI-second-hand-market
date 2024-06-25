import HomePage from "./pages/homePage/homePage"
import ListPage from "./pages/listPage/listPage";
import {Layout, RequireAuthLayout} from "./pages/layout/layout";
import SinglePage from "./pages/singlePage/singlePage";
import ProfilePage from "./pages/profilePage/profilePage"
import Register from "./pages/register/register"
import Login from "./pages/login/login"
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./pages/newPostPage/newPostPage";
import { singlePageLoader, listPageLoader } from "./lib/loaders";
import PostUpdatePage from "./pages/postUpdatePage/postUpdatePage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";





function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/list",
          element: <ListPage/>,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage/>,
          loader: singlePageLoader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
      ]
    },
    {
      path: "/",
      element: <RequireAuthLayout/>,
      children:[
        {
          path: "/profile",
          element: <ProfilePage/>,
          loader: listPageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage/>
        },
        {
          path: "/add",
          element: <NewPostPage/>
        },
        {
          path: "/update/:id",
          element: <PostUpdatePage/>
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )

}

export default App