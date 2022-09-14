import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { withStyles } from '@mui/styles';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styles from './questionSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Challenge } from '../../types/Challenge';
import { Question } from '../../types/Question';
import { send } from 'process';
import BaseTable, { EditButton } from '../../Components/BaseTable';
import Layout from '../../Components/Layout';
import LoadingScreen from '../../Components/LoadingScreen';
import MyStatusBar from '../../Components/MyStatusBar';
import { SchoolLevel } from '../../types/SchoolLevel';
import { useCategories, useQuestions } from '../../Services/question';
import mapQuestionToRows from '../../utils/mapQuestionToRows';
import LoadingContext from '../../Contexts/LoadingContext';
import ToastContext from '../../Contexts/ToastContext';
import QuestionEditDialog from '../../Components/Dialogs/QuestionEditDialog';



const QuestionSettings: React.FC<any> = ()=>{

    // Hooks
    const history = useHistory();
    const categoriesFetch = useCategories()
    const { data, isLoading, isError } = useQuestions();

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openError } = React.useContext(ToastContext);
   

    // State
    const [level, setLevel] = React.useState<SchoolLevel>();
    const [rows, setRows] = React.useState<any[]>([]);
    const [resetRows, setResetRows] = React.useState<any[]>();
    const [categoryOptions, setCategoryOptions] = React.useState<Challenge[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [questionToEdit, setQuestionToEdit] = React.useState<Question>();


    // Links and Handlers
    const handleDialogClose = ()=>{
        setOpen(false);
    }
    const handleOnSearchChange = (value: string)=>{
        let newRows = resetRows?.filter((row)=> row.question.toLowerCase().includes(value));
        setRows(newRows || []);
    }
    const handleDelete = (selectedRows: any[])=>{
        // setLoading(true);
        // // let newRows = rows.filter((row)=> !(selectedRows.includes(row.id)));
        // // let newFilteredRows = resetRows?.filter((row)=> !(selectedRows.includes(row.id)));
        // // setRows(newRows);
        // // setResetRows(newFilteredRows);
        // dispatch(resetStatus());
        // dispatch(send('question-delete', selectedRows));
    }
    const gotoAddQuestion = ()=>{
        history.push({
            pathname: "/settings/questions/add",
            state:{ level: level }
        });
    }
    const handleClose = ()=>{
        history.goBack()
    }
    const handleHighCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('high');
        }   
    }
    const handleSecondaryCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('secondary');
        }   
    }
    const handleElementaryCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('elementary');
        }   
    }
    
    
    // Effect for fetching questions
    React.useEffect(()=>{
        if (isLoading || categoriesFetch.isLoading) {
            setLoading(true);
        }
        else{
            setLoading(false);
        }

        if (isError || categoriesFetch.isError) {
            setLoading(false);
            openError("Could not fetch the challenges")
        }

        if (data && level) {
            console.log(level);
            let newRows = data.filter((item)=>{
                if (item.level === level) {
                    return item;
                }
            })
            let mappedRows =  mapQuestionToRows(newRows);
            setRows(mappedRows);
            setResetRows(mappedRows);
        }

        if (categoriesFetch?.data) {
            let newCategories = categoriesFetch.data.filter((item)=>{
                if (item.level === level) {
                    return item;
                }
            })
            setCategoryOptions(newCategories);
        }

    }, [data, level, categoriesFetch.data, isLoading, categoriesFetch.isLoading, isError, categoriesFetch.isError])

    // Status messages
    //let successMessage = `${deleteCount} question(s) successfully deleted`;
    let errorMessage = 'An error occurred while deleting question(s)';

    //  Edit cell render function
    const renderEditCell = (params: GridRenderCellParams<any, any, any>)=>{
        const { row } = params;
        
        return(
            EditButton(params, (row: any)=>{
                const q = data?.find((item)=> item.id === row.id);
                setQuestionToEdit(q);
                setOpen(true);
            })
        )
    }

    // Columns
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'question', headerName: 'Question', flex: 2,},
        { field: 'answer', headerName: 'Answer', flex: 1,},
        { field: 'category', headerName: 'Category', flex: 1},
        { 
            field: 'edit', headerName: 'Action', 
            renderCell: renderEditCell, 
            headerAlign: 'center',
            align: 'center',
        }
    ];
    // Radion control
    const CssRadio = withStyles({
        root: {
            color: '#FFFFFF',
            '&$checked': {
                color: 'white',
              },
        },
        checked: {}
    })(Radio)

    return(
        <Layout>

            {/** Edit Dialog */}
            <QuestionEditDialog onClose={handleDialogClose} open={open}
                question={questionToEdit} categories={categoryOptions}
            />

            <div className={`${styles.container}`}>
                {/** Radio Select for Level */}
                <FormControl component="fieldset"
                    sx={{
                        marginBottom: '-25px',
                        color: 'white',
                    }}
                >
                    <FormLabel component="legend" sx={{ 
                        color: 'white',
                        "&.Mui-focused": {
                            color: "white"
                        } 
                        }}>Choose Level</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="elementary" control={<CssRadio/>} 
                            label="Elementary School"
                            onChange={handleElementaryCheck}
                        />
                        <FormControlLabel value="secondary" control={<CssRadio/>} 
                            label="Middle School"
                            onChange={handleSecondaryCheck} 
                        />
                        {<FormControlLabel value="high" control={<CssRadio/>} 
                            label="High School"
                            onChange={handleHighCheck} 
                        />}
                    </RadioGroup>
                </FormControl>
                <div className={styles.buttonGroup}>
                    <Button
                        onClick={handleClose}
                        variant='contained'
                        sx={{
                            color: 'white'
                        }}
                    >
                        Go Back
                    </Button>
                    {level && <Button
                        onClick={gotoAddQuestion}
                        variant='contained'
                        sx={{
                            backgroundColor: '#E3EBFF',
                            color: 'black'
                        }}
                    >
                        Add Question
                    </Button>}
                </div>
                {level && <BaseTable
                    dataColumns={columns}
                    dataRows={rows}
                    title="Questions"
                    searchPlaceholder="Search question"
                    onSearchChange={handleOnSearchChange}
                    onDelete={handleDelete}
                    deleteMessage={'Deleting a category also deletes all the questions associated with it. Are you sure you want to delete?'}
                    //backgroundColor="rgb(255,255,255, 0.9)"
                />}
            </div>
        </Layout>
    )
}

export default QuestionSettings;