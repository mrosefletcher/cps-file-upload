'use client';

import React, { FC } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { useRef, useState } from 'react';
import { Upload } from '@mui/icons-material';

const USERNAME: string = "CPSUser1";

const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [theActualFile, setFile] = useState<File | null>(null);
    const [filename, SetFilename] = useState("");

    function handleBrowse(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
            inputRef.current.click();
        };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        try{
            UploadToS3(theActualFile, USERNAME);
        }catch (e){
            console.log("in handleSubmit:");
            console.log(e);
        }
    };

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        
        const file = files[0];
        SetFilename(file.name);
        setFile(file);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 20,display: "flex", flexDirection: "column", alignItems: "center", }}>
                <Typography variant="h5">Select file to upload</Typography>
                <Box sx={{ mt: 1, display: 'flex', }}>
                    <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleBrowse}>
                        Browse Files
                    </Button>
                    <TextField
                        margin="none"
                        id="inputRef"
                        value={filename}
                        autoFocus
                    /> 
                    <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                        Submit
                        <Upload sx={{paddingLeft: 3}}/>
                    </Button>
                    <input ref={inputRef} type='file' hidden onChange={handleFileUpload} />
                </Box>
            </Box>
        </Container>
    )
};

export default FileSelector;

