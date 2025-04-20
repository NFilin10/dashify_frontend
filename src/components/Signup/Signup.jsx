import Styles from "./Signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            surname,
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", formData, {
                withCredentials: true,
            });

            if (response.status === 201) {
                navigate("/login");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <div className="signup">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">
                            Sign up
                        </label>
                        <input className={Styles.input} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" />
                        <input className={Styles.input} onChange={(e) => setSurname(e.target.value)} type="text" name="surname" placeholder="Surname" />
                        <input className={Styles.input} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                        <input className={Styles.input} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" />


                        <button onClick={signup} className={Styles.button}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup