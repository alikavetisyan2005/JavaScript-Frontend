import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/main/signin";
import { SignUp } from "../pages/main/signup";
import { Profile } from "../pages/auth/Profile";
import { AuthLayout } from "../pages/auth/authLayout";
import { Settings } from "../pages/auth/settings";
import { Followers } from "../pages/auth/followers";
import { Followings } from "../pages/auth/followings";
import { Messages } from "../pages/auth/messages";
import { Search } from "../pages/auth/search";
import { UserPage } from "../pages/auth/UserPage";

export const routes = createBrowserRouter([
    {path: "", element: <Signin/>},
    {path: "signup", element: <SignUp/>},
    {path: "profile", element: <AuthLayout/>,
        children: [
            {path: "", element: <Profile/>},
            {path: "settings", element: <Settings/>},
            {path: "followers", element: <Followers/>},
            {path: "followings", element: <Followings/>},
            {path: "search", element: <Search/>},
            {path: "messages", element: <Messages/>},
            {path: "view/:username", element: <UserPage/>}
        ]
    },

])