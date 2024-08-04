import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/auth/login", data);
        toast.success("Login successful!");
        return redirect("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const Login = () => {
    const navigate = useNavigate();

    const loginDemoUser = async () => {
        const data = {
            email: "test@gmail.com",
            password: "password",
        };
        try {
            await customFetch.post("/auth/login", data);
            toast.success("Logged in as demo user successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error?.response?.data?.message);
            error;
        }
    };
    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login</h4>
                <FormRow name="email" type="email" />
                <FormRow name="password" type="password" />
                <SubmitBtn formBtn />
                <button type="button" className="btn btn-block" onClick={loginDemoUser}>Explore the app!</button>
                <p>
                    Don't have an account?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;
