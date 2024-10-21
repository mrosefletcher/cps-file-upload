import {Check, Clear} from '@mui/icons-material';
import styled from '@emotion/styled';
import React, {FC} from 'react';
import { ERROR, SUCCESS } from '@/app/Theme/Colors';



const EmptyFile: FC = () => {
    return <div/>;
};

export const StyledFile = styled.div({
    display: 'flex',
    fontSize: '17px',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '3px',
    padding: '0 10px ',
    width: 'fit-content',
    maxWidth: '75%',
})

export const StyledX = styled(Clear)({
    color: ERROR, 
    alignSelf: 'center'
});

export const StyledCheck = styled(Check)({
    color: SUCCESS, 
    alignSelf: 'center'

});