import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
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
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login</h4>
                <FormRow name="email" type="email" />
                <FormRow name="password" type="password" />
                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isSubmitting}
                >
                    {" "}
                    {isSubmitting ? "Submitting..." : "Login"}
                </button>
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
