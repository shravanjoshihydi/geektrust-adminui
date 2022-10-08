import React, { useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

const DetailsList = (props) =>{

    const [totalPages, setTotalPages] = useState(Math.ceil(props.allUserslength / props.maxPerPage)); 
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");

    //handles name during edit
    function nameChange(event){
        setName(event.target.value);
        props.setUpdatedValues({
            ...props.updatedValues ,
            name: event.target.value                     
        });
    }

    //handles email during edit
    function emailChange(event){
        setEmail(event.target.value);
        props.setUpdatedValues({
            ...props.updatedValues,
            email: event.target.value                     
        });
    }

    //handles role during edit
    function roleChange(event){
        setRole(event.target.value);
        props.setUpdatedValues({
            ...props.updatedValues, 
            role: event.target.value        
        });
    }
  
    //function component to display table heading
    const TableHeading = () =>{
        return (
            <li className="list-item">
                <form className="grid-item">
                    <div className="grid-element heading" id="checkbox" >
                    CheckAll
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() =>props.selectAll()}
                        name="selectAll"
                    />
                    </div>
                    <div className="grid-element heading" id="name">
                        Name
                    </div>
                    <div className="grid-element heading" id="email">
                        Email
                    </div>
                    <div className="grid-element heading"  id="role">
                        Role
                    </div>
                    <div className="grid-element heading"  id="action">
                        Action
                    </div>    
                </form>                        
            </li>
        )
    }

    //function component to calculate number of pages visible for pagination when different operations are performed such as search or delete
    const FilterUsers = () =>{
        return (props.users.filter(function (item){
            if(props.search===""){
                return item;
            } 
            else if(item.name.includes(props.search) || item.role.includes(props.search) || item.email.includes(props.search)){
                return item;   
            }else{
                return null;
            }
        })
        );
    }

    //function component to display table body i.e. the content
    const TableContent = () =>{
       
        return (
            <>
                {props.users.filter(function (item){
                    if(props.search===""){
                        return item;
                    } 
                    else if(item.name.includes(props.search) || item.role.includes(props.search) || item.email.includes(props.search)){
                        return item;   
                    }else{
                        return null;
                    }
                }).slice(props.display, props.display + props.maxPerPage)
                .map((user)=>{
                return (
                    <li key={user.id} className="list-item">
                        <form className="grid-item">
                            <input 
                                type="checkbox" 
                                name="select"
                                className="checkbox" 
                                value={user.id}
                                checked={user.isChecked}
                                onChange={()=>props.select(user.id)}
                            />
                            <div className="grid-element" id="name">
                                {user.name}
                            </div>
                            <div className="grid-element" id="email">
                                {user.email}
                            </div>
                            <div className="grid-element" id="role">
                                {user.role}
                            </div>
                            <div className="grid-element" id="action">
                                <button className="edit" onClick={()=>props.editHandle(user.id)}>Edit</button>
                                <button className="delete" onClick={()=>props.deleteHandle(user.id)}>Delete</button>    
                            </div> 
                        </form>  
                        {user.shouldEdit && 
                            <form>
                                <input className="editInput" type="text" placeholder="Enter name" required value={name} onChange={(e)=>nameChange(e)} />
                                <input className="editInput" type="text" placeholder="Enter email" required value={email}  onChange={(e)=>emailChange(e)} />
                                <input className="editInput" type="text" placeholder="Enter role" required value={role} onChange={(e)=>roleChange(e)} />
                                <button 
                                    className="submit" 
                                    onClick={()=>{
                                        props.updateValues(user.id);
                                        setName("");
                                        setEmail("");
                                        setRole("");
                                    }}
                                >Submit</button>
                                <button className="cancel" onClick={()=>props.cancelUpdate(user.id)}>Cancel</button>
                            </form>
                        }                     
                        
                    </li>
                )
                })}
            </>
        );
    }


    useEffect(()=>{
        const handelPages = () =>{
            const allpages=FilterUsers();
            let pagesRange = Math.ceil(allpages.length / props.maxPerPage);
            setTotalPages(pagesRange);
        }
        handelPages();
        //eslint-disable-next-line
    },[props.search, props.users]);

    return(
        <div>
          <>
                <TableHeading />
                <TableContent />
                <div className="footer">
                    <button className="delete" onClick={()=>props.deleteChecked(props.users)}>Delete Checked</button>
                    <ReactPaginate 
                        activeClassName={'active'}
                        subContainerClassName={'pages pagination'}
                        containerClassName={'pagination'}
                        nextLabel=">"
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        pageRangeDisplayed={totalPages}
                        onPageChange={props.handlePageChange}
                        pageCount={totalPages}
                        className="pagination"
                    />
                </div>
            </>
        </div>
    );
}

export default DetailsList;