import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import styles from './customTextArea.module.css';

export interface CustomTextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
    errorMessage?: string;
    error?: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ 
    errorMessage = 'This field is required', id,
    error = false,
    children, 
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
        <motion.div animate={animation} className={styles.inputArea}>
            <textarea {...props}>
                { children }
            </textarea>
            {isError && <label htmlFor={id}>{errorMessage}</label>}
        </motion.div>
    )
}

export default CustomTextArea;