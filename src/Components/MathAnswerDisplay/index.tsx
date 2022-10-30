import { Card, CardContent } from '@mui/material';
import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from './mathanswer.module.css';

export interface MathAnswerDisplayProps{
    onChange?: (value: string) => any;
    val?: string;
    clear?: boolean;
}

const MathAnswerDisplay: React.FC<MathAnswerDisplayProps> = ({ onChange, val = '', clear })=>{

    const [question, setQuestion] = React.useState("$$"+ val + "$$");
    const [inputValue, setInputVaue] = React.useState(val);

    // Refs
    let textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    // Event Handlers
    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>)=>{
        let value = event.currentTarget.value;
        //value.length === 0 ? setQuestion(value) : setQuestion("$$" + value + "$$");

        setInputVaue(value);
        onChange && onChange(value);
    }

    // Event Listeners
    const subscribe = ()=>{
        document.addEventListener('answer:click', (event: CustomEventInit)=>{
            textAreaRef.current?.focus();
            setInputVaue(inputValue + event.detail.value);
        })
    }
    const unsubscribe = ()=>{
        document.removeEventListener('answer:click', (event: CustomEventInit)=>{
            setQuestion(question + event.detail.value);
        })
    }

    // Use Effect
    React.useEffect(()=>{
        //subscribe();

        // When Input value changes set question accordingly
        inputValue?.length === 0 ? setQuestion(inputValue) : setQuestion("$$" + inputValue + "$$");

        //return unsubscribe();
    },[inputValue]);

    React.useEffect(()=>{
        if (clear) {
            setInputVaue('');
        }
    },[clear])

    // Math Context config
    const config = {
        loader: { load: ["[tex]/html"] },
        tex: {
            packages: { "[+]": ["html"] },
            inlineMath: [["$", "$"]],
            displayMath: [["$$", "$$"]]
        }
    };
    return(
        <Card>
            <CardContent>
                {/** Input */}
                <div className={styles.mathInput}>
                    <label htmlFor="mathInput">Answer</label>
                    <textarea name="mathInput" id="mathInput" 
                        value={inputValue}
                        rows={1} onChange={handleChange} 
                        placeholder="Type Answer"
                        ref={textAreaRef}
                    >
                    </textarea>
                </div>
            </CardContent>
        </Card>
    )
}

export default MathAnswerDisplay;