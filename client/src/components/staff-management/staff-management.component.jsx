import { httpGetAllUsers } from '../../hooks/requests';
import { useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import './staff-management.styles.scss';
import EditUserModal from '../edit-user-modal/edit-user-modal.component';

const StaffManagement = () => {
    const [usersList, setUsersList] = useState([]);
    const {currentUser} = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditProfile = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
      };

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await httpGetAllUsers();
            if (!response) return;
            setUsersList(response.users);
        };
        getAllUsers();
    }, []);
    if (!currentUser) return;
    return (
        currentUser? 
        (
            <div className='staff-management-container'>
            {
                isModalOpen && <EditUserModal setIsModalOpen={setIsModalOpen} user={selectedUser} />
            }
            <h2>所有人员</h2>
            <div className='content'>
                {usersList.map((user, index) => (
                    <div key={index} className='card-container'>
                        <div className='user-card'>
                            <div className='info-item'>
                                <span className='label'>员工号码:</span>
                                <span>{user.staffCode}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>姓名:</span>
                                <span>{user.name}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>角色:</span>
                                <span>{user.role}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>薪资:</span>
                                <span>{user.salary}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>联系电话:</span>
                                <span>{user.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>员工号码</th>
                                <th>姓名</th>
                                <th>角色</th>
                                <th>月薪</th>
                                <th>联系电话</th>
                                <th>状态</th>
                                <th>编辑</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.staffCode}</td>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                    <td>{user.salary}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.status}</td>
                                    <td className='profile-edit-btn' onClick={()=>handleEditProfile(user)}>&#128736;</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
        :
        <Navigate to='/' />
    );
};

export default StaffManagement;
