import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/main/signin";
import { SignUp } from "../pages/main/signup";
import { Profile } from "../pages/auth/Profile";
import { AuthLayout } from "../pages/auth/authLayout";
import { Settings } from "../pages/auth/settings";
import { Followers } from "../pages/auth/followers";
import { Followings } from "../pages/auth/followings";
import { Posts } from "../pages/auth/posts";
import { Messages } from "../pages/auth/messages";

export const routes = createBrowserRouter([
    {path: "", element: <Signin/>},
    {path: "signup", element: <SignUp/>},
    {path: "profile", element: <AuthLayout/>,
        children: [
            {path: "", element: <Profile/>},
            {path: "settings", element: <Settings/>},
            {path: "followers", element: <Followers/>},
            {path: "followings", element: <Followings/>},
            {path: "posts", element: <Posts/>},
            {path: "messages", element: <Messages/>}
        ]
    },

])