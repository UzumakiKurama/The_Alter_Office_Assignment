import { Box, Button, Chip } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar : [
        ['bold', 'italic', 'underline'],
        ['image'],
    ]
}

const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet', 'indent',
    'image'
  ]

const InputComment = ({userEmail, type, hideReply, insertComment, parentId=0} : {
    userEmail : string | undefined,
    type? : string,
    hideReply? : Dispatch<SetStateAction<Boolean>>,
    insertComment : (comment : string, commentId : Number, parent_user? : string) => void,
    parentId? : Number
}) => {

    const [inputText, setInputText] = useState<string>("");
    const [readOnly, setReadOnly] = useState<boolean>(false);

    const submitCommentHandler = () => {
        if(type === "reply"){
            insertComment(inputText, parentId, userEmail);
        } else {
            insertComment(inputText,parentId);
        }
        setInputText("");
    }

    const onEditorChangeHandler = (value : string, editor : ReactQuill.UnprivilegedEditor) => {
        if(editor.getLength() < 250){
            setReadOnly(false);
            setInputText(value)
        } else {
            setReadOnly(true);
        }
    }

  return (
    <Box sx={{
        borderRadius : "30px",
        border: "1px solid #d9d9d9",
        width : "90%",
    }}>
        <div style={{padding : "10px 20px", fontSize: "20px"}}>
            Hi <Chip label={`@${userEmail}`} color="primary"/>
        </div>
        <div style={{padding : "10px 20px"}}>
            <ReactQuill
                formats={formats} 
                modules={modules} 
                theme="snow" 
                value={inputText}
                readOnly={readOnly} 
                onChange={(value, _, __, editor: ReactQuill.UnprivilegedEditor) => onEditorChangeHandler(value,editor)}/>
            {
                readOnly && <p style={{color : "red", margin: 0, float: "right"}}>Maximum limit breached <span onClick={() => setReadOnly(false)} style={{color : "blue", cursor: "pointer"}}>Edit Again</span></p>
            }
            <Button 
                onClick={submitCommentHandler} 
                sx={{marginTop: "15px", marginRight: "15px"}} variant="contained">
                    Send
            </Button>
            {
                type === "reply" && 
                    <Button
                        // @ts-ignore 
                        onClick={() => hideReply(false)} 
                        sx={{marginTop: "15px"}} variant="contained">
                            Cancel
                    </Button>
            }
        </div>
    </Box>
  )
}

export default InputComment