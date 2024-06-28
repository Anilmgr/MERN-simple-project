import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";
import {BsFillMoonFill, BsFillSunFill  }from 'react-icons/bs'

export default function ThemeToggle() {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? (
                <BsFillSunFill className="toggle-icon" />
            ) : (
                <BsFillMoonFill />
            )}
        </Wrapper>
    );
};
