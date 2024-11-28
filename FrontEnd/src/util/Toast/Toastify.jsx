import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Các hàm hiển thị các loại toast khác nhau
export const showSuccessToast = (message, options = {}) => {
    toast.success(message, options);
};

export const showErrorToast = (message, options = {}) => {
    toast.error(message, options);
};

export const showInfoToast = (message, options = {}) => {
    toast.info(message, options);
};

export const showWarningToast = (message, options = {}) => {
    toast.warn(message, options);
};

// Cấu hình ToastContainer để sử dụng trong ứng dụng
export const ToastConfig = () => (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
);