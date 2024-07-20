import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/auth/register", data);
        toast.success('Registration successful!')
        return redirect("/login");
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error;
    }
};

const Register = () => {
    const navigation = useNavigation();
    console.log(navigation);
    const isSubmitting = navigation.state === "submitting";
    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow name="name" type="text" labelText="First Name" />
                <FormRow name="lastName" type="text" labelText="Last Name" />
                <FormRow name="location" type="text" />
                <FormRow name="email" type="email" />
                <FormRow name="password" type="password" />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...': 'Register'}
                </button>
                <p>
                    Already have an account?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;
