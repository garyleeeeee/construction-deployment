import './module-card.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faClipboardQuestion, faCalendarCheck, faMoneyBillTransfer, faWarehouse, faCar, faBarsProgress, faPeopleGroup, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const moduleNameToIcon = (moduleName) => {
    let iconName;
    switch(moduleName) {
        case '个人信息':
            iconName = faIdBadge;
            break
        case '待办事项':
            iconName = faCalendarCheck;
            break
        case '采购请求':
            iconName = faClipboardQuestion;
            break
        case '报销请求':
            iconName = faMoneyBillTransfer;
            break
        case '进度管理':
            iconName = faBarsProgress;
            break
        case '仓库管理':
            iconName = faWarehouse;
            break
        case '车辆管理':
            iconName = faCar;
            break
        case '人员管理':
            iconName = faPeopleGroup;
            break
        default: 
            iconName = faCircleQuestion;
            break
    };
    return iconName

}


const ModuleCard = (props) => {

    const { moduleName } = props

    const icon = moduleNameToIcon(moduleName);


    return (
        <div className='module-card' >
            <FontAwesomeIcon icon={icon} className='card-icon'/>
            <h3>{moduleName}</h3>
        </div>
        
    )
}


export default ModuleCard;