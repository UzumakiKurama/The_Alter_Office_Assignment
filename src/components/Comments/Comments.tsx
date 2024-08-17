import { CommentType } from "../../types"
import CommentCard from "./CommentCard"

const Comments = ({
  comments, 
  reactionCountHandler,
  insertComment
  } : {
  comments : CommentType[],
  reactionCountHandler : (reaction: string,  id: Number) => void,
  insertComment : (comment : string, commentId : Number) => void,
}) => {
  return (
    <div className="comments-container" style={{
              width:"90%", 
              overflow: "scroll",
              marginTop : "20px"
    }}>
      <div style={{padding : "20px"}}>
        {
          comments.map((comment,id) => (
            <>
              <CommentCard 
                key={id} 
                insertComment={insertComment} 
                reactionCountHandler={reactionCountHandler} 
                comment={comment} />
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Comments