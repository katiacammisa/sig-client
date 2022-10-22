import {toast} from "react-toastify";

export const SuccessToast = (message: string) => (
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    toastId: '0'
  })
)

export const ErrorToast = (message: string) => (
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    toastId: '0'
  })
)