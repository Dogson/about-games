import { toast } from "react-toastify";

export const launchBasicToast = (message: string, key?: string): void => {
  setTimeout(() => {
    toast(message, getOptions(key || message));
  }, 100);
};

export const launchSuccessToast = (message: string, key?: string): void => {
  setTimeout(() => {
    toast.success(message, getOptions(key || message));
  }, 100);
};

export const launchErrorToast = (message: string, key?: string): void => {
  setTimeout(() => {
    toast.error(message, getOptions(key || message));
  }, 100);
};

export const launchWarningToast = (message: string, key?: string): void => {
  setTimeout(() => {
    toast.warning(message, getOptions(key || message));
  }, 100);
};

const getOptions = (id: string) => ({
  autoClose: 5000,
  hideProgressBar: true,
  toastId: id,
});
