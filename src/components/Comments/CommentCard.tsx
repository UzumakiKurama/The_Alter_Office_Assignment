import { Avatar, Button, ButtonGroup, Chip, Divider, Typography } from "@mui/material"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from "react";

import { CommentType } from "../../types"
import { dhm } from "../../utility/date";
import InputComment from "../InputComment/InputComment";


const CommentCard = ({
    comment,
    reactionCountHandler,
    insertComment
    } : {
    comment : CommentType,
    reactionCountHandler: (reaction : string,  id: Number) => void,
    insertComment : (comment : string, commentId : Number, parent_user? : string) => void,
}) => {
  
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    const [isReply, setIsReply] = useState<Boolean>(false);

    const splittedText = comment.comment_text.split(" ");
    const textCanOverflow = splittedText.length > 50;
    const beginText = textCanOverflow ? splittedText.slice(0, 49).join(' ') : comment.comment_text;
    const endText = splittedText.slice(49).join(' ');

    const elapsedTime = () : string => {
        const currTime = new Date();
        const commentTime = new Date(comment.timestamp);
        const timeDiff : number = currTime.getTime() - commentTime.getTime();
        const elapsedTime = dhm(timeDiff);
        return elapsedTime;
    }
  
    return (
    <div style={{marginBottom: "20px"}}>
        <div style={{display: 'flex', alignItems: "center", marginBottom: "10px"}}>
            <Avatar alt="user_image" src={comment.user_image} />
            <span style={{paddingLeft : "10px", fontSize: "18px", fontWeight : 'bold', letterSpacing : '0.5px' }}>{comment.user_name}</span>
        </div>
        <div>
            <Typography variant="body1" gutterBottom>
                {
                    comment.parent_comment.length > 0 && 
                    <>
                        Hi <Chip label={`@${comment.parent_comment}`} color="primary" /> {" "}
                    </>
                }
                <div dangerouslySetInnerHTML={{__html : beginText}} />
                {
                    textCanOverflow && (
                        <>
                            {!isExpanded && <span>... </span>}
                            <span style={{
                               display : isExpanded === false ? "none" : "block"
                            }}>
                                <div dangerouslySetInnerHTML={{__html : endText}} />
                            </span>
                            <span
                                role="button" 
                                style={{color : "#3333cc", cursor:"pointer"}}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'show less' : 'show more'}
                            </span>
                        </>
                    )
                }
            </Typography>
        </div>
        <Divider style={{paddingTop: "10px"}} />
        <div style={{
                display : "flex", 
                alignItems: "center", 
                gap: "20px", 
                paddingTop: "10px"}}>
            <ButtonGroup variant="text" aria-label="Basic Buttons">
                <Button onClick={() => reactionCountHandler('smile_count', comment.id)}>
                    <EmojiEmotionsIcon />
                    <span style={{fontSize : "16px", paddingLeft: "4px"}}>{comment.smile_count.toString()}</span>
                </Button> 
                <Button onClick={() => reactionCountHandler('like_count', comment.id)}>
                    <ThumbUpAltIcon/>
                    <span style={{fontSize : "16px", paddingLeft: "4px"}}>{comment.like_count.toString()}</span>
                </Button>
                <Button onClick={() => reactionCountHandler('dislike_count', comment.id)}>
                    <ThumbDownIcon/>
                    <span style={{fontSize : "16px", paddingLeft: "4px"}}>{comment.dislike_count.toString()}</span>
                </Button>
            </ButtonGroup>
            <Typography variant="subtitle2" gutterBottom>
                {
                    elapsedTime()
                }
            </Typography>
            <Button onClick={() => setIsReply(true)} variant="contained">Reply</Button>
        </div>
        {
            isReply &&
            <div style={{paddingLeft : "30px", paddingTop: "20px"}}>
                <InputComment 
                            type="reply" 
                            userEmail={comment.user_name} 
                            hideReply={setIsReply} 
                            insertComment={insertComment} 
                            parentId={comment.id}/>
            </div> 
        }
        {
            comment.replies.length > 0 && 
            <div style={{paddingLeft : "30px", paddingTop: "20px"}}>
                {
                    comment?.replies?.map((comment,id) => <CommentCard 
                                                                key={id}
                                                                comment={comment} 
                                                                reactionCountHandler={reactionCountHandler} 
                                                                insertComment={insertComment} />)
                }   
            </div>
        }
    </div>
  )
}

export default CommentCard