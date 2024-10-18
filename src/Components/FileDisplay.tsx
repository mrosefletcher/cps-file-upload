import React, {FC} from 'react';
import {Check, Clear} from '@mui/icons-material';
import styled from '@emotion/styled';

interface FileDisplayProps {
    filename: string;
    className: string;
  }


const FileBaseCheck: FC<FileDisplayProps> = ({ filename, className }) => (
    <div className={className}>{filename} <Check sx={{color: 'green', verticalAlign: 'middle'}}/> </div>
  )

  const FileBaseEx: FC<FileDisplayProps> = ({ filename, className }) => (
    <div className={className}>{filename} <Clear sx={{color: 'red', verticalAlign: 'middle'}}/> </div>
  )
  
export const FileToUpload = styled(FileBaseEx)({
    fontSize: '25px',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    width:'fit-content'
})

export const FileUploaded = styled(FileBaseCheck)({
    fontSize: '25px',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    width:'fit-content'
})