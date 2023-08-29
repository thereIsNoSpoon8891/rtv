import { useEffect } from "react"
import { useNavigate, Route } from "react-router-dom"




const ProtectedRoutes = props => {

    const { token, children } = props

    const nav = useNavigate()

    useEffect( () => {
        if(!token){
            nav("/")
        }
    },[token])

    return token ? children : null
}

export default ProtectedRoutes