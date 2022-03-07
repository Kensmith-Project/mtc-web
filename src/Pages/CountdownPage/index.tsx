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
    const location = useLocation();

    // Data Fetching
    const { data, isError } = useQuestions();
    const categoriesFetch = useCategories();
    

    // Effect
    React.useEffect(()=>{
        if (data && categoriesFetch.data) {
            let level = location.pathname.replace('/', '');
            let category = categoriesFetch.data?.find((c)=> c.slug === level);
            let questions: QuestionsResponse[] | undefined = [];
            if (category) {
                let cat = category
                questions = data?.filter((q)=> q.categories.includes(cat.id));
                let questionFields = questions.map((q)=> q.acf);
                console.log(questionFields) 
                localStorage.setItem('mtc_questions', JSON.stringify(questionFields));
            }
        }
        if (isError || categoriesFetch.isError) {
            openError('An error occurred while setting up the quiz')
        }
    },[data, categoriesFetch.data])


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
                disabled={localStorage.getItem('mtc_questions') === null}
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