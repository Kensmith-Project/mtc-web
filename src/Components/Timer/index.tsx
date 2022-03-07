import React from 'react';

export interface TimerProps{
    startCount?: number;
    onZero?: ()=> any;
}

const Timer: React.FC<TimerProps> = ({ startCount, onZero })=>{

    const timeRef = React.createRef<HTMLParagraphElement>();
    let initCount = startCount || 40;
    const countRef = React.useRef(initCount * 1000);
    let interval: NodeJS.Timeout | null = null;

    // State
    const [zeroReached, setZeroreached] = React.useState<boolean>(false);

    // Instantiate innerText of p element
    if (timeRef.current) {
        timeRef.current.innerText = (countRef.current).toString()
    }

    // Offset calculator
    const calculateOffset = ()=>{
        if (countRef.current === 0) {
            return 0;
        }
        countRef.current -= 100;
        return countRef.current;
    }

    // Format the time display
    const formatTime = (milliseconds: number)=>{
        let seconds = (milliseconds/1000).toFixed(1);
        //let centisecond = Math.floor(milliseconds/100) - 
        let secondsString = seconds.toString();
        return `${secondsString.length === 3 ? '0' : ''}${seconds}`
    }

    // Time updating function
    const update = ()=> {
        let tempCount = calculateOffset();
        if (timeRef && timeRef.current) {
            timeRef.current.innerText = formatTime(tempCount);
        }
        if (tempCount === 0) {
            onZero && onZero();
            interval && clearInterval(interval);
            return;
        }
    }

    React.useEffect(() => {
        interval = setInterval(update, 100);
        return ()=> { interval && clearInterval(interval); }
    },[]);
    
    return(
        <p ref={timeRef}></p>
    )
}

export default React.memo(Timer);