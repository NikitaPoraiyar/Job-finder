import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from '../styles/newJob.module.css';
import sideBanner from '../assets/newJob_Banner.png'

export default function NewJob(){
    const { id } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        company: '',
        skills: '',
        remote: false,
        type: 'Full Time',
        logoURL: '',
        aboutCompany: '',
        information: ''
    })
    const handleSubmit = async (event) => {
        console.log(formData)
        console.log("Stringified", JSON.stringify(formData))
        console.log("Stringified", typeof(JSON.stringify(formData)))
        event.preventDefault()
        console.log('submit')
        try {
            const url = id ? `${import.meta.env.VITE_API_URL}/jobs/${id}` : `${import.meta.env.VITE_API_URL}/jobs`
            console.log(url);
            const res = await fetch(url, {
                method: id ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            })
            console.log("Response:", res)
            if (res.status === 200) {
                alert(`Job ${id ? 'updated' : 'created'} successfully`)
            } else { throw new Error(`Job ${id ? 'updated' : 'created'} failed`) }
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(`${import.meta.env.VITE_API_URL}/jobs/${id}`)
        if (id) {
            
            fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...formData,
                        title: data.title,
                        description: data.description,
                        location: data.location,
                        salary: data.salary,
                        company: data.company,
                        skills: data.skills.join(', '),
                        remote: data.remote,
                        type: data.type,
                        logoURL: data.logoURL || '',
                        aboutCompany: data.aboutCompany || '',
                        information: data.information || ''
                    })
                })
                .catch(error => console.log(error))
        }
    }, [id])
    return(
        <div className={styles.main_newJob_container}>
            <div className={styles.left_newJob_container}>
                <div className={styles.newJob_form_content}>
                    <h1>Add job description</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_field}>
                            <label htmlFor="company">Compant Name: </label>
                            <input id="company" value={formData.company} type="text" placeholder="Enter your company name here" onChange={(e) => setFormData({
                                ...formData, company: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="logoURL">Add logo URL: </label>
                            <input id="logoURL" type="text" value={formData.logoURL} placeholder="Enter the link" onChange={(e) => setFormData({
                                ...formData, logoURL: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="title">Job position: </label>
                            <input id="title" value={formData.title} type="text" placeholder="Enter job position" onChange={(e) => setFormData({
                                ...formData, title: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="salary">Monthly Salary: </label>
                            <input id="salary" value={formData.salary} type="text" placeholder="Enter Amount in rupees" onChange={(e) => setFormData({
                                ...formData, salary: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="type">Job Type: </label>
                            <select id="type" value={formData.type} onChange={(e) => setFormData({
                                ...formData, type: e.target.value
                            })}>
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="remote">Remote: </label>
                            <input id="remote" checked={formData.remote} type="checkbox" placeholder="remote" onChange={(e) => setFormData({
                                ...formData, remote: e.target.checked
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="location">Location: </label>
                            <input id="location" value={formData.location} type="text" placeholder="Enter location" onChange={(e) => setFormData({
                                ...formData, location: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="description">Job Description: </label>
                            <textarea id="description" value={formData.description} placeholder="Type the job description" onChange={(e) => setFormData({
                                ...formData, description: e.target.value
                            })}></textarea>
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="aboutCompany">About Company: </label>
                            <textarea id="aboutCompany" value={formData.aboutCompany} placeholder="Type about your company" onChange={(e) => setFormData({
                                ...formData, aboutcompany: e.target.value
                            })}></textarea>
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="skills">Skills Required: </label>
                            <input id="skills" value={formData.skills} type="text" placeholder="Enter the must have skills" onChange={(e) => setFormData({
                                ...formData, skills: e.target.value
                            })} />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor="information">Information: </label>
                            <input id="information" type="text" value={formData.information} placeholder="Enter the additional information" onChange={(e) => setFormData({
                                ...formData, information: e.target.value
                            })} />
                        </div>
                        <div className={styles.button_container}>
                            <button id={styles.cancel_btn} type="button">Cancel</button>
                            <button id={styles.add_btn} type="submit">+ Add Job</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div className={styles.right_newJob_container}>
                <h2>Recruiter add job details here</h2>
                <div className={styles.sideBannerImg}>
                    <img src={sideBanner} alt="side-banner" />
                </div>
            </div>
            
        </div>
    )
}

