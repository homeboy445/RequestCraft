import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorToaster = ({ message, onCloseCallback }: { message: string, onCloseCallback: () => void }) => {
  React.useEffect(() => {
    toast(message, { position: "bottom-right", autoClose: 3000, onClose: () => {
        onCloseCallback();
    } });
  }, []);

  return (
    <div>
      <ToastContainer position="bottom-right" newestOnTop={true} />
    </div>
  );
};

export default ErrorToaster;
