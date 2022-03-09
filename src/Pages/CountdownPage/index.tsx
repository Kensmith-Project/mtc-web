import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import styles from './countdown.module.css';
import { Button, InputBase, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Countdown from '../../Components/Countdown';
import girlLogo from '../../assets/girl.svg';
import { useCategories, useQuestions } from '../../Services/question';
import { QuestionsResponse } from '../../types/response';
import ToastContext from '../../Contexts/ToastContext';


const CountdownPage: React.FC<any> = ()=>{

    // Context
    const { openError } = React.useContext(ToastContext)

    // Hooks
    const history = useHistory();


    // State
    const [begin, setBegin] = React.useState<boolean>(false);

    const handleClose = ()=>{
        history.goBack();
    }
    const startGame = ()=>{
        setBegin(true);
    }
    const onZeroCallback = ()=>{
        history.push('/game');
    }


    return(
        <div className={styles.container}>
            
            {/** Previous button */}
            <div className={styles.backButton}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: 'white',
                    }}
                >
                    <KeyboardArrowLeft sx={{color: 'white'}}/>
                    Back
                </Button>
            </div>

            {/** Ready Text */}
            <div className={styles.title}>
                <h1>Ready</h1>
                <img src={girlLogo} alt="" />
            </div>

            {/** Count Display */}
            <Countdown begin={begin} onZeroCallback={onZeroCallback} />
         
             {/** Button */}
             <Button
                disabled={localStorage.getItem('mtc_questions') === null || begin}
                onClick={startGame}
                variant='contained'
                sx={{
                    backgroundColor: '#2660F6',
                    width: '40%',
                    color: 'white',
                    padding: '10px 0px',
                    fontFamily: 'Rubik',
                    marginTop: 10,
                }}
            >
                Start Game
            </Button>
        </div>
    )
}

export default CountdownPage;