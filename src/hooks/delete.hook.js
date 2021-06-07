import { useCallback } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"
import { useSuccess } from './success.hook'
// import { useError } from "./error.hook"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useDelete = () => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })
    
    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    // const errorMessage = useError()

    const deleteHandler = useCallback(async (url, id) => {
        const pass = window.confirm("Вы уверенны?")
        if (pass) {
            try {
                const deleted = await request(`${API_URL}${url}/${id}`, "DELETE", null, {
                    Authorization: `Basic ${code.hashed}`
                })
                successMessage(deleted.message)
            } catch (e) {
                successMessage('Удаление прошло успешно!')
                window.location.reload()
            }
        }

    }, [code, request, API_URL, successMessage])

    return { deleteHandler }
}