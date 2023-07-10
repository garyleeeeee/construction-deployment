import './sign-in-form.styles.scss';
import { useState, useContext, useEffect } from 'react';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import { Link, Navigate } from 'react-router-dom';
import { httpSignInUser } from '../../hooks/requests';
import { UserContext } from '../../contexts/user.context';


const defaultFormFields = {
    staffCode: '',
    password: '',
};

const staffCodeFormatter = (number) => {
    // Convert number to a string and pad with zeros if necessary
    let paddedNumber = number.toString().padStart(2, '0');
    // Append 'YS-' to the paddedNumber
    let staffCode = 'YS-' + paddedNumber;
    // Return the staffCode
    return staffCode;
};

const SignInForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { staffCode, password } = formFields;
    // const [navigateToHome, setNavigateToHome] = useState(false);


    // Reset formFields to default
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // Update formFields when input change detected
    const handleChange = (event) => {
        const {name, value} = event.target;

        if (name ==='staffCode') {
            const formattedStaffCode = staffCodeFormatter(value)
            setFormFields({
                ...formFields,
                [name]: formattedStaffCode
            });
            return
        };
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    // Submit Form
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // All inputs should be filled
            if (Object.values(formFields).some(field => field === '')) {
                setErrorMessage('信息不完整');
                return;
            };

            const userData = {
                staffCode,
                password
            };
            setIsLoading(true);
            const response = await httpSignInUser(userData);

            if(response.ok === false) {
                setIsLoading(false);
                throw new Error(response.message)
            }

            if(response.error) {
                let errorMessage = response.error;
                if (errorMessage === 'User data missing') {
                    setErrorMessage('登录信息不完整');
                } else if (errorMessage.includes('No user found')){
                    setErrorMessage('登录信息不存在');
                } else if (errorMessage === 'Invalid Credentials') {
                    setErrorMessage('登录信息不匹配');
                } else {
                    setErrorMessage('登录失败');
                }
                setIsLoading(false);
            };
            
            if (response.user) {
                // console.log('Saved user', response.user)
                resetFormFields();
                setIsLoading(false);
                setCurrentUser(response.user);
                // setNavigateToHome(true);
                localStorage.setItem('loggedUser', JSON.stringify(response.user));
                return;
            } ;
        } catch (error) {
            setIsLoading(false);
            console.log('Unhandled Error:',error.message)
        }
    }

    useEffect(() => {
        const loggedUser = localStorage.getItem('loggedUser');
        if (!loggedUser) return;
        const foundUser = JSON.parse(loggedUser);
        setCurrentUser(foundUser);
    },[setCurrentUser]);

    return (
        currentUser ? 
            <Navigate to='/' />
        :
        <div className='signInContainer'>
            <form onSubmit={handleSubmit}>
                <h2>账号登录</h2>
                <div className='inputContainer'>
                    <label htmlFor='signInStaffCode'>员工号码</label>
                    <br/>
                    <input type='number' id='signInStaffCode' name='staffCode' onChange={handleChange} required/>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='signInPassword'>密码 </label>
                    <br/>
                    <input type='password' id='signInPassword' name='password' onChange={handleChange} required/>
                </div>
                {/* Display error message when there is an error */}
                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                <button type='submit' onClick={handleSubmit}>登录</button>
                {isLoading && <Spinner className='loadingIcon' />} 
                <span>
                    未有账号？<Link to='signup'>立即注册</Link>
                </span>
            </form>
        </div>

    )
};


export default SignInForm;

