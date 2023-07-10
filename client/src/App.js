// App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.scss';

import Navigation from './routes/navigation/navigation.component.jsx';
import Dashboard from './routes/dashboard/dashboard.component';

import AuthenticationRoutes from './components/authentication/authentication.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import PersonalInfo from './components/personal-info/personal-info.component';
import StaffManagement from './components/staff-management/staff-management.component';
import { useContext, useEffect } from 'react';
import { UserContext } from './contexts/user.context';


const App = () => {

  const { setCurrentUser } = useContext(UserContext);

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
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Dashboard />} />
        <Route path='auth/*' element={<AuthenticationRoutes/>}>
         <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path='personal-info' element={<PersonalInfo />} />
        <Route path='staff-management' element={<StaffManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
