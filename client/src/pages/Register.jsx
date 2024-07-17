import { Form, Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"

const Register = () => {
  return (
    <Wrapper>
        <Form method="post" className="form">
          <Logo/>
          <h4>Register</h4>
          <FormRow name="firstName" type="text" labelText='First Name'/>
          <FormRow name="lastName" type="text" labelText='Last Name'/>
          <FormRow name="address" type="text"/>
          <FormRow name="email" type="email"/>
          <FormRow name="password" type="password"/>
          <button type="submit" className="btn btn-block">Register</button>
          <p>Already have an account?
            <Link to='/login' className="member-btn">Login</Link>
          </p>
        </Form>
    </Wrapper>
  )
}
export default Register