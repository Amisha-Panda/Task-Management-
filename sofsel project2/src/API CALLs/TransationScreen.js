import { useState, useEffect } from "react";
const TransactionScreen = () => {

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


    let[name, setName] = useState('');
    let[Idproof, setIdproof] = useState('');
    let[Address, setAddress] = useState('');
    let[bookingfor, setBookingfor] = useState('');
    let[checkin, setCheckin] = useState('');
    let[checkout, setCheckout] = useState('');
    let[facilityget, setFacilityget] = useState('');


    let[transaction, setTransaction] = useState([]);

    const getTransaction = async() => {
        try{
            const response = await fetch("http://localhost:3333/transaction");
            const jsonData = await response.json();
            setTransaction(jsonData);
        } catch (err) {
            console.error(err.message); 
        }
    }

    useEffect(() => {
        getTransaction();
    }, []);

    const getsave = async(obj) => {
        try{
        let details = {name:name, Idproof:Idproof, Address:Address, bookingfor:bookingfor, checkin:checkin, checkout:checkout, facilityget:facilityget};
        let url = "http://localhost:3333/addtransaction";
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:"post",
            body:JSON.stringify(details)
        }
       
            await fetch(url, postData)
            .then(response=>response.json())
            .then(info=>{
                setTransaction(info);
                setName('');
                setIdproof('');
                setAddress('');
                setBookingfor('');
                setCheckin('');
                setCheckout('');
                setFacilityget('');
                obj.target.reset();
            })
        } 
        catch(err){
            console.log("Network Error Try After Sometime"); 
        }
    }

    const deleteTransaction = async(obj) => {
        let url = "http://localhost:3333/deletetransaction";

        let postData = {
          headers: { "content-type": "application/json" },
          method: "delete",
          body: JSON.stringify({ name: obj }),
        };

        await fetch(url, postData)
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            window.location.reload();
          });
    }

    const editTransaction = async(obj) =>{
        try{
            let details = {name:name, Idproof:Idproof, Address:Address, bookingfor:bookingfor, checkin:checkin, checkout:checkout, facilityget:facilityget};
            let url = "http://localhost:3333/Edittransaction";
            let postData = {
                headers:{'Content-Type':'application/json'},
                method:"put",
                body:JSON.stringify(details)
            }
        
            await fetch(url, postData)
            .then(response=>response.json())
            .then(info=>{ 
               setTransaction(info);
               setName('');
               setIdproof('');
               setAddress('');
               setBookingfor('');
               setCheckin('');
               setCheckout('');
               setFacilityget('');
            })
        } 
        catch(err){
            alert("Network Error Try After Sometime"); 
        }
    }

    const transationdetails = async(name) => {
        try{
            let url = "http://localhost:3333/transationdetails";

            let postData = {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({name:name})
            };
        
            await fetch(url, postData)
            .then((res) => res.json())
            .then((data) => {
                setName(data[0].name);
                setIdproof(data[0].Idproof);
                setAddress(data[0].Address);
                setBookingfor(data[0].bookingfor);
                setCheckin(data[0].checkin);
                setCheckout(data[0].checkout);
                setFacilityget(data[0].facilityget);
            });
        }
        catch(err){
            console.log("Error Try After Sometime"); 
        }
    }

    useEffect(() => {
        transationdetails();
    }, [])


    return(
        <div className="container">
            <h5 className="text-center">Transaction Screen</h5>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <lable>Name</lable>
                            <input type="text" className="form-control mb-3" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />

                            <lable>Id Proof</lable>
                            <select className="form-control mb-3" onChange={(e) => setIdproof(e.target.value)}>
                                <option>Choose Id Proof</option>
                                <option>Aadhar</option>
                                <option>Pan</option>
                                <option>Driving License</option>
                            </select>

                            <lable>Address</lable>
                            <input type="text" className="form-control mb-3" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />

                            <lable>Booking For</lable>
                            <select className="form-control mb-3" onChange={(e) => setBookingfor(e.target.value)}>
                                <option>Choose Booking For</option>
                                {
                                    room.map((rooms) => (
                                        <option>{rooms.available}</option>
                                    ))
                                }
                            </select>
                            
                            <lable>Check In</lable>
                            <input type="date" className="form-control mb-3"  onChange={(e) => setCheckin(e.target.value)}/>


                            <lable>facility get</lable>
                            <select className="form-control mb-3" onChange={(e) => setFacilityget(e.target.value)}>
                                <option>Choose facility get</option>
                                {
                                    facility.map((facility) => (
                                        <option>{facility.facilities}</option>
                                    ))
                                }
                            </select>

                            <div className="text-center">
                                {
                                    name && Idproof && Address && bookingfor && checkin && facilityget
                                    ? <button className="btn btn-primary mt-4" onClick={() => editTransaction()}>Update Details</button>
                                    : <button type="submit" className="btn btn-primary mt-4" onClick={getsave}>Save Details</button>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <div className="col-lg-12 mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Id Proof</th>
                            <th>Address</th>
                            <th>Booking For</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>facility get</th>
                            <th>Action</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            transaction.map((transactions, index) => (
                                <tr>
                                    <td key={index}>{transactions.name}</td>
                                    <td>{transactions.Idproof}</td>
                                    <td>{transactions.Address}</td>
                                    <td>{transactions.bookingfor}</td>
                                    <td>{transactions.checkin}</td>
                                    <td>{transactions.checkout}</td>
                                    <td>{transactions.facilityget}</td>
                                    <td><button className="btn btn-danger" onClick={deleteTransaction.bind(this, transactions.name)}>Delete</button></td>
                                    <td><button className="btn btn-primary" onClick={editTransaction}>Edit</button></td>
                                </tr>
                            ))   
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}   

export default TransactionScreen;