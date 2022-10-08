import React, { useState } from "react";
import { apiEndpoint } from "../App";
import axios from "axios";
import { useEffect } from "react";
import DetailsList from "./DetailsList";

function Home() {
    //states and variables declarations

    const [users,setUsers] =  useState([]);
    const [search, setSearch] = useState("");
    const [updatedValues, setUpdatedValues] = useState({
        name: "",
        email: "",
        role: ""
    });
    const [page, setPage] = useState(0);

    const maxPerPage = 10;
    const allUserslength=users.length;
    let display = page * maxPerPage;

    //to render data
    useEffect(()=>{
        //get all users
        const getData = async () =>{
            try {
                const response = await axios.get(apiEndpoint);
                setUsers(response.data.map(user => {
                    return {...user, shouldEdit:false, isChecked:false}}));
            } catch (error) {
                alert(error);
            }
        }
        getData();      
    },[]);


    //search function
    const searchUser = (value) =>{
        setSearch(value);
    }
    

    //for delete button
    const deleteHandle = (id) =>{
        setUsers(
           users.filter((user) => {
              return id !== user.id;
           })
        );
    }

    //for edit button
    const editHandle = (id) =>{
        setUsers(users.map((user)=>{
            if(user.id === id){
               return ({...user,shouldEdit:true})
            } else {
                return ({...user})
            }
        }))
    }

    //to update existing value
    function updateValues(id){
        console.log(updatedValues);
        setUsers(users.map((user) => {
            if(user.id===id){
                return {...user,
                    name: updatedValues.name,
                    email: updatedValues.email,
                    role: updatedValues.role,
                    shouldEdit: false
                }
            } else{
                return user;
            }         
        }))
    }
    //to cancel update
    function cancelUpdate(id){
        setUsers(users.map(user => {
            if(user.id===id){
                user.shouldEdit= false
                return {...user}
            } else{
                return {...user};
            }         
        }));
    }

    //to check individual values on page
    const check = (id) =>{
        setUsers(users.map((user)=>{
            if(user.id===id){
                user.isChecked=user.isChecked===true?false:true;
                return {...user}
            }else{
                return {...user}
            }
        }));

    }

    //to check/select all values on page
    const checkAll = () =>{
        users.filter(function (item){
            if(search===""){
                return item;
            } 
            else if(item.name.includes(search) || item.role.includes(search) || item.email.includes(search)){
                return item;   
            }else{
                return null;
            }
        }).slice(display, display + maxPerPage)
        .map((user)=>{
                return check(user.id);
        });
        // console.log(users);
    }

    //to get allChecked users
    const getChecked = (users) =>{
        let arr=[]
        users.forEach(user => {
            if(user.isChecked){
                arr.push(user.id);
            }
        });
        deleteChecked(arr);
    }

    //to delete checked values
    const deleteChecked = (checkedArrayIds) =>{
            const deleteUsers = new Set(checkedArrayIds);
            const newUsers = users.filter((user)=>{
                return !deleteUsers.has(user.id);
            });
            setUsers(newUsers);
    }

    //handle page change
    const handlePageChange = (e) => {
        setPage(e.selected);
    };

    
    return (
        <div className="container">
            <input 
                id="searchbar" 
                type="text" 
                name="search" 
                placeholder="Search by name, email or role" 
                onChange={(event)=>searchUser(event.target.value)}
            />
            <DetailsList 
                users={users} 
                search={search}
                deleteHandle={deleteHandle}
                editHandle={editHandle}
                selectAll={checkAll}
                select={check}
                deleteChecked={getChecked}
                updatedValues={updatedValues}
                setUpdatedValues={setUpdatedValues}
                updateValues={updateValues}
                cancelUpdate={cancelUpdate}
                display={display}
                maxPerPage={maxPerPage}
                handlePageChange={handlePageChange}
                allUserslength={allUserslength}
            />
        </div>
    );
}

export default Home;