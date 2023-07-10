import './dashboard.styles.scss';
import DashboardSwiper from '../../components/dashboard-swiper/dashboard-swiper.component';
import { UserContext } from '../../contexts/user.context';
import { useContext, useEffect } from 'react';
import DashboardModules from '../../components/dashboard-modules/dashboard-modules.component';



const Dashboard = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (!loggedUser) return;
    try {
        const foundUser = JSON.parse(loggedUser);
        setCurrentUser(foundUser);
    } catch (error) {
        console.error(error.message);
    }
},[setCurrentUser]);
  
  return (
      <div className='dashboard-container'>
        <DashboardSwiper />
        {currentUser && <DashboardModules currentUser={currentUser} />}
      </div>

  )
}

export default Dashboard;
