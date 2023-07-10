import './personal-info.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PersonalInfo = () => {
    const { currentUser} = useContext(UserContext);
    if (!currentUser) return;
    const { name, role, staffCode, phoneNumber } = currentUser;

    return (
        currentUser ?  
        (
            <div className='personal-info-container'>
                <Link to='/#dashboard-modules' className='backToHomeLink'>
                    <FontAwesomeIcon icon={faArrowLeft} className='personal-info-icon-arrow-left' /> 返回
                </Link>
                <FontAwesomeIcon icon={faUser} className='personal-info-icon-user' />
                <ul>
                    <li><b>姓名：</b>{name}</li>
                    <li><b>角色：</b>{role}</li>
                    <li><b>员工号码：</b>{staffCode}</li>
                    <li><b>联系电话：</b>{phoneNumber}</li>
                </ul>
            </div>
        ) :
        <Navigate to='/' />
    );
};

export default PersonalInfo;
