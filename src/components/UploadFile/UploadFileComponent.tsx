import { Alert, Button,Chip,styled } from "@mui/material";
import React, { useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


const Input = styled('input')({
    display: 'none',
  });

interface FileProps{
    setBase64: (base64:string)=> void;
}

export default function UploadFileComponent(props:FileProps){
    const [file,setFile]=useState<File>();
    const [error,setError]=useState("");
    const [showError,setShowError]=useState(false);

    function getBase64(file: File) {
        let reader = new FileReader();
        let baseURL:any;
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(reader.result!=null && !(reader.result instanceof ArrayBuffer) ){ 
                props.setBase64(reader.result);
            }
        };
    }

    const customOnChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        if(event!==null){
            if(event.target!==null){
                if (event.target.files!==null) {
                    var file=event.target.files[0];
                    if(file.type==="image/jpeg" || file.type==="image/png"){
                        setError("");
                        setShowError(false);
                        setFile(file);
                        getBase64(file);
                        
                    }else{
                        setError("Only jpg and png format are accepted");
                        setShowError(true);
                    }
                }
            }
        }
    }
    return(
        <>
            <label htmlFor="contained-button-file" style={{display:"inline"}}>
                <Input accept="image/jpg" id="contained-button-file" type="file" onChange={customOnChange}/>
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            {showError &&
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            }
            {file!=null  &&
                <div style={{marginTop:"15px"}}>
                    {file.name}
                    <Chip
                        size="medium"
                        label="delete"
                        onClick={(e)=>{
                            e.preventDefault();
                            setFile(undefined);
                            props.setBase64("");
                        }}
                        onDelete={(e)=>{
                            e.preventDefault();
                            setFile(undefined);
                            props.setBase64("");
                        }}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                        style={{marginLeft:"10px"}}
                    />
                </div>
            }
        </>
    );
}