import { createContext } from "react"

export const AuthContext = createContext({
    token: null,
    login: false,
    logout: false,
    isAuthentificated: false
})