import {toast, ToastOptions} from 'react-toastify'

export const notifyConfig = {
    error: (msg: string, options?: ToastOptions<any>) => {
        toast.error(msg, {
            position: 'top-right',
            autoClose: 1200,
            ...options
        })
    },
    success: (msg: string, options?: ToastOptions<any>) => {
        toast.success(msg, {
            position: 'bottom-right',
            autoClose: 1200,
            ...options
        })
    },
    info: (msg: string, options?: ToastOptions<any>) => {
        toast.info(msg, {
            position: 'bottom-center',
            autoClose: 1200,
            ...options
        })
    },
    promise: () => {

    }
}