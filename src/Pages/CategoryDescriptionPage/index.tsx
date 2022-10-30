import React from 'react';
import styles from  './catDescription.module.css';
import { useHistory } from 'react-router';
import { CategoryResponse } from '../../types/response';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';


const CategoryDescriptionPage: React.FC<any> = ()=>{

    const history = useHistory();

    // State
    const [loading, setLoading] = React.useState<boolean>(true);
    const [category, setCategory] = React.useState<CategoryResponse>();

    // Re-route effect
    React.useEffect(()=>{
        let unParsedCategory = localStorage.getItem('mtc_category');
        if (unParsedCategory === null) {
            history.replace('/');
        }
        else{
            setCategory(JSON.parse(unParsedCategory));
        }
    },[]);

    // Handlers
    const gotoCountdown = ()=>{
        history.push('/ready');
    }
    const handleClose = ()=>{
        history.goBack();
    }

    // Category Card
    const descriptionCard = (
        <div className={`${styles.card}`}>

            {/**Title */}
            <div className={styles.title}>
                <h2>Challenge Description</h2>
            </div>

            <div className={styles.description}>
                <p>{category?.description}</p>
            </div>
        </div>
    )

    return(
        <div className={styles.container} >
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

            { descriptionCard }

            <Button
                onClick={gotoCountdown}
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
                Continue
            </Button>

        </div>
    )
}

export default CategoryDescriptionPage;