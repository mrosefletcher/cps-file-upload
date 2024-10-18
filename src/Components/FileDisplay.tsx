import {Check, Clear} from '@mui/icons-material';
import styled from '@emotion/styled';
import React, {FC} from 'react';

type FileDisplayProps = {
    className: string,
    filename: string,
    check: boolean
}

const FileBase: FC<FileDisplayProps> = ({className, filename, check}) => {
    return <div className={className}>{filename}{check? <StyledCheck/>: <StyledX/>}</div>
}

export const StyledFile = styled(FileBase)({
    fontSize: '25px',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    padding: '10px',
})

export const StyledX = styled(Clear)({
    color: 'red', 
    verticalAlign: 'middle',
    alignSelf: 'right'
});

export const StyledCheck = styled(Check)({
    color: 'green', 
    verticalAlign: 'middle',
    alignSelf: 'right'
});