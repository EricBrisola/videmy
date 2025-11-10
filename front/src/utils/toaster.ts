import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Toaster = {
  successMessage: (message: string) => void;
  errorMessage: (message: string) => void;
  warningMessage: (message: string) => void;
};

export const toaster: Toaster = {
  successMessage: (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
      style: {
        width: "320px",
        whiteSpace: "pre-line",
      },
    });
  },

  errorMessage: (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
      style: {
        width: "320px",
      },
    });
  },

  warningMessage: (message) => {
    toast.warning(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
      style: {
        width: "320px",
      },
    });
  },
};
