import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
    AddJob,
    Admin,
    AllJobs,
    DashboardLayout,
    EditJob,
    Error,
    HomeLayout,
    Landing,
    Login,
    Profile,
    Register,
    Stats,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as jobLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statsLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    document.body.classList.toggle("dark-theme", isDarkTheme);
    return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "register",
                element: <Register />,
                action: registerAction,
            },
            {
                path: "login",
                element: <Login />,
                action: loginAction,
            },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: addJobAction,
                    },
                    {
                        path: "stats",
                        element: <Stats />,
                        loader: statsLoader,
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs />,
                        loader: jobLoader,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        action: profileAction,
                    },
                    {
                        path: "admin",
                        element: <Admin />,
                        loader: adminLoader,
                    },
                    {
                        path: "edit-job/:id",
                        element: <EditJob />,
                        loader: editJobLoader,
                        action: editJobAction,
                    },
                    {
                        path: "delete-job/:id",
                        element: <EditJob />,
                        action: deleteJobAction,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
