import { Button, IconButton } from '@mui/material';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Layout from '../../Components/Layout';
import SettingButton, { SettingButtonProps } from '../../Components/SettingButton';
import CloseIcon from '../../svgs/CloseIcon';
import styles from './homePage.module.css';


const HomePageAdmin: React.FC<any> = ()=>{

    // Hooks
    const history = useHistory();
    const match = useRouteMatch();

    // Links
    const gotoQuestions = ()=>{
        history.push("/admin/settings/questions");
    }
    const gotoCategories = ()=>{
        history.push("/admin/settings/categories");
    }
    const handleClose = ()=>{
        history.push("/home");
    }
    

    let buttons: SettingButtonProps[] = [
        {
            label: "Challenge Settings",
            onClick: gotoCategories,
        },
        {
            label: "Question Settings",
            onClick: gotoQuestions,
        },
    ]

    const settingsCard = (
        <div className={`mtc-card ${styles.card}`}>

            {/** Close Icon */}
            {/* <div className={styles.close}>
                <IconButton aria-label="close" onClick={handleClose} >
                    <CloseIcon/>
                </IconButton>
            </div> */}

            {/**Title */}
            <div className={styles.title}>
                <h4>Settings</h4>
            </div>

            <div className={styles.buttonGroup}>
                {
                    buttons.map((buttonProps, index)=>(
                        <SettingButton {...buttonProps} key={`btp${index}`}/>
                    ))
                }
            </div>
        </div>
    )

    return(
        <Layout>
            <div className="mtc-center">
                {settingsCard}
            </div>
        </Layout>
    )
}

export default HomePageAdmin;