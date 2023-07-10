import './notificationIcon.styles.scss';

const NotificationIcon = ({number}) => {

    let display = 'block';
    number === 0 ? display = 'none': display = 'block';
    // if (number > 0) {
    //     greaterThanZero = true;
    // } else {
    //     greaterThanZero = false 
    // }

    return (
        <div className='notification-icon' style={{display: `${display}`}}>
            <div className='noti-icon-circle'>
            <span className='noti-icon-number'>{number}</span>
            </div>
            
        </div>
    )
}

export default NotificationIcon;

