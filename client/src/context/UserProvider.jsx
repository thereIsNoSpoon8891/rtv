import {  createContext,useContext, useState } from "react";
import { IssueContext } from "./IssueProvider";
import axios from 'axios'

const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {// configure headers for authorization
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})



const UserContextProvider = props => {
    


    const [user, setUser] = useState({
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errorMessage: ""
    })

   const {getPublicIssues} = useContext(IssueContext)

    const [userIssues, setUserIssues] = useState([])



const signUp = credentials => {// handle signup, user is logged in on signup
        axios.post("/api/authenticate/signup", credentials)
        .then(res => {
            const {user, token} = res.data
                localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user))
                        setUser(prevUser => ({
                            ...prevUser,
                            user,
                            token
        }))
    })
            .catch(err => handleError(err.response.data.errorMessage))
}
 
const login = credentials => {
    axios.post("api/authenticate/login", credentials)
    .then(res => {
        const {user, token} = res.data
            localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                    getUserIssues()
        setUser(prevUser => ({
            ...prevUser,
            user,
            token
        }))
    })
        .catch(err => handleError(err.response.data.errorMessage))
}

const getUserIssues = () => {
    userAxios.get("/api/authenticate/issues/user")
        .then(res => setUserIssues(res.data))
        .catch(err => handleError(err.response.data.errorMessage))
}

const submitComment = (id, comment) => {
    userAxios.post(`/api/authenticate/issues/${id}`, comment)
        .then(res => {
            console.log(res)
            getUserIssues()
            getPublicIssues()
        })
        .catch(err => handleError(err.response.data.errorMessage))
}

const deleteUserPost = id => {
    userAxios.delete(`/api/authenticate/issues/${id}`)
        .then(res => {
            console.log(res)
            getUserIssues()
            getPublicIssues()
        })
        .catch(err => handleError(err.response.data.errorMessage))
}

const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser({
        user: {},
        token: "",
        errorMessage: ""
    })

}

const handleError = errorMessage => {
    setUser(prevUser => ({
        ...prevUser,
        errorMessage
    }))
}
    // console.log(user)
    //console.log(userIssues)
    return(
        <UserContext.Provider
        value={{
            ...user,
            signUp,
            login,
            logout,
            submitComment,
            getUserIssues,
            deleteUserPost,
            issues: [...userIssues]
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider}