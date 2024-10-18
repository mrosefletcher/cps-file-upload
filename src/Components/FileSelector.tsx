'use client';

import React, { FC } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
} from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { useRef, useState } from 'react';
import { Upload } from '@mui/icons-material';
import {FileToUpload, FileUploaded} from './FileDisplay';
import { Header2, Header4 } from '@/app/Theme/Typography';


const USERNAME: string = "CPSUser1";

const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileList, setFileList]                   = useState<File[]>([]);
    const [uploadedFilesList, setUploadedFilesList] = useState<File[]>([]);
    const [submitActive, setSubmit]                 = useState(fileList.length > 0);

    function updateSubmit(){
        console.log(`in update submit: fileList.length = ${fileList.length}`);
        fileList.length ? setSubmit(true) : setSubmit(false);
    };

    function handleBrowse(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        inputRef.current.click();
    };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        fileList.forEach((file) => {
            UploadToS3(file, USERNAME); //need a success condition here
            uploadedFilesList.push(file);
        })
        fileList.splice(0, fileList.length);
        updateSubmit();
    };

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        const filesArray = Array.from(files); 
        filesArray.forEach((item) =>{
            fileList.push(item);
            console.log(`pushing ${item.name} to fileList`);
        });
        updateSubmit();
    };
    

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 20,display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "left"}}>
                    <Header4>Select file to upload</Header4>
                    {/* <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "left"}}> */}

                            {fileList.map((item) => ( 
                                <FileToUpload className='' key={item.name} filename={item.name}/>))}
                            {uploadedFilesList.map((item) => ( 
                                <FileUploaded className='' key={item.name} filename={item.name}/>))}

                    <Box sx={{ mt: 1, display: 'flex' }}>
                        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleBrowse}>
                            Browse Files
                        </Button>
                        <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 3 }} style={{ backgroundColor: submitActive  ? 'rgb(25, 118, 210)' : '#AAAFB4' }} onClick={handleSubmit}>
                            Submit
                            <Upload sx={{paddingLeft: 1}}/>
                        </Button>
                        <input ref={inputRef} type='file' hidden onChange={handleFileSelect} />  
                    </Box>
                </Box>
            </Box>
        </Container>
    )
};

export default FileSelector;

