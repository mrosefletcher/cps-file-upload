import {Check, Clear} from '@mui/icons-material';
import styled from '@emotion/styled';
import React, {FC, useState, forwardRef, useRef, useImperativeHandle} from 'react';
import { Container, Box, Button, Divider } from "@mui/material";
import { ERROR, SUCCESS, GREYED } from '@/app/Theme/Colors';
import { url } from 'inspector';


export const StyledFile = styled.div({
    display: 'flex',
    fontSize: '17px',
    backgroundColor: 'white',
    padding: '0 10px ',
    width: 'fit-content'
})

export const SizeDisplay = styled.div({
    fontSize: '17px',
    padding: '0 5px',
    color: GREYED
});

export const RemoveFileIcon = styled(Clear)({
    color: ERROR, 
    height: '100%',
    width: '100%',
})


export const StyledCheck = styled(Check)({
    color: SUCCESS, 
    alignSelf: 'center',
    justifySelf: 'right'
});


interface ButtonProps {
    // children?: React.ReactNode;
    onClick: () => void;
  }
  
export const FileRemoveButton: React.FC<ButtonProps> = ({ 
    //   children,
      onClick, 
    }) => { 
    const [bg, setBg] = useState('transparent');
    return (
      <button 
        onClick={onClick}
        onMouseOver={() => setBg('lightgrey')}
        onMouseOut={() => setBg('transparent')}
        style={{
            minWidth: '5px', width: '16px', 
            minHeight: '5px', height: '16px', 
            padding:'0px', 
            alignSelf: 'flex-start',
            border: 'none',
            backgroundColor: bg,
        }}>
        <RemoveFileIcon/>
      </button>
    );
  }
  