import { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { IssueContext } from "../context/IssueProvider"
import Comment from "./Comment"


const IssueDetails = props => {

    const [comment ,setComment] = useState({comment: ""})

    const {submitComment} = useContext(UserContext)

    const {getPublicIssues, voteUp, downVote} = useContext(IssueContext)

    const {title, description, image, upvotes, downvotes, id, comments} = props

    const commentElements = comments.map(comment => <Comment key={comment._id} text={comment.comment} />)

    const handleChange = e => {
        e.preventDefault()
            const {name, value} = e.target
            setComment(prevComment => ({...prevComment,[name]: value }))
    }

    const handlesubmit = e => {
        e.preventDefault()
        submitComment(id, comment)
        setComment({comment: ""})
        getPublicIssues()
    }

    const handleUpVote = () => {
        voteUp(id)
    }

    const handleDownVote = () => {
        downVote(id)
    }

    return(
        <div className="issues--container">
            <h1>{title}</h1>
            <p>{description}</p>
            <img  width="300px" src={image}/>

            <button
             onClick={handleUpVote}
             className="upvote"
             >
                {upvotes}
            </button>

            <button
            className="downvote"
            onClick={handleDownVote}>
                {downvotes}
            </button>
            <div className="comments--box">

            What people have said... 
            
              {commentElements}
            </div>
            <form>
                 <textarea
                                type="text"
                                name="comment"
                                value={comment.comment}
                                onChange={handleChange}
                                placeholder="Leave a comment"
                                className="text-area--input"
                                />
                    <button 
                    onClick={handlesubmit}
                    className="buttons"
                    >
                        submit comment
                    </button>
            </form>

        </div>
    )
}

export default IssueDetails