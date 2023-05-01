import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

function Student() {
    const [student, setStudent] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:8081/')
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, [])


    /*to delete the record with alert message*/

const  handleDelete = async (id) => {
try {
    await axios.delete('http://localhost:8081/students/' + id)
    window.location.reload()
} catch (err) {
    console.log(err);
}
}

    return (
        
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-90 bg-white rounded p-4'>
                <h1> Student Management System </h1>
                
            
            <Link to="/create" className='btn btn-success'> Add </Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th> FirstName </th>
                        <th> LastName</th>
                        <th> Location</th>
                        <th> Email </th>
                        <th> DOB </th>
                        <th> Education</th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, i) => ( 
                        <tr key={i}>
                            <td> {data.FirstName}</td>
                            <td> {data.LastName}</td>
                            <td> {data.Location}</td>
                            <td> {data.Email} </td>
                            <td> {data.DOB}</td>
                            <td> {data.Education}</td>
                            <td> 
                                <Link to={'update/${data.ID}'} className='btn btn-primary'> Edit</Link>
                                <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.ID)}> Delete</button>

                            </td>
                        </tr>
                    
                        ))
                    }
                </tbody>
            </table>
            </div>
        
        </div>
    )
}

export default Student;