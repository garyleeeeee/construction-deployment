import './edit-user-modal.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { httpUpdateUser } from '../../hooks/requests';

const EditUserModal = ({setIsModalOpen, user}) => {
    const { currentUser} = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const {id, staffCode, name, role, salary, phoneNumber, status} = user;
    const defaultFormFields = {
        name, role, salary, phoneNumber, status
    };
    const roles = [
        '施工员', '现场主管', '后勤主管', '项目经理', '出纳', '采购员', '员工', '仓管', '财务', '车辆主管', '资料主管', '资料员', '预算员', '预算主管', '人事主管', '程序员'
    ];
    const [formFields, setFormFields] = useState(defaultFormFields);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {






        } catch (error) {

            console.log('Unhandled Error:',error.message)
        }
    };
    
    return (
        currentUser ? 
        (
            <div className='edit-user-modal-container'>
            <button onClick={()=>setIsModalOpen(false)} className='closeBtn'>
                <FontAwesomeIcon icon={faXmark} className='closeBtnIcon' />
            </button>
            <form onSubmit={handleSubmit}>
                <h2>{staffCode}</h2>
                <div className='inputContainer'>
                    <label htmlFor='edit-name-input'>姓名</label>
                    <input type='text' id='edit-name-input' name='name' placeholder={name} defaultValue={name} onChange={handleChange} required/>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='edit-role-input'>角色</label>
                    <select id="edit-role-input" name='role' defaultValue={role} onChange={handleChange} required>
                        {roles.map((r,i) => {
                            return <option value={r} key={i}>{r}</option>;
                        })}
                    </select>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='edit-salary-input'>月薪</label>
                    <input type='number' name='salary' id='edit-salary-input' placeholder={salary} defaultValue={salary} onChange={handleChange} required/>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='edit-phone-input'>联系电话</label>
                    <input type='tel' id='edit-phone-input' name='phoneNumber' placeholder={phoneNumber} defaultValue={phoneNumber} onChange={handleChange} required/>
                </div>
                <div className='inputContainer'>
                    <label htmlFor='edit-status-input'>状态</label>
                    <select id="edit-status-input" name='status' defaultValue={status} onChange={handleChange} required>
                        <option value='在职'>在职</option>;
                        <option value='离职'>离职</option>;
                    </select>
                </div>
                {/* Display error message when there is an error */}
                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                <button type='submit' className='submitBtn'>修改</button>
            </form>

        </div>
        )
        :
        <Navigate to='/' />
    )
}

export default EditUserModal;