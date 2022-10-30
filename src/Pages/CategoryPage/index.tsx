import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Layout from '../../Components/Layout';
import styles from './category.module.css';
import logo from '../../assets/mtc logo.png';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import defaultPic from '../../assets/anne.jpeg';
import SelectIcon from '../../svgs/SelectIcon';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { useCategories, useQuestions } from '../../Services/question';
import { CategoryResponse, QuestionField, QuestionsResponse } from '../../types/response';
import ToastContext from '../../Contexts/ToastContext';
import LoadingContext from '../../Contexts/LoadingContext';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { shuffleArray } from '../../utils/shuffleUtils';
import Grid from '@mui/material/Grid';
import { breakpoints } from '../../utils/breakpoints';
import { Question } from '../../types/Question';
import { Challenge } from '../../types/Challenge';
import { SchoolLevel } from '../../types/SchoolLevel';

const ElementaryHome: React.FC<any> = ()=>{
    
    // Default props
    const options: {
        value?: string;
        label?: string;
    }[] = [
        { value: 'catergory1', label: 'Category 1'},
        { value: 'catergory2', label: 'Category 2'},
        { value: 'catergory3', label: 'Category 3'},
        { value: 'joker', label: 'Joker'},
    ];

    // Context
    const { openError } = React.useContext(ToastContext);
    const { setLoading } = React.useContext(LoadingContext);

    // Hooks
    const history = useHistory();
    const location = useLocation();
    let level = location.pathname.replace('/', '');
    const { data, isError } = useQuestions(level as SchoolLevel);
    const categoriesFetch = useCategories(level as SchoolLevel);

    // State
    const [category, setCategory] = React.useState<string>('');
    const [categoryOptions, setCategoryOptions] = React.useState<Challenge[]>([]);
    const [filteredQuestions, setFilteredQuestions] = React.useState<Question[]>([]);
    const [questionFields, setQuestionFields] = React.useState<Question[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    // Variables
    const id = open ? 'warning-popover' : undefined;

    // Handlers
    const handlePopoverClose = ()=>{
        setAnchorEl(null);
        setOpen(false);
    }
    const handleCategoryChange = (event: SelectChangeEvent)=>{
        let value = event.target.value;
        setCategory(value);

        // Filter the questions by category
        // let cat = categoriesFetch.data?.find((c)=> c.name === value);

        // if (cat) {
        //     let questions = data?.filter((q)=> q.category.name === value);
        //     //let questions = filteredQuestions?.filter((q)=> q.category.includes(tempCat.id));
        //     setQuestionFields(questions);
        // }

        let questions = filteredQuestions?.filter((q)=>{
            if (q.category && q.category.name === value){
                return q;
            }
        });
        setQuestionFields(questions || []);
    }

    // Links and handlers
    const handleClose = ()=>{
        history.goBack();
    }
    const gotoCategory = (event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
        if (questionFields.length === 0) {
            setOpen(true);
            return;
        }
        let cat = categoriesFetch.data?.find((c)=> c.name === category);
        shuffleArray(questionFields);
        localStorage.setItem('mtc_questions', JSON.stringify(questionFields));
        localStorage.setItem('mtc_category', JSON.stringify(cat));
        history.push('/category');
    }

    // Effects
    React.useLayoutEffect(()=>{
        setLoading(true);
    },[]);
    React.useEffect(()=>{
        if (data && categoriesFetch.data) {
            let level = location.pathname.replace('/', '');

            console.log("Questions");
            console.log(data);

            // Filter questions by level
            let filteredQdata = data.filter((q)=> q.level === level);
            setFilteredQuestions(data);

            // // Filter the relavant categories
            // let relevantCategories = ['category1', 'category2', 'category3', 'catgeory4'];
            // let filteredCategories = categoriesFetch.data.filter((c)=>{
            //     let processedCat = c.name.replace(/\s/g, '').toLowerCase()
            //     if (relevantCategories.includes(processedCat)) {
            //         return c;
            //     }
            // });
            //let filteredCategories = categoriesFetch.data.filter((c)=> c.level === level)
            setCategoryOptions(categoriesFetch.data);
            setLoading(false);
        }
        if (isError || categoriesFetch.isError) {
            setLoading(false);
            openError('An error occurred while setting up the quiz');
        }
    },[data, categoriesFetch.data])

    // Custom Input
    const CategoryInput = <InputBase
        sx={{
            background: 'white',
            borderRadius: '4px',
            padding: '8px',
            borderStyle: 'hidden',
            fontSize: '16px',
            //paddingRight: '30px',
            width: '100%',
            '&:focus':{
                outlineOffset: '0px',
                outline: '2px solid #2660F6',
                boxShadow: '0 0 3px #2660F6',
            },
            [breakpoints.sm()]:{
                width: '80%'
            }
        }}
    />


    const mtclogo = (
        <div className={`${styles.logo} ${styles.responsiveLogo}`}>
            <img src={logo} alt="MTC logo" />
        </div>
    );

    return(
        <Layout>
            {/** Previous button */}
            <div>
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
            <Grid container sx={{ 
                alignItems: 'center',
                marginTop: '12%',
                //justifyContent: 'space-evenly' 
            }}>
                {/** Logo */}
                <Grid item xs={12} md={4}>
                    <div>
                        {mtclogo}
                    </div>
                </Grid>

                {/** Inputs */}
                <Grid item xs={12} md={8}>
                    <div className={styles.inputGroup}>

                        {/** Player Label */}
                        <div className={styles.title}>
                            <h3>Select a Challenge to continue</h3>
                        </div>

                        {/** Category Dropdown */}
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            displayEmpty
                            IconComponent={SelectIcon}
                            inputProps={{ 
                                'aria-label': 'Without label',
                            }}
                            input={CategoryInput}
                        >
                                <MenuItem value="">
                                    <em>Choose a Category</em>
                                </MenuItem>
                                {
                                    categoryOptions.map((item, index)=>(
                                        <MenuItem value={item.name} key={`drop${item.id}`} >{item.name}</MenuItem>
                                    ))
                                }
                        </Select>

                        {/** Continue Button */}
                        {
                            category !== '' &&
                            <>
                            <Button
                                onClick={gotoCategory}
                                variant='contained'
                                sx={{
                                    backgroundColor: '#2660F6',
                                    width: '100%',
                                    color: 'white',
                                    padding: '10px 0px',
                                    fontFamily: 'Rubik',
                                    marginTop: 5,
                                }}
                            >
                                Continue
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography sx={{ p: 2 }}>This category doesn't have enough questions</Typography>
                            </Popover>
                            </>
                        }
                    </div>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ElementaryHome;