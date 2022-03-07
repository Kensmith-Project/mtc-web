import React from 'react';
import styles from './countdown.module.css';

export interface CountdownProps{
    startCount?: number;
    begin?: boolean;
    onZeroCallback?: ()=> any;
}

const Countdown: React.FC<CountdownProps> = ({ 
    startCount = 5, begin = false, onZeroCallback
})=>{

    const [count, setCount] = React.useState<number>(startCount);
    const [isZero, setIsZero] = React.useState<boolean>(false);

    React.useEffect(()=>{

        let myInterval: NodeJS.Timeout | null = null;

        if (isZero) {
            onZeroCallback && onZeroCallback();
        }

        if (begin) {
            setIsZero(false);
            myInterval = setInterval(()=>{
                setCount((prevCount)=>{
                    if (prevCount > 0) {
                        return prevCount -1
                    }
                    else if (prevCount === 0){
                        setIsZero(true);
                        return prevCount;
                    }
                    else{
                        // setBegin(false);
                        return prevCount;
                    }
                    
                })
            }, 1000)
        }

        if (!begin) {
            myInterval && clearInterval(myInterval);
            //setCount(startCount);
            console.log('Hello');
        }

        return ()=>{
            myInterval && clearInterval(myInterval);
        }

    }, [begin, isZero, startCount])
    return(
        <div className={styles.count}>
            { count }
        </div>
    )
}

export default Countdown;