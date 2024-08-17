import { Avatar, Box, Button, ButtonGroup, Container } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react';

import { CommentType, UserDataType } from '../../types'
import { findIdAndEditReaction, findIdAndInsertComment } from '../../utility/findComment';
import InputComment from '../InputComment/InputComment'
import Comments from '../Comments/Comments'
import initalComments from '../../assets/mock-comments.json';
import Paginate from '../Pagination/Pagination';
import { CredentialResponse, googleLogout } from '@react-oauth/google';

const Dashboard = ({userData, setUser}:{
  userData : UserDataType | null,
  setUser : Dispatch<SetStateAction<CredentialResponse | null>>
}) => {

  const [comments, setComments] = useState<CommentType[]>(initalComments);
  const [commentsVisible, setCommentsVisible] = useState<CommentType[]>([]);
  const [popularBtnVariant , setPopularBtnVariant] = useState<boolean>(false);
  const [latestBtnVariant, setLatestBtnVariant] = useState<boolean>(false);

  const totalPages = comments.length < 8 ? 1 : Math.floor(comments.length / 8) + 1;
  
  // This function set the comments that are visible on each page. Pagination functionality
  const commentsPagination = (page : number) => {
    let showComments = comments.slice(page*8-8, page*8);
    setCommentsVisible(showComments);
  }

  const reactionCountHandler = (reaction:string, id: Number) : void => {
    setComments(comments => findIdAndEditReaction(comments, reaction, id)) 
  }

  const insertComment = (comment : string, commentId : Number, parent_user? : string) => {
    const newComment = {
      id : Date.now(),
      parent_comment : parent_user ? parent_user : "",
      user_name : userData?.name,
      user_image : userData?.picture,
      comment_text : comment,
      timestamp : `${new Date()}`,
      like_count : 0,
      smile_count : 0,
      dislike_count : 0,
      replies : []
    }
    if(commentId === 0){
      setComments(prevState => [...prevState, newComment])
    } else {
      setComments(prevComment => findIdAndInsertComment(prevComment, newComment, commentId));
    }
  }

  const sortCommentByPopular = () => {
    setPopularBtnVariant(true);
    setLatestBtnVariant(false);
    setComments(comments => {
      const newComments = [...comments];
      newComments.sort((a,b) => b.smile_count - a.smile_count);
      return newComments;
    });
  }

  const sortCommentByLatest = () => {
    setPopularBtnVariant(false);
    setLatestBtnVariant(true);
    setComments(comments => {
      const newComments = [...comments];
      newComments.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return newComments;
    });
  }

  const logout = () => {
    localStorage.setItem("userCredential", "");
    googleLogout();
    setUser(null);
  }

  return (
    <div >
      <Container maxWidth="lg" sx={{marginTop : "10px"}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <Avatar alt='user_image' src={userData?.picture}/> <span style={{fontSize: "18px", fontWeight:'bold'}}>{userData?.name}</span>
          </div>
          <div>
            <Button onClick={logout} variant='contained' color='error'>Logout</Button>
          </div>
        </div>
      </Container>
      {
        userData && 
          <Container 
            maxWidth="lg" 
            style={{marginTop : "20px"}}>
            <Box sx={{
                boxShadow: "3px 3px 10px grey", 
                borderRadius:"10px",
                height:"90vh",
                display : 'flex',
                flexDirection : "column",
                alignItems: "center"
              }}> 
              <div style={{
                width : "90%",
                display : 'flex',
                alignItems : "center",
                justifyContent : "space-between",
                margin : "10px 20px",
              }}>
                  <h1>Comments({comments.length})</h1>
                  <ButtonGroup aria-label='Basic Buttons'>
                    <Button variant={popularBtnVariant ? 'contained' : 'outlined'} onClick={sortCommentByPopular}>Popular</Button>
                    <Button variant={latestBtnVariant ? 'contained' : 'outlined'} onClick={sortCommentByLatest}>Latest</Button>
                  </ButtonGroup>
              </div>

              <InputComment userEmail={userData.name} insertComment={insertComment} />

              {
                comments && 
                  <Comments 
                    reactionCountHandler={reactionCountHandler} 
                    comments={commentsVisible} 
                    insertComment={insertComment} />
              }
              <Paginate 
                comments={comments} 
                commentsPagination={commentsPagination} 
                totalPages={totalPages} />
            </Box>
          </Container>
      }
    </div>
  )
}

export default Dashboard