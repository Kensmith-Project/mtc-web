import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import styles from './gameScreen.module.css';
import defaultPic from '../../assets/avatar.png';
import { motion, TargetAndTransition, useAnimation } from "framer-motion";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ReactSpeedometer from "react-d3-speedometer";
import TimeUpDialog from '../../Components/Dialogs/TimeUpDialog';
import { ScoreResponse } from '../../types/response';
import Timer from '../../Components/Timer';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { QuestionField } from '../../types/response';
import { isEmpty } from '../../utils/formUtils';

const GamePage: React.FC<any> = ()=>{
    
    // Timer start
    const startCount = 60;

    // Refs
    const scoreRef = React.useRef(0);
    const questionsAnswered = React.useRef(0);
    const answeredCorrect = React.useRef(0);
    const keyPressed = React.useRef<'right'|'wrong'>()
    const countRef = React.useRef(0);


    // Hooks
    const history = useHistory();
    const rightControls = useAnimation();
    const countControls = useAnimation();
    const controls = useAnimation();

    // State
    const [background, setBackground] = React.useState<string>("#00EB96");
    const [metricValue, setMetric] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false);
    const [qIndex, setQIndex] = React.useState<number>(0);
    const [questions, setQuestions] = React.useState<QuestionField[]>([]);
    const [correct, setCorrect] = React.useState<boolean>(false);
    const [skipCount, setSkipCount] = React.useState<number>(0);
    const [stopMeter, setStopMeter] = React.useState<boolean>(false);
    const [answer, setAnswer] = React.useState<string>('');

    // Re-route effect
    React.useEffect(()=>{
        let unParsedQuestions = localStorage.getItem('mtc_questions');
        if (unParsedQuestions === null) {
            history.replace('/');
        }
        else{
            setQuestions(JSON.parse(unParsedQuestions));
        }
    },[]);


    // Memoizee value
    const maxTime = React.useMemo(()=>{
        return startCount;
    }, [])

    // Animations
    let tickFlash = React.useRef<TargetAndTransition>({
        opacity: [1, 0],
        transition:{
            duration: 0.5
        }
    })
    let countdownIndicator: TargetAndTransition = {
        width: '0%',
        transition: { duration: startCount, ease: 'linear' }
    }
    // Animations and Refs
    let animateCorrect = React.useRef<TargetAndTransition>({
        backgroundColor:['#4D72F3', '#00EB96', '#4D72F3'],
        transition:{
            duration: 0.3
        }
    })
    let animateWrong = React.useRef<TargetAndTransition>({
        backgroundColor:['#4D72F3', '#CE3427', '#4D72F3'],
        transition:{
            duration: 0.3
        }
    });

    // Offset calculator
    const calculateOffset = ()=>{
        countRef.current += 1;
    }

    // Handlers
    const handleClose = ()=>{
        history.goBack()
    }
    const handleNext = ()=>{
        history.push('/game/review');
    }
    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAnswer(e.target.value);
    }
    const handleOnZero = ()=>{
        setStopMeter(true);
        console.log(scoreRef.current);
        let response: ScoreResponse = {
            questionsAnswered: questionsAnswered.current,
            score: scoreRef.current,
            answeredCorrect: answeredCorrect.current,
            answeredWrong: questionsAnswered.current - answeredCorrect.current,
            seconds: startCount,
        }
        localStorage.setItem('scoreInfo', JSON.stringify(response));
        setOpen(true);
    }
    const handleDialogClose = ()=>{
        setOpen(false);
    }
    const flashRight = ()=>{
        controls.start(animateCorrect.current);
        rightControls.start(tickFlash.current);
        setCorrect(true);
    }
    const flashWrong = ()=>{
        controls.start(animateWrong.current);
        rightControls.start(tickFlash.current);
        setCorrect(false);
    }
    const nextQuestion = ()=>{
        setQIndex((prevIndex)=>{
            if (questions) {
                if (prevIndex === (questions.length - 1)) {
                    return prevIndex
                }
            }

            return prevIndex + 1;
        })
    }
    const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (isEmpty(answer)) {
            return;
        }
        if (answer === questions[qIndex].answer.toString()) {
            questionsAnswered.current += 1;
            answeredCorrect.current += 1;
            scoreRef.current += (10);
            flashRight();
            let qPerSecond = answeredCorrect.current/countRef.current;
            setMetric(qPerSecond);
            //setMetric((prevMetric)=>(prevMetric + 2));
            setAnswer('');
            nextQuestion();
        }
        else{
            questionsAnswered.current += 1;
            scoreRef.current -= (0);
            setBackground("#CE3427");
            flashWrong();
            // setMetric((prevMetric)=>{
            //     if (prevMetric === 0) {
            //         return prevMetric
            //     }
            //     else{
            //         return prevMetric -1
            //     }
            // });
            let qPerSecond = answeredCorrect.current/countRef.current;
            setMetric(qPerSecond);
            setAnswer('');
            nextQuestion();
        }
    }

    // Effect
    React.useEffect(()=>{
        countControls.start(countdownIndicator);
    },[]);
    React.useEffect(()=>{
        let countInterval = setInterval(()=>{
            calculateOffset();
        }, 1000);

        return ()=> clearInterval(countInterval);
    },[])
    React.useEffect(()=>{
        let metricInterval = setInterval(()=>{
            // setMetric((prevMetric)=>{
            //     if (prevMetric === 0) {
            //         return prevMetric
            //     }
            //     else{
            //         return prevMetric -1
            //     }
            // });
            let qPerSecond = answeredCorrect.current/countRef.current;
            setMetric(qPerSecond);
        }, 1000);

        if (stopMeter) {
            clearInterval(metricInterval);
            setMetric(0);
        }

        return ()=> clearInterval(metricInterval)
    },[stopMeter]);

    const memoizedOnZero = React.useCallback(handleOnZero, []);

    // Configs and Defaults
    const config = {
        loader: { load: ["[tex]/html", "output/chtml"] },
        tex: {
            packages: { "[+]": ["html"] },
            inlineMath: [["$", "$"]],
            displayMath: [["$$", "$$"]]
        }
    };
    
    // Elements
    const timerIndicator = (
        <div className={styles.indicator}>
            <motion.div className={styles.indicatorStrip}
                initial={{ width: '100%' }}
                animate={countControls}
            >
            </motion.div>
        </div>
    )

    const playerInfo = (
        <div className={styles.infoArea}>
            {/* <Card sx={{ borderRadius: '8px' }}>
                <CardMedia
                    component="img"
                    alt="player image"
                    height="160"
                    image={player && player.image ? `file:///${player?.image}` : defaultPic}
                />
                <CardContent sx={{ 
                    backgroundColor: "#2EDB54", padding: '0 !important'
                    }}>
                    <div className={styles.cardMeta} >
                        <h3>{player?.name}</h3>
                        <p>Grade {player?.grade}</p>
                    </div>
                </CardContent>
            </Card> */}

            {/** Score card */}
            <div className={styles.scoreCard}>
                <h4>CURRENT SCORE</h4>
                <div className={styles.score}>{scoreRef.current}</div>
            </div>

            {/** Performance metric */}
            <div className={styles.scoreCard}>
                <h4>LIVE PERFORMANCE METRIC</h4>
                <ReactSpeedometer
                    maxValue={2}
                    value={metricValue}
                    needleColor="red"
                    //segments={3}
                    customSegmentStops={[0, 0.5, 1, 1.5, 2]}
                    fluidWidth
                    height={200}
                    ringWidth={25}
                    valueTextFontSize={'0px'}
                    segmentColors={[
                        "#C40700",
                        "#f6ff00",
                        "#adf0ad",
                        "#4bc400",
                    ]}
                />
            </div>
        </div>
    )

    const gameDisplay = (
        <div className={styles.gameDisplay}>

            {/** Blackboard Game */}
            <div className={styles.blackboard}>
                <div className={styles.mathDisplay}>
                    <p>{((questions && questions.length > 0) && questions[qIndex].question)}</p>
                </div>
                <form onSubmit={handleAnswerSubmit} className={styles.answer}>
                    <span>Ans =</span>
                    <input type="text" value={answer} onChange={handleAnswerChange}/>
                </form>
            </div>

            {/** Round Label */}
            <motion.div className={styles.roundLabel} animate={controls}
                //style={{ backgroundColor: background }}
            >
                <h4>{'Round 1'}</h4>
            </motion.div>

            {/** Answer Input */}
            <div>
               
            </div>

        </div>
    )

    const timerAndCategory = (
        <div className={styles.timerLeaderboard}>
            {/** Timer */}
            <div className={styles.timer}>
                <div className={styles.timerHeader}>
                    <h4>Timer</h4>
                    { timerIndicator }
                </div>
                <Timer startCount={maxTime} onZero={memoizedOnZero}/>
            </div>

            {/** Category */}
            {/* <div className={styles.category}>
                <div className={styles.timerHeader}>
                    <h4>Category</h4>
                </div>
                <div className={styles.categoryText}>
                    <p>{ category?.name }</p>
                </div>
            </div> */}

            {/** Answer Indicator  */}
            <div className={styles.answerIndicator}>
                <motion.div initial={{ opacity: 0 }} animate={rightControls}>
                    {
                        correct ?  
                        <CheckCircleOutlineSharpIcon
                            sx={{
                                color: '#00EB96',
                                fontSize: '180px',
                                textAlign: 'center'
                            }}
                        /> : 
                        <CancelOutlinedIcon
                            sx={{
                                color: '#CE3427',
                                fontSize: '180px',
                                textAlign: 'center'
                            }}
                        />
                    }
                </motion.div>
            </div>
        </div>
    )

    return(
        <>
       <div className={styles.container}>
            {/** Time Up Dialog */}
            <TimeUpDialog open={open} onClose={handleDialogClose} disableClose
                onNext={handleNext}
            />

            <div className={`${styles.main}`}>

                {/** Player Info */}
                { playerInfo }

                {/** Game Display */}
                { gameDisplay }

                {/** Timer and Leaderboard */}
                { timerAndCategory }

            </div>
       </div>
       </>
    )
}

export default GamePage;