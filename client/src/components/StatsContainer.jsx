import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = ({ defaultStats }) => {
    const stats = [
        {
            title: "Pending Applications",
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#f59e0b",
            bcg: "#fef3c7",
        },
        {
            title: "Interview Applications",
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9",
        },
        {
            title: "Jobs Declined",
            count: defaultStats?.declined || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee",
        },
    ];
    return (
        <Wrapper>
            {stats.map((item) => {
                return <StatItem key={item.title} {...item} />;
            })}
        </Wrapper>
    );
};
export default StatsContainer;
