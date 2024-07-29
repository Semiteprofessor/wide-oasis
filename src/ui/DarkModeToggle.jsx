import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
  return <div>DarkModeToggle</div>;
};

export default DarkModeToggle;
