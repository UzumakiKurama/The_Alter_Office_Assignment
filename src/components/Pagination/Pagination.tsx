import { useEffect, useState } from "react"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CommentType } from "../../types";

const Paginate = ({
  totalPages,
  commentsPagination,
  comments
}: {
  totalPages : number,
  commentsPagination : (page : number) => void,
  comments : CommentType[]
}) => {
  const [currPage, setCurrPage] = useState<number>(1);

  useEffect(() => {
    commentsPagination(currPage);
  }, [currPage, comments])

  const prevClickHandler = () => {
    setCurrPage(page => page-1);
  }

  const nextClickHandler = () => {
    setCurrPage(page => page+1);
  }
  return (
    <div style={{margin : "10px 0px", display: 'flex', alignItems: 'center'}}>
      {
        currPage > 1 ?  (
          <span onClick={prevClickHandler}>
            <ArrowBackIosIcon sx={{marginTop: "2px", cursor: "pointer"}} />
          </span>
        ) : null
      }
      {
        Array(totalPages).fill(0).map((_,id) => (
          <span 
            key={id} 
            style={{  
              borderRadius : "50%", 
              padding: "4px 8px",
              backgroundColor : id+1 === currPage ? "#bfbfbf" : "",
              margin : "0px 3px",
            }}
            onClick={() => {}}>
            {++id}
          </span>
        ))
      }
      {
        currPage === totalPages ? null : (
          <span onClick={nextClickHandler} >
            <ArrowForwardIosIcon sx={{marginTop: "2px", cursor: "pointer"}} />
          </span>
        )
      }
    </div>
  )
}

export default Paginate