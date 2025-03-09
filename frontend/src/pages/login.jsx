import React from "react"
import styles from '../styles/login.module.css';
import sideBanner from '../assets/sidebanner.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if(res.status === 200){
                alert('Login successful')
                const data = await res.json()
                console.log(data)
                const token = data.token
                localStorage.setItem("token", token)
                navigate('/newJob')
            } else { throw new Error("Login failed") }
        }
        catch(e){
            console.log(e);
            alert('Login Failed')
        }
    }
    return(
        <div className={styles.main_login_container}>
            <div className={styles.left_login_container}>
                <div className={styles.login_content}>
                    <h1 className={styles.login_header}>Already have an Account?</h1>
                    <p className={styles.login_header2}> Your personal job finder is here</p>

                    <form onSubmit={handleSubmit}>
                        <input value={formData.email} type="email" className={styles.login_input_field} placeholder="Email" onChange={(e) => setFormData({
                            ...formData, email: e.target.value
                        })} required />
                        <input value={formData.password} type="password" className={styles.login_input_field} placeholder="Password" onChange={(e) => setFormData({
                            ...formData, password: e.target.value
                        })} required />
                        <button type="submit" className={styles.sign_in_btn}>Sign In</button>
                    </form>

                    <p className={styles.sign_up_txt}>
                        Don't have an account? <a href="/register" className={styles.sign_up_link}>Sign Up</a>
                    </p>

                </div>
            </div>
            <div className={styles.right_login_container}>
                <div className={styles.login_overlay_txt}>Your Personal Job Finder</div>
                <img src={sideBanner} alt="banner" />
            </div>
        </div>
    )
}
