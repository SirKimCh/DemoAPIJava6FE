import React, { useEffect, useState } from 'react';
import { getStudentById } from '../services/api';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            const data = await getStudentById(id);
            setStudent(data);
        };
        fetchStudent();
    }, [id]);

    if (!student) return <div>Loading...</div>;

    return (
        <div>
            <h1>{student.name}</h1>
            <p>Phone: {student.phone}</p>
            <p>Email: {student.email}</p>
            <p>Address: {student.address}</p>
            <p>Major: {student.major}</p>
        </div>
    );
};

export default StudentDetail;