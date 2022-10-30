import { Button } from '@mui/material';
import React from 'react';
import styles from './settingButton.module.css';

export interface SettingButtonProps{
    label: string;
    onClick?: (event: React.MouseEvent) => any;
}

const SettingButton: React.FC<SettingButtonProps> = ({ label, onClick })=>{

    return(
        <div className={styles.buttonArea}>
            <Button 
                onClick={onClick}
                sx={{
                    backgroundColor: "#E3EBFF",
                    borderRadius: '10px',
                    width: '100%',
                    paddingY: "12px",
                    color: 'black',
                    '&:hover':{
                        backgroundColor: 'rgba(227, 235, 255, 0.7)'
                    }
                }}
            >
               {label}
            </Button>
        </div>
    )
}

export default SettingButton;