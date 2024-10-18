'use client';

import React, { FC } from 'react';
import {
  Container,
  Box,
  Button,
  List,
} from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { useRef, useState } from 'react';
import { Upload } from '@mui/icons-material';
import { StyledFile, StyledCheck, StyledX} from './FileDisplay';
import { Header4 } from '@/app/Theme/Typography';
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const USERNAME: string = "CPSUser1";

const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileList, setFileList]                   = useState<File[]>([]); //these set functions dont actually work but they gotta be there anyway
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
            UploadToS3(file, USERNAME).then(() => {
                uploadedFilesList.push(file);
                fileList.splice(fileList.indexOf(file), 1);
                updateSubmit();
            }, () => {toast(`${file.name} failed to upload`)} );
        })
    };

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        fileList.push(file);
        setFileList([...fileList]);
        console.log(`pushing ${file.name} to fileList`);
        updateSubmit();
    };
    

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 20,display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ToastContainer/>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "left"}}>
                    <Header4 className='' style={{display: fileList.length? 'none': 'block'}}>No file selected</Header4>
                    <List>
                        {fileList.map((item) => ( 
                            <StyledFile key={item.name} className=''filename={item.name} check={false}></StyledFile>))}
                        {uploadedFilesList.map((item) => ( 
                            <StyledFile className='' key={item.name} filename={item.name} check={true}></StyledFile>))}
                    </List>
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

