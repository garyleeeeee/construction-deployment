import ModuleCard from '../module-card/module-card.component';
import './dashboard-modules.styles.scss';
import { Link } from 'react-router-dom';

const getCurrentUser = () => {
    let currentUser;
    const loggedUser = localStorage.getItem('loggedUser');
    if (!loggedUser) return;
    const foundUser = JSON.parse(loggedUser);
    currentUser = foundUser;
    return currentUser;
}



const DashboardModules = () => {

    let currentUser = getCurrentUser();
    const { name, role, staffCode } = currentUser;

// Change currentUser to localStorage

    return (
        <div className='dashboard-modules' id='dashboard-modules'>

            <h2>{`${staffCode} - ${name}`}</h2>

            <div className='module-cards'>
                <Link to='/personal-info' className='module-link' >
                    <ModuleCard moduleName='个人信息'/>
                </Link>
                <ModuleCard moduleName='待办事项'/>
                <ModuleCard moduleName='报销请求'/>
                <ModuleCard moduleName='采购请求'/>
                <ModuleCard moduleName='仓库管理'/>
                <ModuleCard moduleName='车辆管理'/>
                <ModuleCard moduleName='进度管理'/>
                <Link to='/staff-management' className='module-link'>
                    <ModuleCard moduleName='人员管理'/>
                </Link>
                
            </div>

        </div>

    )
}


export default DashboardModules;