import { useState } from "react"

export const useLanguage = () => {
    const [language, setLanguage] = useState('EN')

    return { language, setLanguage }
}