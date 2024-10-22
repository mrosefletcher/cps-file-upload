'use client';

import React, { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box, Button, Divider } from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { Upload } from '@mui/icons-material';
import * as FileDisplay from './FileDisplay';
import { Header4, Header5 } from '@/app/Theme/Typography';
import * as Colors from '@/app/Theme/Colors';
import * as Section from './Section';
import {toast, ToastContainer} from 'react-toastify'

import "react-toastify/dist/ReactToastify.css";


const USERNAME: string = "1022Demo";

const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileList, setFileList]                   = useState<File[]>([]); 
    const [uploadedFilesList, setUploadedFilesList] = useState<File[]>([]);
    const [submitActive, setSubmit]                 = useState(fileList.length > 0? Colors.BLUE: Colors.GREYED);
    const [fileSelected, setFileSelected]           = useState(fileList.length > 0 && uploadedFilesList.length >0);

    const PleaseSelectFile = styled(Header5)`
        display: ${fileSelected? 'none': 'block'};
        color: ${Colors.ERROR};
        font-style: italic;
    `;

    function updateSubmit(){
        console.log(`in update submit: fileList.length = ${fileList.length}`);
        fileList.length ? setSubmit(Colors.SUCCESS) : setSubmit(Colors.GREYED);
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

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) { //check for already uploaded file
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        fileList.push(file);
        setFileList([...fileList]);
        console.log(`pushing ${file.name} to fileList`);
        updateSubmit();
    };
    

    return (

            
            <Section.SectionBackground>
            <ToastContainer/>
                <Section.SectionContent>
                    <Header4 style={{color: Colors.TEXT.grey}}>Please select a file to upload:</Header4>
                    <Box sx={{ mt: 1, display: 'flex' }}> {/* put the buttons in a row*/}
                        <Button variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: Colors.BLUE}} onClick={handleBrowse}>
                            Browse Files
                        </Button>
                        <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 3 }} style={{ backgroundColor: submitActive }} onClick={handleSubmit}>
                            Submit
                            <Upload sx={{paddingLeft: 1}}/>
                        </Button>
                        <input ref={inputRef} type='file' hidden onChange={handleFileSelect} />  
                    </Box>
                <Divider style={{marginBottom: '10px'}}/>
                <FileDisplay.StyledFile style={{display: fileSelected? 'block': 'none'}}>no file selected</FileDisplay.StyledFile>
                {fileList.map((item) => ( 
                    <Section.DivFlexRow key={item.name}>
                        <FileDisplay.StyledX/>
                        <FileDisplay.StyledFile> {item.name} </FileDisplay.StyledFile>
                    </Section.DivFlexRow>))}
                {uploadedFilesList.map((item) => ( 
                    <Section.DivFlexRow key={item.name}>
                        <FileDisplay.StyledCheck/>
                        <FileDisplay.StyledFile> {item.name} </FileDisplay.StyledFile>
                        </Section.DivFlexRow>))}
                    
                </Section.SectionContent>
            </Section.SectionBackground>

    )
};

export default FileSelector;

