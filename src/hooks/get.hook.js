import { useEffect, useState } from "react"
import { useHttp } from "./http.hook"

export const useGet = (url) => {
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState([])

    useEffect(() => {
        let mounted = true
        try {
            if (mounted) {
                request(`${API_URL}${url}`, "GET", null)
                    .then(result => {
                        setData(result)
                    })
            }
        } catch (e) {}
        return () => mounted = false
    }, [request, API_URL, url])

    return { data, loading }
}