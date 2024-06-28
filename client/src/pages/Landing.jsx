import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>
                    <p>
                    I'm baby heirloom gluten-free vegan lomo, leggings pitchfork food truck tofu gastropub pug green juice JOMO roof party. Ennui iPhone typewriter poutine flexitarian cupping keytar jianbing tbh yuccie bitters unicorn air plant asymmetrical normcore. Farm-to-table man braid solarpunk normcore glossier ugh vape cold-pressed gluten-free food truck poutine JOMO hella drinking vinegar yuccie.
                    </p>
                    <Link to='/register' className="btn register-link">Register</Link>
                    <Link to='/login' className="btn">Login / Demo User</Link>
                </div>
            </div>
        </Wrapper>
    );
};

export default Landing;
