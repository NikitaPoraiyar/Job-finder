import React from "react"
import { useState } from "react"
import styles from '../styles/register.module.css'
import sideBanner from '../assets/sidebanner.png'

export default function Register(){
    const [formData, setFormData] = useState({
        username: '',
        name:'',
        phone: '',
        password: '',
        email: ''
    });
    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            // http://localhost:3000/api/users/register
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register` , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            })
            res.status === 200 ? alert("Registration Successful") : alert("Registration Failed")
        }
        catch(error){
            console.log(error)
            alert("Registration Failed")
        }
    }

    return(
        <div className={styles.main_register_container}>
                    <div className={styles.left_register_container}>
                        <div className={styles.register_content}>
                            <h1 className={styles.register_header}>Create an Account</h1>
                            <p className={styles.register_header2}> Your personal job finder is here</p>
        
                            <form onSubmit={handleSubmit}>
                                <input onChange={(event) => setFormData((prev) => {
                                    return{
                                        ...prev,
                                        username:event.target.value,
                                    }
                                })} value={formData.username} type="text" className={styles.register_input_field} placeholder="Username" required />
                                <input onChange={(event) => setFormData((prev) => {
                                    return{
                                        ...prev,
                                        name:event.target.value,
                                    }
                                })} value={formData.name} type="text" className={styles.register_input_field} placeholder="Name" required />
                                <input onChange={(event) => setFormData((prev) => {
                                    return{
                                        ...prev,
                                        email:event.target.value,
                                    }
                                })} value={formData.email} type="email" className={styles.register_input_field} placeholder="Email" required />
                                <input onChange={(event) => setFormData((prev) => {
                                    return{
                                        ...prev,
                                        phone:event.target.value,
                                    }
                                })} value={formData.phone} type="number" className={styles.register_input_field} placeholder="Mobile" required />
                                <input onChange={(event) => setFormData((prev) => {
                                    return{
                                        ...prev,
                                        password:event.target.value,
                                    }
                                })} value={formData.password} type="password" className={styles.register_input_field} placeholder="Password" required />
                                <div className={styles.register_checkbox_container}>
                                    <input type="checkbox" className={styles.checkbtn} required />
                                    <p>By creating an account, I agree to our terms of use and privacy policy</p>
                                </div>
                                
                                <button type="submit" className={styles.log_in_btn}>Create Account</button>
                            </form>
        
                            <p className={styles.sign_in_txt}>
                                Already have an account? <a href="/login" className={styles.sign_in_link}>Sign In</a>
                            </p>
        
                        </div>
                    </div>
                    <div className={styles.right_register_container}>
                        <div className={styles.register_overlay_txt}>Your Personal Job Finder</div>
                        <img src={sideBanner} alt="banner" />
                    </div>
                </div>
    )
}