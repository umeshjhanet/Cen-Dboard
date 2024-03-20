import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Footer";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import UpdateUserModal from "./Components/UpdateUserModal";

const User_List = () => {
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationsMap, setLocationsMap] = useState({});
  const [privileges, setPrivileges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_email_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password: "",
    designation: "",
    phone_no: "",
    profile_picture: "",
    login_disabled_date: "",
    emp_id: "",
    locations: "",
    user_type: "",
    role_id: "",
    user_id: "",
    group_id: "",
    sl_id: "",
  });

  
 

  const handleDeleteUser = async (user_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/createuserdelete/${user_id}`
      );
      setUser(user.filter((elem) => elem.id !== user_id));
      console.log("User Deleted:", response.data);
    } catch (error) {
      console.error("There was an error in deleting data!", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get("http://localhost:5000/user_master")
        .then((response) => setUser(response.data))
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };

    // const fetchLocation = () => {
    //   axios.get("http://localhost:5000/locations")

    //     .then(response => setLocation(response.data))

    //     .catch(error => {
    //       console.error('Error fetching location data:', error);
    //     });

    // }
    // const fetchLocation = () => {
    //   axios.get("http://localhost:5000/locations")
    //     .then(response => {
    //       console.log("Location data:", response.data);
    //       setLocation(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching location data:', error);
    //     });
    // }

    const fetchLocation = () => {
      axios
        .get("http://localhost:5000/locations")
        .then((response) => {
          // Convert locations array into a map where LocationID is the key
          const map = {};
          response.data.forEach((location) => {
            map[location.LocationID] = location.LocationName;
          });

          console.log("Locations map:", map);
          console.log(response.data);
          setLocationsMap(map);
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    };

    const fetchPrivileges = () => {
      axios
        .get("http://localhost:5000/privilege")
        .then((response) => {
          setPrivileges(response.data);
        })
        .catch((error) => {
          console.error("Error fetching privileges:", error);
        });
    };

    fetchPrivileges();

    fetchUser();
    fetchLocation();

    const intervalID = setInterval(() => {
      fetchUser();
      fetchLocation();
      fetchPrivileges();
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  // Filter user data based on search query
  const filteredUsers = user.filter(
    (elem) =>
      elem.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elem.user_email_id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //   const getLocationNameById = (locations) => {
  //     const location = location.find(loc => loc.locations === locations);
  //     return location ? location.locationname : '';
  //   }

  const getLocationNameById = (locations) => {
    const locationArray = locations.split(",");
    let result = "";
    for (let i = 0; i < locationArray.length; i++) {
      const location = locationArray[i].trim();
      if (locationsMap.hasOwnProperty(location)) {
        result += locationsMap[location];
        if (i < locationArray.length - 1) {
          result += ",";
        }
      }
    }
    return result;
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2"></div>
          <div className="col-lg-10 col-md-10">
            <div className="row mt-4 me-1">
              <div
                className="card"
                style={{ padding: "5px", backgroundColor: "#4BC0C0" }}
              >
                <h6 className="text-center" style={{ color: "white" }}>
                  Masters / User List
                </h6>
              </div>
            </div>
            <div className="row user-list-card mt-3 mb-5">
              <div className="row">
                <input
                  type="text"
                  style={{ width: "300px", height: "30px" }}
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <table
                className="table-bordered mt-1 mb-5"
                style={{ width: "1000px" }}
              >
                <thead>
                  <tr>
                    <th>All</th>
                    <th>User Name</th>
                    <th>Designation</th>
                    <th>User Email</th>
                    <th>Phone</th>
                    <th>User Role</th>
                    <th>Locations Allotted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((elem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {elem.first_name} {elem.middle_name} {elem.last_name}
                      </td>
                      <td>{elem.designation}</td>
                      <td>{elem.user_email_id}</td>
                      <td>{elem.phone_no}</td>
                      <td>{elem.user_role}</td>
                      <td>{getLocationNameById(elem.locations)}</td>

                      <td>
                        <BiEdit onClick={handleOpenModal}  />
                        / <RiDeleteBin5Line onClick={() => handleDeleteUser(elem.user_id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isModalOpen && <UpdateUserModal onClose={handleCloseModal}/>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User_List;
