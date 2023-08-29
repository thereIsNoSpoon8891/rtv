import {useState, useContext, useEffect} from 'react'
import { UserContext } from '../context/UserProvider'
import { IssueContext } from '../context/IssueProvider'
import UserIssues from './UserIssues'

const Profile = () => {

    const { user:{username}, issues, getUserIssues } = useContext(UserContext)

    const { addIssue } = useContext(IssueContext)

    const defaultValues = {
        title: "",
        description: "",
        imagUrl: ""
    }
//console.log(issues)
    const [issue, setIssue] = useState(defaultValues)

    const handleChange = e => {
        e.preventDefault()
            const {name, value} = e.target
                setIssue(prevIssue => ({
                        ...prevIssue,
                        [name]: value
                }))
    }

    const handleSubmit = e => {

        e.preventDefault()
            addIssue(issue)
                setIssue(defaultValues)
                getUserIssues()

    }

    useEffect(() => {
        getUserIssues()
    }, [])

    const myIssues = issues.map(issue => (<UserIssues
                                            title={issue.title}
                                            description={issue.description}
                                            image={issue.imagUrl}
                                            upvotes={issue.upvotes}
                                            downvotes={issue.downvotes}
                                            comments={issue.comments}
                                            id={issue._id}
                                            key={issue._id}
                                            />))
    return(
        <div>
            <div >
                <h1 className='username'>
                    Welcome, {username}!
                </h1>
            </div>
            <div className='profile--form'>
                <h1>
                    Have a Issue you would like to discuss?
                    Submit it here.
                </h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    placeholder="Title"
                    name="title"
                    className="inputs"
                    value={issue.title}
                    onChange={handleChange}
                    />

                    <input 
                    type="text"
                    placeholder="Image URL"
                    name="imagUrl"
                    className="inputs"
                    value={issue.imagUrl}
                    onChange={handleChange}
                    />

                    <textarea 
                    type='text'
                    placeholder="Describe the issue"
                    name="description"
                    value={issue.description}
                    onChange={handleChange}
                    className='text-area--input'
                    />
                    <button className='buttons'>
                        Submit Issue
                    </button>

                </form>
            </div>
                    {myIssues}
        </div>
    )
}

export default Profile