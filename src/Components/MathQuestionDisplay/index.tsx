import Card from '@mui/material/Card';
import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from './mathdisplay.module.css';
import CardContent from '@mui/material/CardContent';

export interface MathQuestionDisplayProps{
    onChange?: (value: string) => any;
    val?: string;
    clear?: boolean;
}

const MathQuestionDisplay: React.FC<MathQuestionDisplayProps> = ({ onChange, val = '', clear })=>{

    // State
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
        document.addEventListener('arithmetic:click', (event: CustomEventInit)=>{
            textAreaRef.current?.focus();
            setInputVaue(inputValue + event.detail.value);
            onChange && onChange(inputValue + event.detail.value);
            
        })
    }
    const unsubscribe = ()=>{
        document.removeEventListener('arithmetic:click', (event: CustomEventInit)=>{
            setInputVaue(inputValue + event.detail.value);
            onChange && onChange(inputValue + event.detail.value);
        })
    }

    // Use Effect
    React.useEffect(()=>{
        subscribe();

        // When Input value changes set question accordingly
        inputValue?.length === 0 ? setQuestion(inputValue) : setQuestion("$$" + inputValue + "$$");

        return unsubscribe();
    },[inputValue])

    React.useEffect(()=>{
        if (clear) {
            setInputVaue('');
        }
    },[clear])

    // Math Context config
    const config = {
        loader: { load: ["[tex]/html", "output/chtml"] },
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
                    <label htmlFor="mathInput"> Question</label>
                    <textarea
                        value={inputValue} 
                        name="mathInput"
                        id="mathInput" rows={3} onChange={handleChange} placeholder="Type equation"
                        ref={textAreaRef}
                    >
                    </textarea>
                </div>

                {/** Display */}
                <div>
                    <MathJaxContext config={config} version={3}
                    >
                        <div className={styles.mathDisplay}>
                           <MathJax dynamic>
                               <p>{question}</p>
                           </MathJax>
                        </div>
                    </MathJaxContext>
                </div>
            </CardContent>
        </Card>
    )
}

export default MathQuestionDisplay;