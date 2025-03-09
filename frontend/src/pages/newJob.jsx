import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
                    })
                })
                .catch(error => console.log(error))
        }
    }, [id])
    return(
        <div>
            <h1>New Job</h1>
            <form onSubmit={handleSubmit}>
                <input value={formData.title} type="text" placeholder="title" onChange={(e) => setFormData({
                    ...formData, title: e.target.value
                })} />
                <input value={formData.description} type="text" placeholder="description" onChange={(e) => setFormData({
                    ...formData, description: e.target.value
                })} />
                <input value={formData.location} type="text" placeholder="location" onChange={(e) => setFormData({
                    ...formData, location: e.target.value
                })} />
                <input value={formData.salary} type="text" placeholder="salary" onChange={(e) => setFormData({
                    ...formData, salary: e.target.value
                })} />
                <input value={formData.company} type="text" placeholder="company" onChange={(e) => setFormData({
                    ...formData, company: e.target.value
                })} />
                <input value={formData.skills} type="text" placeholder="skills" onChange={(e) => setFormData({
                    ...formData, skills: e.target.value
                })} />
                <input id="remote" checked={formData.remote} type="checkbox" placeholder="remote" onChange={(e) => setFormData({
                    ...formData, remote: e.target.checked
                })} />
                <label htmlFor="remote">Remote</label>
                <select value={formData.type} onChange={(e) => setFormData({
                    ...formData, type: e.target.value
                })}>
                    <option value="Full time">Full time</option>
                    <option value="Part time">Part time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

