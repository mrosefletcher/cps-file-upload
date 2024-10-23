'use client';

import React, { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box, Button, Divider } from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { Check, Clear, FilePresent, Upload } from '@mui/icons-material';
import * as FileDisplay from './FileDisplay';
import { Header4, Header5 } from '@/app/Theme/Typography';
import * as Colors from '@/app/Theme/Colors';
import * as Section from './Section';
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const USERNAME: string = "1022Demo";

const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [reRender, toggleReRender] = useState(true);
    const [fileList, setFileList]                   = useState<Set<File>>(new Set()); 
    const [uploadedFilesList, setUploadedFilesList] = useState<Set<File>>(new Set()); //the set function forces a rerender
    const [submitColor, setSubmit]                 = useState(fileList.size > 0? Colors.BLUE: Colors.GREYED);
    const [fileSelected, setFileSelected]           = useState(false);
    


    function updateSubmit(){
        console.log(`in update submit: fileList.size = ${fileList.size}`);
        fileList.size ? setSubmit(Colors.SUCCESS) : setSubmit(Colors.GREYED);
        toggleReRender(!reRender);
    };

    function handleBrowse(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        inputRef.current.click();
    };

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) { 
        //e.preventDefault();
        console.log("in fileSelect:");
        const files = e.target.files;
        if (!files) return;
        console.log(files);
        setFileSelected(true);
        for (let i = 0; i < files.length; i++) { //for some reason there are extra values in "files" that aren't included in the length
            let file = files[i];
            if (file.size >= 5120) { break;};
            fileList.add(file);
            console.log(`adding ${file.name} to fileList`);
            updateSubmit();
            setFileList(fileList);
        }
    };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        fileList.forEach((file) => {
            UploadToS3(file, USERNAME).then(() => { //gotta do it one at a time
                uploadedFilesList.add(file);
                fileList.delete(file);
                updateSubmit();
            }, () => {toast(`${file.name} failed to upload`)} );
        })
    };

    function handleRemoveFile(file: File) {
        console.log(`removing ${file.name}`);
        console.log(fileList.delete(file));
        updateSubmit();
    };
    
    return (
            <Section.SectionBackground>
                <ToastContainer/>
                <Section.SectionContent style={{padding: '40px 80px', border: '1px solid black', borderRadius: '3px', height: 'fit-content'}}>
                    <Header4 style={{color: Colors.TEXT.grey}}>Please select a file to upload</Header4>
                    <Box sx={{ mt: 1, display: 'flex' }}> {/* put the buttons in a row*/}
                        <Button variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: Colors.BLUE}} onClick={handleBrowse}>
                            Browse Files
                        </Button>
                        <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 3 }} style={{ backgroundColor: submitColor }} onClick={handleSubmit}>
                            Submit
                            <Upload sx={{paddingLeft: 1}}/>
                        </Button>
                        <input multiple ref={inputRef} type='file' hidden onChange={handleFileSelect}/>  
                    </Box>
                    <Divider sx={{width: '100%', margin: '15px 0', borderColor: 'black'}}/>
                    <Box sx={{display: 'flex', flexDirection: 'column',width: '100%', height: 'fit-content'}}>
                        {Array.from(fileList).map((item) => ( 
                            <Box key={item.name} sx={{display: 'flex', flexDirection: 'column'}}>
                                <Section.DivFlexRow >
                                <FileDisplay.FileRemoveButton onClick={() => handleRemoveFile(item)}/>
                                    <FilePresent/>
                                    <FileDisplay.StyledFile> {item.name} </FileDisplay.StyledFile>
                                    <FileDisplay.SizeDisplay> {item.size} MB</FileDisplay.SizeDisplay>
                                </Section.DivFlexRow>
                                <Divider sx={{width: '100%', margin: '10px 0'}}/>
                            </Box>
                        ))}
                        {Array.from(uploadedFilesList).map((item) => ( 
                           <Box key={item.name} sx={{display: 'flex', flexDirection: 'column'}}>
                                <Section.DivFlexRow>
                                    <FilePresent/>
                                    <FileDisplay.StyledFile> {item.name} </FileDisplay.StyledFile>
                                    <FileDisplay.SizeDisplay> {item.size} MB</FileDisplay.SizeDisplay>
                                    <FileDisplay.StyledCheck style={{marginLeft: 'auto',}}/>
                                </Section.DivFlexRow>
                                <Divider sx={{width: '100%', margin: '10px 0'}}/>
                                </Box>
                        ))}
                    </Box>

                </Section.SectionContent>
            </Section.SectionBackground>

    )
};

export default FileSelector;

