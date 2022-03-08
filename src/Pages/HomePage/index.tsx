import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import React from 'react';
import Layout from '../../Components/Layout';
import styles from './HomePage.module.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Path } from '../../paths';
import { useCategories, useQuestions } from '../../Services/question';

const HomePage: React.FC<any> = ()=>{

    // Data Fetch
    const questionFetch = useQuestions();
    const categoriesFetch = useCategories();

    // Hooks
    const history = useHistory();

    // Links
    const gotoElementary = ()=>{
        history.push({
            pathname: "/elementary",
            state:{ level: 'elementary' }
        })
    }
    const gotoSecondary = ()=>{
        history.push({
            pathname: "/secondary",
            state:{ level: 'secondary' }
        })
    }
    const gotoHighSchool = ()=>{
        history.push({
            pathname: "/high",
            state:{ level: 'high' }
        })
    }

    return(
        <Layout>
            <div>
                <Button variant='contained' color='secondary'
                    href={Path.SITE}
                    sx={{
                        paddingLeft: 0,
                        marginTop: '15px', marginLeft: '15px'
                    }}
                >
                    <div className={styles.backBtn}>
                        <ArrowBackIcon sx={{ marginRight: '5px', paddingLeft: '5px' }}/>
                        Go back to site
                    </div>
                </Button>
            </div>
            <div className={styles.title}>
                <h4>Please Select a Level</h4>
            </div>
            <div className={`${styles.main}`}>

               {/** Elementary Card */}
               <div className={styles.card} onClick={gotoElementary}>
                <Card sx={{
                    maxWidth: 289,
                    minWidth: 250,
                    '&:hover':{
                        zIndex: 100,
                        transform: "translate3d(0px, -3px, 0px)"
                    },
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    }}>
                        <div className={styles.elementary}></div>
                        <CardActions sx={{ padding: '15px 0', justifyContent: 'center'}}>
                            <div className={styles.footer}>
                                <h2>ELEMENTARY</h2>
                            </div>
                        </CardActions>
                    </Card>
               </div>

                {/** Middle School Card */}
                <div className={styles.card} onClick={gotoSecondary}>
                    <Card sx={{
                    maxWidth: 289,
                    minWidth: 250,
                    '&:hover':{
                        zIndex: 100,
                        transform: "translate3d(0px, -3px, 0px)"
                    },
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    }}>
                        <div className={styles.middle}></div>
                        <CardActions sx={{ padding: '15px 0', justifyContent: 'center'}}>
                            <div className={styles.footer}>
                                <h2>MIDDLE SCHOOL</h2>
                            </div>
                        </CardActions>
                    </Card>
                </div>

                {/** Middle School Card */}
                <div className={styles.card} onClick={gotoHighSchool}>
                    <Card sx={{
                    maxWidth: 289,
                    minWidth: 250,
                    '&:hover':{
                        zIndex: 100,
                        transform: "translate3d(0px, -3px, 0px)"
                    },
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    }}>
                        <div className={styles.high}><h1>H</h1></div>
                        <CardActions sx={{ padding: '15px 0', justifyContent: 'center'}}>
                            <div className={styles.footer}>
                                <h2>HIGH SCHOOL</h2>
                            </div>
                        </CardActions>
                    </Card>
                </div>

            </div>
        </Layout>
    )
}

export default HomePage;