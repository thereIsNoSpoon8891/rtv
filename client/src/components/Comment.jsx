



const Comment = props => {

    const {text} = props

    return(
        <div className="comment--container">
            <p>
                {text}
            </p>
        </div>
    )
}

export default Comment