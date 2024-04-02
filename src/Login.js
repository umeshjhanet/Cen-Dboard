// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye'
// import { FaUserLarge } from "react-icons/fa6";
// import axios from 'axios';


// const Login = () => {
//   const [errorMessages, setErrorMessages] = useState({});
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState('password');
//   const [icon, setIcon] = useState(eyeOff);
//   const [userDB, setUserDB] = useState();
//   const navigate = useNavigate();
  
//   let API = "http://localhost:5000/login";
//   // let API = "https://backend-nodejs-nine.vercel.app/users"
//   const fetchAPIData = async(url) => {
//     try{
//       const res = await fetch(url);
//       const data = await res.json();
//       console.log("API response",data)
//       setUserDB(data);
//       console.log(...data[0].first_name);
//     }
//     catch(error){
//       console.log(error);
      
//     }
//   }
//   useEffect(() => {
//     fetchAPIData(API);
//   },[API])

//   const errors = {
//     username: "Invalid username",
//     password: "Invalid password"
//   };

 

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const { uname, password } = event.target.elements;

//     const userData = userDB.find((user) => user.user_email_id === uname.value);
//     // const userData = userDB.length > 0 ? userDB.find((user) => user.user_email_id === uname.value) : null;


//     if (userData) {
//       if (userData.password !== password.value) {
//         setErrorMessages({ name: "password", message: errors.password });
//       } else {
       
//         navigate('/dashboard')
//       }
//     } else {
//       setErrorMessages({ name: "uname", message: errors.user_email_id });
//     }
//   };
  

//   const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//       <div className="error mt-1" style={{marginLeft:'35px'}}>{errorMessages.message}</div>
//     );

//     const handleToggle = () => {
//       if (type==='password'){
//          setIcon(eye);
//          setType('text')
//       } else {
//          setIcon(eyeOff)
//          setType('password')
//       }
//    }

//   return (
//     <div className="">
//       <div style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL + '/login_image.png'})`,
//         height: "100vh",
//         marginTop: "0px",
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}>
//         <div className='container-fluid'>
//           <div className="form">
//             <form onSubmit={handleSubmit}>
//               <div className='login-card'>
//                 <div className="row">
//                 <div className="sign-in text-center">
//                 <h1 style={{ fontSize: '30px' }}>SIGN IN</h1>
//                 </div>
//                 </div>
//                 <div className="password-field mt-4 ms-2">
//                 <span class="flex justify-around items-start">
//                 <FaUserLarge className="me-2" size={20} color="gray"/>
//               </span>
//                 <input type='email' name='uname' placeholder='Username' className='password-inputbox' />
//                 </div>
//                 {renderErrorMessage('uname')}
//                 <div className="password-field mt-3 ms-2">
//                 <span class="flex justify-around items-start" onClick={handleToggle}>
//                   <Icon class="absolute me-2" icon={icon} size={20} style={{color:'gray'}}/>
//               </span>
//                 <input
//                   type={type}
//                   name="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   className="password-inputbox"
//              />
//               </div>
//               {renderErrorMessage('password')}
//               <p className="text-end mt-2 me-3" style={{color:'red',fontSize:'14px'}}>Forgot Password ?</p>
//                 <input type='submit' className='btn login-btn' placeholder="Log In"></input>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye'
// import { FaUserLarge } from "react-icons/fa6";

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [errorMessages, setErrorMessages] = useState({});

//   const [type, setType] = useState('password');
//   const [icon, setIcon] = useState(eyeOff);

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Send login request to backend
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ user_email_id: username, password: password })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Login successful
//         navigate('/dashboard');
//       } else {
//         // Login failed, display error message
//         setError(data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An unexpected error occurred. Please try again later.");
//     }
//   };

//   const errors = {
//         username: "Invalid username",
//         password: "Invalid password"
//       };
    

//   const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//       <div className="error mt-1" style={{marginLeft:'35px'}}>{errorMessages.message}</div>
//     );

//     const handleToggle = () => {
//       if (type==='password'){
//          setIcon(eye);
//          setType('text')
//       } else {
//          setIcon(eyeOff)
//          setType('password')
//       }
//    }

