import React from 'react';
import { ReactComponent as NotFoundSvg } from "../../assets/404.svg";
import styles from './notFound.module.css';

const NotFoundPage: React.FC<any> = ()=>{

    return(
        <div className={styles.center}>
            <div className={styles.imageContainer}>
                <NotFoundSvg/>
            </div>
        </div>
    )
}

export default NotFoundPage;