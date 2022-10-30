import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';
import CategoryDropdown from '../../CategoryDropdown';
import Grid from '@mui/material/Grid';
import ArithmeticKeyPad from '../../ArithmeticKeyPad';
import MathAnswerDisplay from '../../MathAnswerDisplay';
import MathQuestionDisplay from '../../MathQuestionDisplay';
import styles from './questionEdit.module.css';
import { Question } from '../../../types/Question';
import { textToMathjax } from '../../../utils/mathjaxUtils';
import LoadingScreen from '../../LoadingScreen';
import MyStatusBar from '../../MyStatusBar';
import { mathjaxToText } from '../../../utils/mathjaxUtils';
import { useDispatch, useSelector } from 'react-redux';
import { Challenge } from '../../../types/Challenge';
import LoadingContext from '../../../Contexts/LoadingContext';
import { updateQuestion, useQuestions } from '../../../Services/question';
import ToastContext from '../../../Contexts/ToastContext';
import { parseError } from '../../../utils/errorUtils';

export interface QuestionEditDialogProps{
    open?: boolean;
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => any;
    question?: Question;
    categories?: Challenge[];
    // format?: QuestionType;
}

const QuestionEditDialog: React.FC<QuestionEditDialogProps> = ({
    open = false, onClose, question, categories,
})=>{

    const { mutate } = useQuestions();

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openSuccess, openError } = React.useContext(ToastContext);

    // State
    const [editedQuestion, setQuestion] = React.useState<string>();
    const [editedAnswer, setAnswer] = React.useState<string>();
    const [category, setCategory] = React.useState<string>();
    const [errOpen, setErrOpen] = React.useState<boolean>(false);
    const [successOpen, setSuccessOpen] = React.useState<boolean>(false);


    // Format the question and answers to MathJax format
    const quest = textToMathjax(question?.question || '');
    const answer = textToMathjax(question?.answer || '');

    // Handlers
    const handleQuestionChange = (value: string)=>{
        setQuestion(value);
    }
    // const handleFormatQuestionChange = (state: FactorsAndMultipleState)=>{
    //     let q = `${state.number}-${state.option1}-${state.option2}-${state.option3}-${state.option4}`;
    //     setQuestion(q);
    // }
    const handleAnswerChange = (value: string)=>{
        setAnswer(value);
    }
    const handleCategoryChange = (value: string)=>{
        setCategory(value);
    }
    const handleErrClose = ()=>{
        setErrOpen(false);
    }
    const handleSuccessClose = ()=>{
        setSuccessOpen(false);
    }
    const handleSave = async ()=>{
        setLoading(true);
        // Check if there were any changes to the inputs
        let cat = question?.category;
        if (category) {
            cat = categories?.find((item)=> item.name === category) || { name: category, level: question?.level };
        }
        let q = question?.question || '';
        if (editedQuestion) {
            // q = format === QuestionType.REGULAR ? 
            // mathjaxToText(editedQuestion) : q
            q = mathjaxToText(editedQuestion)
        }
        let request: Question = {
            id: question?.id,
            question: q,
            answer: editedAnswer || question?.answer || '',
            level: question?.level,
            category: cat,
        }
        
        const { data, error } = await updateQuestion(request);

        if (data){
            setLoading(false);
            mutate();
            openSuccess(data?.message || 'Successfully updated question');
        }

        if (error){
            setLoading(false);
            openError(parseError(error));
        }

    }

    // Status messages
    // let successMessage = `Question successfully edited`;
    // let errorMessage = 'An error occurred while editing this question';
       

    return(
        <Dialog
            maxWidth= 'lg'
            PaperProps={{
                sx:{
                    backgroundColor: 'rgba(4, 6, 73, 0.7)',
                    width: "100%"
                }
            }}
            open={open}
            onClose={onClose}
            aria-labelledby="player-edit-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ color: 'white' }} >Edit Question </DialogTitle>
            <DialogContent>
                <div>
                    {/** Category */}
                    <div className={styles.category}>
                        <CategoryDropdown categories={categories} 
                            val={question?.category?.name}
                            onChange={handleCategoryChange}
                        />
                    </div>

                    {/** Question and Keypad */}
                    <Grid container spacing={3}>
                        <Grid item sm={8} md={9}>
                                <MathQuestionDisplay 
                                onChange={handleQuestionChange} 
                                val={quest}
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
                            <MathAnswerDisplay val={answer} onChange={handleAnswerChange} />
                        </Grid>
                    </Grid>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'white' }} onClick={handleSave}>Save</Button>
                <Button sx={{ color: 'white' }} onClick={onClose}>Close</Button>
            </DialogActions>
        
        </Dialog>
    )
}

export default QuestionEditDialog;