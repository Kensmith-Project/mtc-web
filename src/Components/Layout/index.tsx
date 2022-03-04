import React from 'react';
import styles from './layout.module.css';

export interface LayoutProps{
    children?: React.ReactNode | React.ReactNode[];
    background?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, background })=>{
    
    return(
        <div className={styles.container} style={{ background: background }}>
           <div className={styles.topContent}>
                {children}
           </div>
        </div>
    )
}

export default Layout;