import { useContext } from "react"
import { IssueContext } from "../context/IssueProvider"
import IssueDetails from "./IssueDetails"


const Public = () => {

const { issues } = useContext(IssueContext)

const orderedIssues = issues.sort((a,b) => b.upvotes - a.upvotes)
//console.log(issues)
const issueDetails = orderedIssues.map(issue => (
    <IssueDetails 
    title={issue.title}
    description={issue.description}
    image={issue.imagUrl}
    upvotes={issue.upvotes}
    downvotes={issue.downvotes}
    comments={issue.comments}
    id={issue._id}
    key={issue._id}
    />
    ))


    return(
        <div>
            {issueDetails}
        </div>
    )
}

export default Public