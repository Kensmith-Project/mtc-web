import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styles from './categoryForm.module.css';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Challenge } from '../../../types/Challenge';
import { isEmpty } from '../../../utils/formUtils';
import { SchoolLevel } from '../../../types/SchoolLevel';
import CustomInput from '../../CustomInput';
import CustomTextArea from '../../CustomTextArea';
import { RuleProps } from '../../GameRules';


export interface CategoryFormProps{
    onSubmit?: (request: Challenge, clearForm?: ()=> void) => void;
    title?: string;
    category?: Challenge;
    onClose?: (event?: React.MouseEvent) => void;
    mode?: 'edit' | 'add';
    level?: SchoolLevel;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    onSubmit, title = 'Add User', category, onClose,
    mode = 'add', level,
})=>{

    // Hooks
    const history = useHistory();

    // Refs
    const formRef = React.createRef<HTMLFormElement>();

    // state
    const [name, setName] = React.useState<string>('');
    const [nameError, setNameError] = React.useState(false);

    const [description, setDescription] = React.useState<string>('');
    const [descError, setDescError] = React.useState(false);

    const [maxSkip, setMaxSkip] = React.useState<string>('2');
    const [skipError, setSkipError] = React.useState(false);

    const [maxTime, setMaxTime] = React.useState<string>('40');
    const [timeError, setTimeError] = React.useState(false);

    const [plusPoints, setPlusPoints] = React.useState<string>('10');
    const [plusError, setPlusError] = React.useState(false);

    const [minusPoints, setMinusPoints] = React.useState<string>('0');
    const [minusError, setMinusError] = React.useState(false);
    
    const [roundName, setRoundName] = React.useState<string>('Round 1');
    const [roundError, setRoundError] = React.useState(false);
    
    const [loading, setLoading] = React.useState<boolean>(false);

    // Callback
    const clearForm = ()=>{
        setName(''); 
        setDescription('');
        setMaxSkip('2'); 
        setMaxTime('40'); 
        setPlusPoints('10'); 
        setMinusPoints('0'); 
        setRoundName('Round 1'); 
    }

    // Links
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (nameError) {
            setNameError(false);
        } 
        setName(event.target.value);
    }
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        if (descError) {
            setDescError(false);
        }  
        setDescription(event.target.value);
    }
    const handleMaxSkipChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (skipError) {
            setSkipError(false);
        }
        setMaxSkip(event.target.value);
    }
    const handleMaxTimeChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (timeError) {
            setTimeError(false);
        }
        setMaxTime(event.target.value);
    }
    const handlePlusPointsChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (plusError) {
            setPlusError(false);
        }
        setPlusPoints(event.target.value);
    }
    const handleMinusPointsChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (minusError) {
            setMinusError(false);
        }
        setMinusPoints(event.target.value);
    }
    const handleRoundNameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (roundError) {
            setRoundError(false);
        }
        setRoundName(event.target.value);  
    }
    


    // On Submit for form subnission
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>)=>{

        // Values
        // let name = userName || '';
        // let description = password || '';
        // let fname = fullname;
        // let confirmPass = confirmPassword;

        // Check if values are empty
        if (
            isEmpty(name) || isEmpty(description) || isEmpty(maxTime) || isEmpty(maxSkip) ||
            isEmpty(plusPoints) || isEmpty(minusPoints) || isEmpty(roundName)
        ){
            setNameError(isEmpty(name));
            setDescError(isEmpty(description));
            setTimeError(isEmpty(maxTime));
            setSkipError(isEmpty(maxSkip));
            setPlusError(isEmpty(plusPoints));
            setMinusError(isEmpty(minusPoints));
            setRoundError(isEmpty(roundName));
            return;
        }

        
        let request: Challenge = {
            id: category?.id,
            name: name, description: description,
            level: category?.level || level,
            rule: {
                id: category?.rule?.id,
                maxSkip: Number.parseInt(maxSkip),
                maxTime: Number.parseInt(maxTime),
                plusPoints: Number.parseInt(plusPoints),
                minusPoints: Number.parseInt(minusPoints),
                roundName: roundName,
            }
        };

        onSubmit && onSubmit(request, clearForm);
    }

    // Effect
    React.useEffect(()=>{
        if(category){
            setName(category.name || '');
            setDescription(category.description || '');
            setMaxSkip(category.rule?.maxSkip?.toString() || '');
            setMaxTime(category.rule?.maxTime?.toString() || '');
            setPlusPoints(category.rule?.plusPoints?.toString() || '');
            setMinusPoints(category.rule?.minusPoints?.toString() || '');
            setRoundName(category.rule?.roundName?.toString() || '');
        }
    },[])

    const categoryForm = (
        <Card>
            <CardContent>
                <div className={styles.name}>
                    <label htmlFor="category-name">Name</label>
                    <CustomInput id="category-name" type="text" value={name}
                        onChange={handleNameChange} error={nameError}
                    />
                </div>

                <div className={styles.description}> 
                    <label htmlFor="category-description">Description</label>
                    <CustomTextArea name="" id="category-description" cols={30} rows={10}
                        value={description} onChange={handleDescriptionChange}
                        error={descError}
                    >
                    </CustomTextArea>
                </div>
            </CardContent>
        </Card>
    )

    // Rules
    interface RuleSetting extends RuleProps{
        onChange?: (event?: any) => any;
        error?: boolean;
        value?: string;
    }
    const rules: RuleSetting[] =[
        { 
            rule: "You can only skip ", afterText: "X", value: maxSkip,
            onChange: handleMaxSkipChange, error: skipError
        },
        { 
            rule: "Maximum time is ", afterText: "s", value: maxTime,
            onChange: handleMaxTimeChange, error: timeError,
        },
        { 
            rule: "Each right answer has ", afterText: "points addition", value: plusPoints,
            onChange: handlePlusPointsChange, error: plusError,
        },
        { 
            rule: "Each wrong answer has ", afterText: "points reduction", value: minusPoints,
            onChange: handleMinusPointsChange, error: minusError 
        },
    ]
    const rulesForm = (
        <Card>
            <CardHeader
                title="Rules"
                sx={{ paddingBottom: 0 }}
            />
            <CardContent sx={{ paddingTop: 0 }}>
                <ol className={styles.list}>
                {
                    rules.map((item, index)=>(
                        <li key={item.rule}>
                            <span className={styles.rule}>
                            <label htmlFor={`${item.rule}`}>{item.rule}</label>
                            <CustomInput id={item.rule} type="text" error={item.error}
                                onChange={item.onChange} value={item.value}
                            />
                            <label htmlFor={`${item.rule}`}>{item.afterText}</label>
                            </span>
                        </li>
                    ))
                }
                <li>
                    <span className={`${styles.rule} ${styles.roundRule}`}>
                        <label htmlFor={`round-label`}>{'Round Label: '} </label>
                            <CustomInput id="round-label" type="text" error={roundError}
                                onChange={handleRoundNameChange} value={roundName}
                            />
                    </span>
                </li>
                </ol>
            </CardContent>
        </Card>
    )

    return (
        <div>
            {/** Title and Button */}
            <div className={styles.titleArea}>
                {mode === 'add' && <h2> Add Challenge</h2>}
                <Button
                    variant="contained"
                    color='primary'
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
            <div>
                { categoryForm }
            </div>
            <div style={{ marginTop: '30px' }}>
                { rulesForm }
            </div>
        </div>
    );
}

export default CategoryForm;