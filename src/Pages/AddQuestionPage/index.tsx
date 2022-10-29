import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Redirect, useHistory, useLocation } from 'react-router';
import React from 'react';
import ArithmeticKeyPad from '../../Components/ArithmeticKeyPad';
import CategoryDropdown from '../../Components/CategoryDropdown';
import Layout from '../../Components/Layout';
import LoadingScreen from '../../Components/LoadingScreen';
import MathAnswerDisplay from '../../Components/MathAnswerDisplay';
import MathQuestionDisplay from '../../Components/MathQuestionDisplay';
import ToastContext from '../../Contexts/ToastContext';
import { SchoolLevel } from '../../types/SchoolLevel';
import { isEmpty } from '../../utils/formUtils';
import { mathjaxToText } from '../../utils/mathjaxUtils';
import { useCategories, useQuestions } from '../../Services/question';
import { Challenge } from '../../types/Challenge';
import QuestionUploadDialog from '../../Components/Dialogs/QuestionUploadDialog';
import styles from './addQuestion.module.css';
import useQuery from '../../hooks/useQuery';

const AddQuestionPage: React.FC<any> = ()=>{

    // Context
    const { openError } = React.useContext(ToastContext);

    // Hooks
    const history = useHistory();
    const query = useQuery();
    const location = useLocation<{level: SchoolLevel}>();
    let level = query.get('level') as any;
    const { data: categories, isLoading, isError } = useCategories(level);

    // State
    const [open, setOpen] = React.useState(false);
    const [clear, setClear] = React.useState(false);
    const [question, setQuestion] = React.useState<any>('');
    const [answer, setAnswer] = React.useState<any>('');
    const [category, setCategory] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);


    
    // Link and Handlers
    const handleQuestionChange = (value: string)=>{
        setClear(false);
        setQuestion(value);
    }
    const handleAnswerChange = (value: string)=>{
        setClear(false);
        setAnswer(value);
    }
    const handleCategoryChange = (value: string)=>{
        setClear(false);
        setCategory(value);
    }
   
    const handleClose = ()=>{
        history.goBack()
    }
    const handleDialogOpen = () =>{
        setOpen(true);
    }
    const handleDialogClose = ()=>{
        setOpen(false);
    }

    const clearForm = ()=>{
        setClear(true);
        setQuestion('');
        setAnswer('');
        setCategory('');
    }

    const handleSave = ()=>{

        // Verify inputs
        if (isEmpty(category)) {
            openError('Please select a challenge');
            return;
        }

        if (isEmpty(question) || isEmpty(answer)) {
            openError('Please fill in a question and an asnwer');
            return;
        }

        let cat: Challenge = {
            name: category || '', 
            level: location.state.level,
        };

        let q =  mathjaxToText(question);
        // let request: IQuestionAddRequest = {
        //     category: cat,
        //     question: q,
        //     answer: answer,
        //     level: location.state.level,
        //     type: format
        // }
        // console.log(request);
        // setLoading(true);
       
    }

    // Effect for fetching questions
    React.useEffect(()=>{
        if (isLoading) {
            setLoading(true);
        }
        else{
            setLoading(false);
        }

        if (isError) {
            setLoading(false);
            openError("Could not fetch the challenges")
        }
    }, [isLoading, isError]);

    if (!level) {
        return <Redirect to="/notfound"/>
    }

    return(
        <Layout>
            {loading && <LoadingScreen/>}
             <QuestionUploadDialog
                open= {open} onClose={handleDialogClose}
                level={level}
            />
        <div className={styles.page}>
            {/** Previous button */}
            <div>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: 'white',
                    }}
                >
                    <KeyboardArrowLeft sx={{color: 'white'}}/>
                    Questions
                </Button>
            </div>

            {/** Main */}
            <div  className={styles.main}>

                {/** Title and Button */}
                <div className={styles.titleArea}>
                    <h2> Add Question</h2>

                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'green',
                                marginRight: '10px',
                                '&:hover':{
                                    backgroundColor: 'rgba(0, 128, 0, 0.7)'
                                }
                            }}
                            onClick={handleDialogOpen}
                        >
                            Upload Questions
                        </Button>
                        <Button
                            variant="contained"
                            color='primary'
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </div>

                {/** Input Layout */}
                <div>
                    {/** Category */}
                    <div className={styles.category}>
                        <CategoryDropdown categories={categories} onChange={handleCategoryChange}
                        clear={clear}
                        />
                    </div>

                    {/** Question and Keypad */}
                    <Grid container spacing={3}>
                        <Grid item sm={8} md={9}>
                            <MathQuestionDisplay 
                                onChange={handleQuestionChange} 
                                clear={clear}
                            />
                        </Grid>
                        <Grid item sm={4} md={3}>
                            <ArithmeticKeyPad/>
                        </Grid>
                    </Grid>

                    {/** Arithmetic Input */}
                    <div className={styles.answer}>
                    <Grid container spacing={3}>
                        <Grid item sm={8} md={9}>
                            <MathAnswerDisplay onChange={handleAnswerChange} clear={clear}/>
                        </Grid>
                    </Grid>
                    </div>
                </div>

            </div>
        </div>
        </Layout>
    )
}

export default AddQuestionPage;