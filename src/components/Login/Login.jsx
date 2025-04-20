import Styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from 'axios';


const Login = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const routeChangeSignUp = () =>{
        let path = `/signup`;
        navigate(path);
    }

    const LoginIn = async (e) => {
        const data = { email: login, password: password };

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                password: data.password,
                email: data.email,
            }, {
                withCredentials: true
            });


            if (response.status === 401) {
                throw new Error('Incorrect login or password');
            }

            if (response.status === 201) {
                navigate("/")
            }

        } catch (error) {
            console.error(error);
            console.log("error");
        }
    };


    return (

        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true"/>

                <div className="login">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Login</label>
                        <input className={Styles.input} onChange={(e) => setLogin(e.target.value)} type="email" name="email" placeholder="Email" />
                        <input className={Styles.input} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" />
                        <button onClick={LoginIn} className={Styles.button}>Login</button>
                        <button onClick={routeChangeSignUp} className={Styles.button}>Signup</button>

                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login