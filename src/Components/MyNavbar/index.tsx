import React from 'react';
import styles from './navbar.module.css';
import logo from '../../assets/mtc logo.png';
import { useHistory } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { deleteToken, getToken } from '../../utils/tokenUtils';
import { useProfile } from '../../hooks/useProfile';
import ProfileMenu from '../ProfileMenu';
import LoadingContext from '../../Contexts/LoadingContext';
import ToastContext from '../../Contexts/ToastContext';


const MyNavbar: React.FC<any> = ()=>{

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    //const { openError } = React.useContext(ToastContext);

    const token = getToken();
    let { decodedToken } = useJwt<any>(token || '');

    // Global state
    const { user, isLoading, isError } = useProfile(decodedToken?.username);

    // Hooks
    const history = useHistory(); 

    /** Handlers */
    // Function for logging out
    const handleLogout = ()=>{
        deleteToken();
        history.push('/admin/login');
    }
    
    // Function for routing home
    const handleLogoClick = () =>{
        history.push('/admin');
    }

    // Effect
    React.useEffect(()=>{
        if (isLoading && token) {
            setLoading(true);
        }

        if (!isLoading){
            setLoading(false);
        }

        if (!token){
            setLoading(false);
        }

        // if (isError){
        //     setLoading(false);
        //     openError("Could not fetch user's profile");
        // }
    },[isLoading, token])

    return(
        <div className={styles.nav}>

            <div className={styles.container}>

                {/** Logo section */}
                <div className={styles.logo} onClick={handleLogoClick}>
                    <img src={logo} alt="MTC logo" />
                </div>

                {/** Title */}
                <div className={styles.title}>
                    <h1>MULTIPLICATION TABLES CHALLENGE</h1>
                </div>

                {/** Account settings */}
                <div className={styles.menu}>
                    { token && <ProfileMenu user={user} onLogOut={handleLogout}/> }
                </div>
                
            </div>
            
        </div>
    )
}


export default MyNavbar;