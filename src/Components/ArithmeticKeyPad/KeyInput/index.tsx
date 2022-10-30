import IconButton from '@mui/material/IconButton';
import React from 'react';

export interface KeyInputProps{
    symbol?: React.ReactNode;
    value: any;
    variant?: 'question' | 'answer';
    'aria-label'?: string;
}


const KeyInput: React.FC<KeyInputProps> = ({
    symbol = "?",
    value,
    variant,
    ...props
})=>{

    let buttonRef = React.useRef<HTMLButtonElement>(null);

    let triggerEvent = variant === 'question' ? 'arithmetic:click' : 'answer:click';

    // Custom Event to show button was clicked
    const triggerClick = ()=>{
        const customEvent = new CustomEvent(triggerEvent, { detail: { value: value } });
        document.dispatchEvent(customEvent);
    }

    return(
        <IconButton 
            aria-label={props['aria-label']}
            onClick={triggerClick}
            ref= {buttonRef}
        >
            {symbol}
        </IconButton>
    )
}

export default KeyInput;