import React from "react"
import styles from '../styles/login.module.css';
import sideBanner from '../assets/sidebanner.png'

export default function Login(){
    return(
        <div className={styles.main_login_container}>
            <div className={styles.left_login_container}>
                <div className={styles.login_content}>
                    <h1 className={styles.login_header}>Already have an Account?</h1>
                    <p className={styles.login_header2}> Your personal job finder is here</p>

                    <form>
                        <input type="email" className={styles.login_input_field} placeholder="Email" required />
                        <input type="password" className={styles.login_input_field} placeholder="Password" required />
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
