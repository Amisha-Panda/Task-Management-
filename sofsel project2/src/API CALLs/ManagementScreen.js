
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ManagementScreen = () => {
    let navigate = useNavigate();

    let[facility, setFacility] = useState([]);

    const getFacility = async() => {
        try{
            const response = await fetch("http://localhost:3333/facility");
            const jsonData = await response.json();
            setFacility(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getFacility();
    }, []);

    let[room, setRoom] = useState([]);

    const getRoom = async() => {
        try{
            const response = await fetch("http://localhost:3333/rooms");
            const jsonData = await response.json();
            setRoom(jsonData);
        } catch (err) {
            console.error(err.message); 
        }
    }

    useEffect(() => {
        getRoom();
    }, []);

    let[facilitiesget, setFacilitiesget] = useState('');

    let[tryavailable, setTryavailable] = useState('');
    const addFacility = async(obj) => {
        try{
            let details = {facilities: facilitiesget};
            let url = "http://localhost:3333/addFacility";
            let postData = {
                headers:{'Content-Type':'application/json'},
                method:"post",
                body:JSON.stringify(details)
            }
           
            await fetch(url, postData)
            .then(response=>response.json())
            .then(info=>{
                setTryavailable(info);
                setFacilitiesget('');
                obj.target.reset();
            })
        } 
        catch(err){
            console.log("Network Error Try After Sometime"); 
        }
    }

    const deleteFacility = async(obj) => {
        try{
            let url = "http://localhost:3333/deleteFacility";

            let postData = {
            headers: { "content-type": "application/json" },
            method: "delete",
            body: JSON.stringify({ nooffacility: obj }),
            };

            await fetch(url, postData)
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                window.location.reload();
            });
        }
        catch(err){
            console.log("Network Error Try After Sometime"); 
        }
    }


    let[available, setAvailable] = useState('');
    let[tryroom, setTryroom] = useState('');
    const addRoom = async(obj) => {
        try{
            let details = {available: available};
            let url = "http://localhost:3333/addroom";
            let postData = {
                headers:{'Content-Type':'application/json'},
                method:"post",
                body:JSON.stringify(details)
            }
           
            await fetch(url, postData)
            .then(response=>response.json())
            .then(info=>{
                setTryroom(info);
                setAvailable('');
                obj.target.reset();
                window.location.reload();
            })
        }
        catch(err){
            console.log("Network Error Try After Sometime"); 
        }
    }

    const deleteRoom = async(obj) => {
        try{
            let url = "http://localhost:3333/deleteroom";

            let postData = {
            headers: { "content-type": "application/json" },
            method: "delete",
            body: JSON.stringify({ roomNum: obj }),
            };

            await fetch(url, postData)
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                window.location.reload();
            });
        }
        catch(err){
            console.log("Network Error Try After Sometime"); 
        }
    }
    

    return(
        <div>
            <div className="container">
                <div className="row">
                    <h5 className="text-center">Management Screen</h5>
                    <div className="col-lg-4">
                        <div className="card">
                            <h5 className="text-center mt-3 mb-3">Facilities</h5>     
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>                
                            {
                                facility.map((facility) => (       
                                    <div className="card-body">
                                        <h6>
                                            <Link className="text-decoration-none text-dark">{facility.nooffacility} : {facility.facilities}</Link>
                                            <button className="btn btn-danger ms-5" onClick={deleteFacility.bind(this, facility.nooffacility)}>Remove</button>
                                        </h6>
                                    </div>                     
                                ))
                            }                      
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="text-center">
                            <button className="btn btn-primary mt-5" onClick={() => navigate(`/transaction`)}>Check In</button>
                        </div>
                    </div>

                    <div className="col-lg-4">
                    <div className="card">  
                        <h5 className="text-center mt-3 mb-3">Rooms</h5>  
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">Add</button>                 
                        {
                            room.map((rooms) => (       
                                <div className="card-body">
                                    <h6>
                                        <Link className="text-decoration-none text-dark">{rooms.roomNum} : {rooms.available}</Link>
                                        <button className="btn btn-danger ms-5" onClick={deleteRoom.bind(this, rooms.roomNum)}>Remove</button>
                                    </h6>
                                </div>                     
                            ))
                        }                      
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Facilities</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <label>Available</label>
                           <input type="text" className="form-control mb-3" placeholder="Enter Available" onChange={(e) => setFacilitiesget(e.target.value)} />

                           <button type="button" class="btn btn-primary" onClick={addFacility}>Save changes</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Rooms</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <label>Rooms</label>
                           <input type="text" className="form-control mb-3" placeholder="Enter Available Rooms" onChange={(e) => setAvailable(e.target.value)} />

                           <button type="button" class="btn btn-primary" onClick={addRoom}>Save changes</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagementScreen;