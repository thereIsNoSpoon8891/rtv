import {useState, useEffect, createContext} from 'react'

import axios from 'axios'

const IssueContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {// configure headers for authorization
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const IssueContextProvider = props => {
    
   const initvalue = {
        title: "",
        description: "",
        imagUrl: "",
        upvotes: 0,
        downvotes: 0,
        user: "",
        comments: []
    }
    const [issues, setIssues] = useState([initvalue])

    
    const getPublicIssues = () => {
        axios.get('/api')
        .then(res => setIssues(res.data))
        .catch(err => console.log(err))
    }

    const addIssue = issue => {
        userAxios.post("/api/authenticate/issues", issue)
            .then(res => {
                console.log(res)
                getPublicIssues()
            })
            .catch(err => console.log(err))
    }

    const voteUp = id => {
        userAxios.put(`/api/authenticate/issues/upvote/${id}`)
            .then(res => {
                console.log(res)
                getPublicIssues()
            })
            .catch(err => console.log(err))
    }

    const downVote = id => {
        userAxios.put(`/api/authenticate/issues/downvote/${id}`)
            .then(res => {
                console.log(res)
                getPublicIssues()
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        getPublicIssues()
    },[])


//console.log(issues, "from provider")
    return(
        <IssueContext.Provider
        value={{
            issues,
        getPublicIssues,
        voteUp,
        downVote,
        addIssue
    }}
        >
            {props.children}
        </IssueContext.Provider>
    )
}

export { IssueContext, IssueContextProvider }

