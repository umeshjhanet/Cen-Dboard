import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Footer'
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import UpdateUserModal from './Components/UpdateUserModal';
import AddGroupModal from './Components/AddGroupModal';

const GroupManager = () => {
    const [group,setGroup] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        const fetchGroupData = () => {
            axios.get("http://localhost:5000/group_master")
            .then(response => setGroup(response.data))
            .catch(error => console.error(error))
        }
        fetchGroupData();
        const intervalID = setInterval(() => {
            fetchGroupData();
            
          }, 2000);
      
          return () => clearInterval(intervalID);
    },[]);

    const filteredGroups = group && group.filter(elem =>
        elem.group_name.toLowerCase().includes(searchQuery.toLowerCase()) 
      );

  return (
    <>
    <Header/>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-2 col-md-2'></div>
            <div className='col-lg-10 col-md-10'>
            <div
              className="card mt-3"
              style={{ padding: "5px", backgroundColor: "#4BC0C0" }}
            >
              <h6 className="" style={{ color: "white" }}>
                Master / Group Manager / Group List
              </h6>
            </div>
            <div className='user-form-card mt-3'>
                <div className='row'>
                    <div className='col-3'>
                        <button className='btn add-btn' onClick={handleOpenModal}>Add Group</button>
                    </div>
                    {isModalOpen && <AddGroupModal onClose={handleCloseModal} />}
                    <div className='col-2'></div>
                    <div className='col-5'>
                    <input
                  type='text'
                  style={{ width: '300px', height: '40px' }}
                  placeholder='Search by Group name... '
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                        <button className='btn search-btn mb-1'>Search</button>
                    </div>
                </div>
                <div className='row mt-5'>
                    <table className='user-tables table-bordered '>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Group Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups && filteredGroups.map((elem,index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem.group_name}</td>
                                    <td><BiEdit  style={{color:'blue',fontSize:'20px'}}/> / <RiDeleteBin5Line style={{color:'red',fontSize:'20px'}}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default GroupManager