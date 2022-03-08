import React from 'react';
import Layout from '../../Components/Layout';
import styles from './performanceReview.module.css';
import logo from '../../assets/mtc logo.png';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import defaultPic from '../../assets/avatar.png';
import { roundUp } from '../../utils/mathUtils';
import { ScoreResponse } from '../../types/response';

const PerformancePage: React.FC<any> = ()=>{

    // Timer start
    const startCount = 60;

    // Hooks
    const history = useHistory();

    // State
    const [scoreInfo, setScoreInfo] = React.useState<ScoreResponse>();

    // Re-route effect
    React.useEffect(()=>{
        let scoreBreakdown = localStorage.getItem('scoreInfo');
        if (scoreBreakdown === null) {
            history.replace('/');
        }
        else{
            setScoreInfo(JSON.parse(scoreBreakdown));
        }
    },[]);

    // Handlers
    const continueGame = ()=>{
        history.push('/');
    }


    // Metrics
    let qPerSecond = (scoreInfo?.questionsAnswered || 0)/(startCount || 0);
    let answeredCorrect = scoreInfo?.answeredCorrect || 0;
    let questionsAnswered = scoreInfo?.questionsAnswered || 0;

    // Elements
    const mtclogo = (
        <div className={styles.logo}>
            <div className={styles.title}>
                <h4>Performance Summary</h4>
            </div>
            <img src={logo} alt="MTC logo" />
        </div>
    );
    
    const statsDisplay = (
        <div className={styles.statDisplay}>
            <div className={styles.stat}>
                <p>{`${scoreInfo?.questionsAnswered} \n`}</p>
                <p>Questions in {startCount}s</p>
                <hr />
            </div>
            <div className={styles.stat}>
                <p>{`${roundUp(qPerSecond)} \n`}</p>
                <p>Questions per second</p>
                <hr />
            </div>
            <div className={styles.stat}>
                <p>{`${scoreInfo?.answeredCorrect} \n`}</p>
                <p>Correct Answers</p>
                <hr />
            </div>
            <div className={styles.stat}>
                <p>{`${scoreInfo?.answeredWrong} \n`}</p>
                <p>Incorrect Answers</p>
                <hr />
            </div>
            <div className={styles.stat}>
                <p>{`${((answeredCorrect/questionsAnswered) * 100).toFixed(0)}% \n`}</p>
                <p>Accuracy</p>
                <hr />
            </div>
            <div className={styles.stat}>
                <p>{`${scoreInfo?.score} \n`}</p>
                <p>Score</p>
            </div>
            {/* <div className={styles.stat}>
                <p>{`200 \n`}</p>
                <p>Questions/ Min</p>
            </div> */}
        </div>
    );

    return(
        <Layout>
            <div className={`${styles.main}`}>
                {/** Logo */}
                <div className={styles.logoArea}>
                    {mtclogo}
                </div>

                {/** Stats Display */}
                { statsDisplay }
            </div>

            {/** Buttons */}
            <div className={styles.btnDisplay}>      
                <Button variant='outlined'
                    onClick={continueGame}
                    sx={{
                        borderColor: '#914DF3',
                        color: 'white', padding: '10px 60px',
                        margin: '0 5%',
                        '&:hover':{
                            borderColor: '#914DF3',
                            backgroundColor: '#914DF3'
                        }
                    }}
                >
                    Continue
                </Button>       
            </div>
        </Layout>
    )
}

export default PerformancePage;