//   return (
//     <div className="">
//            <div style={{
//             backgroundImage: `url(${process.env.PUBLIC_URL + '/login_image.png'})`,
//             height: "100vh",
//             marginTop: "0px",
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//           }}>
//             <div className='container-fluid'>
//               <div className="form">
//                 <form onSubmit={handleSubmit}>
//                   <div className='login-card'>
//                     <div className="row">
//                     <div className="sign-in text-center">
//                     <h1 style={{ fontSize: '30px' }}>SIGN IN</h1>
//                     </div>
//                     </div>
//                     <div className="password-field mt-4 ms-2">
//                     <span class="flex justify-around items-start">
//                     <FaUserLarge className="me-2" size={20} color="gray"/>
//                   </span>
//                     <input type='email' name='uname' placeholder='Username' className='password-inputbox' />
//                     </div>
//                     {renderErrorMessage('uname')}
//                     <div className="password-field mt-3 ms-2">
//                     <span class="flex justify-around items-start" onClick={handleToggle}>
//                       <Icon class="absolute me-2" icon={icon} size={20} style={{color:'gray'}}/>
//                   </span>
//                     <input
//                       type={type}
//                       name="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       autoComplete="current-password"
//                       className="password-inputbox"
//                  />
//                   </div>
//                   {renderErrorMessage('password')}
//                   <p className="text-end mt-2 me-3" style={{color:'red',fontSize:'14px'}}>Forgot Password ?</p>
//                     <input type='submit' className='btn login-btn' placeholder="Log In"></input>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { FaUserLarge } from "react-icons/fa6";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [userDB, setUserDB] = useState();
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [logoutTimer, setLogoutTimer] = useState(null);


  const API = "http://192.168.3.119:81/users";

  const fetchAPIData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUserDB(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIData(API);
  }, [API]);

  useEffect(() => {
    const resetTimeout = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      const timer = setTimeout(() => {
        logout();
      }, 9000000); // 3 minutes
      setLogoutTimer(timer);
    };

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
      "scroll",
      "wheel"
    ];

    const resetTimeoutHandler = () => {
      resetTimeout();
    };

    for (const event of events) {
      window.addEventListener(event, resetTimeoutHandler);
    }

    resetTimeout();

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      for (const event of events) {
        window.removeEventListener(event, resetTimeoutHandler);
      }
    };
  }, [logoutTimer]);

  const logout = () => {
    console.log('Logging out due to inactivity.');
    navigate('/');
  };

  const errors = {
        username: "Invalid username",
        password: "Invalid password"
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, password } = event.target.elements;

    if (userDB.length > 0) {
      const userData = userDB.find((user) => user.user_email_id === uname.value);

      if (userData) {
        if (userData.password !== password.value) {
          setErrorMessages({ name: "password", message: errors.password });
        } else {
          navigate('/dashboard')
        }
      } else {
        setErrorMessages({ name: "uname", message: errors.username });
      }
    } else {
      console.log("User data is not available yet.");
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error mt-1" style={{ marginLeft: '35px' }}>{errorMessages.message}</div>
    );

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="username">Username:</label>
    //       <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    //   {error && <div className="error">{error}</div>}
    // </div>
    <div className="">
      <div style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/login_image.png'})`,
        height: "100vh",
        marginTop: "0px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
        <div className='container-fluid'>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className='login-card'>
                <div className="row">
                  <div className="sign-in text-center">
                    <h1 style={{ fontSize: '30px' }}>SIGN IN</h1>
                  </div>
                </div>
                <div className="password-field mt-4 ms-2">
                <span class="flex justify-around items-start">
                <FaUserLarge className="me-2" size={20} color="gray"/>
              </span>
              <input type="text" id="username"className='password-inputbox' value={username} onChange={(e) => setUsername(e.target.value)} />
                {/* <input type='email' name='uname' placeholder='Username' className='password-inputbox' /> */}
                </div>
                {renderErrorMessage('uname')}
                <div className="password-field mt-3 ms-2">
                  <span class="flex justify-around items-start" onClick={handleToggle}>
                    <Icon class="absolute me-2" icon={icon} size={20} style={{ color: 'gray' }} />
                  </span>
                  <input
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="password-inputbox"
                  />
                </div>
                {renderErrorMessage('password')}
                <p className="text-end mt-2 me-3" style={{ color: 'red', fontSize: '14px' }}>Forgot Password ?</p>
                <input type='submit' className='btn login-btn' placeholder="Log In"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


