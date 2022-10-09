import React, { FormEvent } from 'react';
import styles from  './login.module.css';
import logo from '../../assets/mtc logo.png';
//import trophyImage from '../../assets/trophy.svg';
import { useHistory } from 'react-router-dom';
import LoadingContext from '../../Contexts/LoadingContext';
import { isEmpty } from '../../utils/formUtils';
import CustomInput from '../../Components/CustomInput';
import ToastContext from '../../Contexts/ToastContext';
import { LoginRequest } from '../../types/requests/LoginRequest';
import { authenticateUser } from '../../Services/auth';
import { storeToken } from '../../utils/tokenUtils';
import { parseError } from '../../utils/errorUtils';


const LoginPageAdmin: React.FC<any> = ()=>{

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openError } = React.useContext(ToastContext);

    // Hooks
    const history = useHistory();
    // const dispatch = useDispatch();
    // const { user, error, token, status } = useSelector((state: RootState)=> state.auth);

    // State
    // const [loading, setLoading] = React.useState(false);
    const [usernameError, setUserError] = React.useState(false);
    const [passwordError, setpassError] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);


    // Refs
    const formRef = React.createRef<HTMLFormElement>();

    // Handlers
    const handleContinue = ()=>{
        history.push("/home");
    }
    // const createAdmin = ()=>{
    //     let request: ICreateUserRequest = {
    //         username: 'admin',
    //         password: 'password',
    //         fullName: 'Pascal Amize',
    //         image: 'file:///Users/mac/Downloads/Paschal.png',
    //         role: UserRole.ADMIN
    //     }

    //     dispatch(send('auth-create-user', request));
    // }
    const gotoReset = ()=>{
        history.push('/reset');
    }

    const handleSubmit = async (event: FormEvent)=>{
        event.preventDefault();
        let formEl = formRef.current || undefined;
        const formData = new FormData(formEl);

        // Values
        let username = formData.get("username")?.toString() || '';
        let password = formData.get("password")?.toString() || '';

        // Check if values are empty
        if (isEmpty(username) || isEmpty(password)){
            setUserError(isEmpty(username));
            setpassError(isEmpty(password));
            return;
        }
        
        setLoading(true);
        const { data, error } = await authenticateUser(username, password);

        if (data) {
            setLoading(false);
            storeToken(data.access_token || '');
            history.push('/admin');
        }

        if (error) {
            setLoading(false);
            openError(parseError(error))
        }
    }

    // Unhighlight error
    const unhighlightUsername = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (usernameError) {
            setUserError(false);
        }
    }
    const unhighlightPassword = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (passwordError) {
            setpassError(false);
        }
    }

    const LoginForm = (
        <>
        <form className={styles.card} ref={formRef} onSubmit={handleSubmit}>
             {/** LOGO */}
             <div className={styles.logo}>
                <img src={logo} alt="MTC logo" />
            </div>

            {/** Inputs */}
            <div className={styles.inputArea}>
                <CustomInput type="text" placeholder="USERNAME" 
                    name="username" id="username" error={usernameError}
                    onChange={unhighlightUsername}
                />
                <CustomInput type="password" placeholder="PASSWORD" 
                    name="password" id="password" error={passwordError}
                    onChange={unhighlightPassword}
                />
            </div>

            {/** Submit Button */}
            <div className={styles.buttonArea}>
                <button>
                    CONTINUE
                </button>
            </div>

        </form>
        {/* <div className={styles.forgotPassword} onClick={gotoReset}>
            <p>Forgot password?</p>
        </div> */}
        </>
    );
    

    return(
        <div className={styles.container} >

            {/** Form */}
            <div className={styles.formArea}>
                { LoginForm }
            </div>

            {/*<button onClick={createAdmin}>
                CREATE ADMIN
            </button>} */}

        </div>
    )
}

export default LoginPageAdmin;