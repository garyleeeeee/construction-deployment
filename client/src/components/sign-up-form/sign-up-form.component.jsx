import './sign-up-form.styles.scss';
import { useState, useContext } from 'react';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import { Link, Navigate } from 'react-router-dom';
import { httpSignUpUser } from '../../hooks/requests';
import { UserContext } from '../../contexts/user.context';



const defaultFormFields = {
    name: '',
    password: '',
    rePassword: '',
    inviteCode: '',
    phoneNumber: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, password, rePassword, phoneNumber, inviteCode } = formFields;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // const [navigateToHome, setNavigateToHome] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);

    // Update formFields when input change detected
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    // Reset formFields to default
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // Handle submit
    const handleSubmit = async (event) => {
        // Prevent some kind of action or behavior in the browser, such as navigating to a new page or submitting a form and refreshing the page.
        event.preventDefault();

        try {
            // All inputs should be filled
            if (Object.values(formFields).some(field => field === '')) {
                setErrorMessage('信息不完整');
                return;
            };
            // Compare passwords
            if (password !== rePassword) {
                setErrorMessage("密码不相同");
                return; // Prevent form submission when passwords don't match
            };
            if (phoneNumber.length !== 11) {
                setErrorMessage("手机号码有误");
                return;
            };

            const userData = {
                name,
                password,
                phoneNumber,
                inviteCode
            };
            setIsLoading(true);
            const response = await httpSignUpUser(userData);
            // Unhandle Error
            if (response.ok === false) {
                setIsLoading(false);
                throw new Error(response.message)
            };
            // Predicted Error
            if (response.error) {
                let errorMessage = response.error;
                if (errorMessage === 'Wrong InviteCode') {
                    setErrorMessage('邀请码错误');
                } else if (errorMessage.includes("name")) {
                    setErrorMessage('此姓名已存在');
                } else if (errorMessage.includes("phoneNumber")) {
                    setErrorMessage('此手机号码已存在');
                } else if (errorMessage === 'User data missing') {
                    setErrorMessage('注册信息不完整');
                } else {
                    setErrorMessage('注册失败');
                }
                setIsLoading(false);
            };

            if (response.user) {
                resetFormFields();
                setIsLoading(false);
                setCurrentUser(response.user);
                localStorage.setItem('loggedUser', JSON.stringify(response.user));
                return;
            } ;

        } catch (error) {
            setIsLoading(false);
            console.log('Unhandled Error:',error.message)
        }
    }

    return (
        currentUser ? 
            <Navigate to="/" />
         : (
        <div className='signUpContainer'>
            <form onSubmit={handleSubmit}>
                <h2>账号注册</h2>
                <div className='inputContainer'>
                    <label htmlFor='staffNameInput'>姓名</label>
                    <br/>
                    <input type='text' id='staffNameInput' name='name' onChange={handleChange} required/>
                </div>

                <div className='inputContainer'>
                    <label htmlFor='signUpPassword'>密码</label>
                    <br/>
                    <input type='password' id='signUpPassword' name='password'  onChange={handleChange} required/>
                </div>

                <div className='inputContainer'>
                    <label htmlFor='signUpRepassword'>确认密码</label>
                    <br/>
                    <input type='password' id='signUpRepassword' name='rePassword' onChange={handleChange} required/>
                </div>

                <div className='inputContainer'>
                    <label htmlFor='signUpPhoneNumber'>手机号码</label>
                    <br/>
                    <input type='tel' id='signUpPhoneNumber' name='phoneNumber' onChange={handleChange} required/>
                </div>

                <div className='inputContainer'>
                    <label htmlFor='inviteCodeInput'>邀请码</label>
                    <br/>
                    <input type='number' id='inviteCodeInput' name='inviteCode' onChange={handleChange} required/>
                </div>
                {/* Display error message when there is an error */}
                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

                <button type='submit' onClick={handleSubmit} disabled={isLoading}>注册</button>
                {isLoading && <Spinner className='loadingIcon' />} 
                <span>
                    已有账号？<Link to='/auth'>立即登录</Link>
                </span>
            </form>
        </div>)
    )
};


export default SignUpForm;