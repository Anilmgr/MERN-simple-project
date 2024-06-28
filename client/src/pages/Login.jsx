import { Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"

const Login = () => {
  return (
    <Wrapper>
        <form className="form" method="post">
          <Logo/>
          <h4>Login</h4>
          <FormRow name="email" type="email"/>
          <FormRow name="password" type="password"/>
          <button type="submit" className="btn btn-block">Login</button>
          <p>Don't have an account?
            <Link to='/register' className="member-btn">Register</Link>
          </p>
        </form>
    </Wrapper>
  )
}
export default Login