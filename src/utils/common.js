import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../App.css";

const ErrorIcon = () => <HiOutlineExclamationCircle className="mr-1 text-[#ff2828] relative top-[3px] text-xs" />;

export const addErrorIcon = (message) => (
  <div className="flex text-[#ff2828] text-xs">
    <ErrorIcon />
    {message}
  </div>
);
