import React from 'react';
import TwinSpin from 'react-cssfx-loading/lib/TwinSpin';
import BarWave from 'react-cssfx-loading/lib/BarWave';
import styles from './loading.module.css';

export const ImageLoadingScreen: React.FC<any> = ()=>{
    return(
        <div className={styles.backdrop}>
            <TwinSpin color="#FF5A3C"/>
        </div>
    )
}
const LoadingScreen: React.FC<any> = () =>{

    return(
        <div className={styles.backdrop}>
            <BarWave color="#FF5A3C"/>
        </div>
    )
}

export default LoadingScreen;