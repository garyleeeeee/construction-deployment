import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import SignInForm from "../sign-in-form/sign-in-form.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";

const AuthenticationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="signup" element={<SignUpForm />} />
        </Routes>
    );
};


export default AuthenticationRoutes;

