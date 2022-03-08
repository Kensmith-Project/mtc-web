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
    const { data, isError } = useQuestions();
    const categoriesFetch = useCategories();

    // State
    const [category, setCategory] = React.useState<string>('');
    const [categoryOptions, setCategoryOptions] = React.useState<CategoryResponse[]>([]);
    const [filteredQuestions, setFilteredQuestions] = React.useState<QuestionsResponse[]>([]);
    const [questionFields, setQuestionFields] = React.useState<QuestionField[]>([]);

    // Handlers
    const handleCategoryChange = (event: SelectChangeEvent)=>{
        let value = event.target.value;
        setCategory(value);

        // Filter the questions by category
        let cat = categoriesFetch.data?.find((c)=> c.name === value);

        if (cat) {
            let tempCat = cat;  // Just did this to remove the undefined nature of cat
            let questions = filteredQuestions?.filter((q)=> q.categories.includes(tempCat.id));
            let questionFields = questions.map((q)=> q.acf);
            console.log('Question Fields');
            console.log(questionFields); 
            setQuestionFields(questionFields);
        }
    }

    // Links and handlers
    const handleClose = ()=>{
        history.goBack();
    }
    const gotoCategory = ()=>{
        localStorage.setItem('mtc_questions', JSON.stringify(questionFields));
        history.push('/ready');
    }

    // Effects
    React.useLayoutEffect(()=>{
        setLoading(true);
    },[]);
    React.useEffect(()=>{
        if (data && categoriesFetch.data) {
            let level = location.pathname.replace('/', '');

            // Filter questions by level
            let filteredQdata = data.filter((q)=> q.acf.level === level);
            setFilteredQuestions(filteredQdata);

            // Filter the relavant categories
            let relevantCategories = ['category1', 'category2', 'category3', 'catgeory4'];
            let filteredCategories = categoriesFetch.data.filter((c)=>{
                let processedCat = c.name.replace(/\s/g, '').toLowerCase()
                if (relevantCategories.includes(processedCat)) {
                    return c;
                }
            });
            setCategoryOptions(filteredCategories);
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
            paddingRight: '30px',
            width: '100%',
            '&:focus':{
                outlineOffset: '0px',
                outline: '2px solid #2660F6',
                boxShadow: '0 0 3px #2660F6',
            }
        }}
    />


    const mtclogo = (
        <div className={styles.logo}>
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
            <div className={`${styles.main}`}>
                {/** Logo */}
                <div>
                    {mtclogo}
                </div>

                {/** Inputs */}
                <div className={styles.inputGroup}>

                    {/** Player Label */}
                    <div className={styles.title}>
                        <h3>Select a Category to continue</h3>
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
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ElementaryHome;