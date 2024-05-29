import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        const loadPeople = async () => {
            const { data } = await axios.get('/api/csv/getallpeople')
            setPeople(data)
        }

        loadPeople()
    }, [])

    const loadPeople = async () => {
        const { data } = await axios.get('/api/csv/getallpeople')
        setPeople(data)
    }

    const onDeleteClick = async() => {
        await axios.post('/api/csv/delete')
        await loadPeople()
    }
    return (
        <div className="container" style={{ marginTop: '60px' }} >
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    <button className="btn btn-danger btn-lg w-100" onClick={onDeleteClick }>Delete All</button>
                </div>
                <table className="table table-hover table-striped table-bordered mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <tr>
                            <td>{p.id}</td>
                            <td>{p.firstName}</td>
                            <td>{p.lastName}</td>
                            <td>{p.age}</td>
                            <td>{p.address}</td>
                            <td>{p.email}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;