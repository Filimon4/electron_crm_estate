import {toast} from 'react-toastify'

export const notifyConfig = {
    error: (msg: string) => {
        toast.error(msg)
    },
    success: (msg: string) => {
        toast.success(msg)
    },
}