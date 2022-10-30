import Close from '@mui/icons-material/Close';
import SpaceBar from '@mui/icons-material/SpaceBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import React from 'react';
import DivideIcon from '../../svgs/DivideIcon';
import QuestionMark from '../../svgs/QuestionMark';
import SquareRoot from '../../svgs/SquareRoot';
import UnknownBox from '../../svgs/UnknownBox';
import Xroot from '../../svgs/Xroot';
import KeyInput, { KeyInputProps } from './KeyInput';

export interface ArithmeticKeyPadProps{
    variant?: 'question' | 'answer';
}

const ArithmeticKeyPad: React.FC<ArithmeticKeyPadProps> = ({ variant = 'question' })=>{

    const buttons: KeyInputProps[] = [
        { symbol: <UnknownBox/>, value: "\\fbox{?}" },
        { symbol: <Close/>, value: "\\times" },
        { symbol: <DivideIcon/>, value: "÷ " },
        { symbol: <QuestionMark/>, value: "? " },
        { symbol: <SquareRoot/>, value: "\\sqrt{x}" },
        { symbol: <Xroot/>, value: "\\sqrt[n]{x}" },
        { symbol: <SpaceBar/>, value: "\\ " },
    ]

    return(
        <Card>
            <CardContent>
                {/** Input */}
                <div>
                    <label htmlFor="mathInput">Arithmetic Symbols</label>
                    <Grid container spacing={2} id="mathInput" >
                        {
                            buttons.map((btn, index)=>(
                                <Grid item xs={3} key={`btn${index}`}>
                                    <KeyInput {...btn} variant={variant}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>

                
            </CardContent>
        </Card>
    )
}

export default ArithmeticKeyPad;