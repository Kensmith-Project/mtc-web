import { KeyboardArrowLeft} from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Redirect, useHistory } from 'react-router';
import React from 'react';
import styles from './addCategory.module.css';
import useQuery from '../../hooks/useQuery';
import Layout from '../../Components/Layout';
import { Challenge } from '../../types/Challenge';
import CategoryForm from '../../Components/Forms/CategoryForm';
import LoadingContext from '../../Contexts/LoadingContext';
import ToastContext from '../../Contexts/ToastContext';
import { addChallenge } from '../../Services/challenge';
import { parseError } from '../../utils/errorUtils';

const AddChallengePage: React.FC<any> = ()=>{

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openSuccess, openError } = React.useContext(ToastContext);

    // Hooks
    const history = useHistory();
    const query = useQuery();
    let level = query.get('level') as any;

    // State
    const [clear, setClearForm] = React.useState<Function>();
    
    // Link and Handlers
    const handleClose = ()=>{
        history.goBack()
    }
    const gotoCategories = ()=>{
        history.push("/admin/settings/categories");
    }
  
    // On Submit for form submission
    const onSubmit = async (request: Challenge, clearForm?: ()=> void)=>{
        setClearForm(clearForm);
        setLoading(true);

        const { data, error } = await addChallenge(request);

        if (data && data.success){
            setLoading(false);
            openSuccess(data.message || 'Challenge added successfully');
            clear && clear();
        }

        if (error) {
            setLoading(false);
            openError(parseError(error));
        }
    }

    if (!level) {
        return <Redirect to="/notfound"/>
    }
       
    return(
        <Layout>
        <div className={styles.page}>
            {/** Previous button */}
            <div>
                <Button
                    onClick={gotoCategories}
                    sx={{
                        color: 'white',
                    }}
                >
                    <KeyboardArrowLeft sx={{color: 'white'}}/>
                    Challenges
                </Button>
            </div>

            {/** Main */}
            <div  className={styles.main}>
                <CategoryForm onClose={handleClose} onSubmit={onSubmit} level={level}/>

            </div>
        </div>
        </Layout>
    )
}

export default AddChallengePage;