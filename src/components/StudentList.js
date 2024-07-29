import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../services/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await getAllStudents();
            setStudents(data);
        };
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        await deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <div>
            <h1>Student List</h1>
            <Link to="/students/new">Add New Student</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Major</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>{student.address}</td>
                            <td>{student.major}</td>
                            <td>
                                <Link to={`/students/${student.id}`}>View</Link>
                                <Link to={`/students/${student.id}/edit`}>Edit</Link>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;