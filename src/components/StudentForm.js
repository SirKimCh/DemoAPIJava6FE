import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, getStudentById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        major: ''
    });

    useEffect(() => {
        if (id) {
            const fetchStudent = async () => {
                const data = await getStudentById(id);
                setFormData(data);
            };
            fetchStudent();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateStudent(id, formData);
        } else {
            await createStudent(formData);
        }
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            <input name="major" value={formData.major} onChange={handleChange} placeholder="Major" />
            <button type="submit">Save</button>
        </form>
    );
};

export default StudentForm;