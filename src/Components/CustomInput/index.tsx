import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import styles from './customInput.module.css';

export interface CustomInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    errorMessage?: string;
    error?: boolean;
    containerClass?: string;
}

export const isEmpty = (value: string)=>{
    if (/^\s*$/.test(value)){
        return true;
    }
    if (value.length === 0){
        return true;
    }
    return false;
}

const CustomInput: React.FC<CustomInputProps> = ({ 
    errorMessage = 'This field is required', id, containerClass,
    error = false, 
    ...props 
})=>{

    // State
    const [isError, setError] = React.useState<boolean>(error);
    
    let shake: TargetAndTransition = {
        x:[0, -10, 10, 0, -10, 10, 0],
        transition:{
            duration: 0.25
        }
    }

    let animation = isError ? shake : undefined;

    
    // Effect
    React.useEffect(()=>{
        setError(error)
    }, [error]);

    return(
        <motion.div animate={animation} className={`${styles.inputArea} ${containerClass}`}>
            <input id={id} {...props} />
            {isError && <label htmlFor={id}>{errorMessage}</label>}
        </motion.div>
    )
}

export default CustomInput;