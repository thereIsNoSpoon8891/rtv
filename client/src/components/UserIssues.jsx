import { useContext } from "react"
import { UserContext } from "../context/UserProvider"


const UserIssues = props => {

    const {deleteUserPost} = useContext(UserContext)
    
    const {title, description, image, upvotes, downvotes, id, comments } = props
    
    const commentElements = comments.map(comment => (
        <div 
        className="comment--container"
        key={comment._id}
        >
            <p>
                {comment.comment}
            </p>
        </div>
    ))

    const handleDelete = () => {
        deleteUserPost(id)
    }

    return(
            <div className="issues--container">
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
                <img width="300px" src={image}/>
                <button
                className="upvote"
                >
                    {upvotes}
                </button>
                <button
                className="downvote"
                >
                    {downvotes}
                </button>
                <div className="comments--box">
                {commentElements}
                </div>
                <button 
                onClick={handleDelete}
                className="buttons">
                    Delete this post
                </button>
            </div>
    )
}

export default UserIssues