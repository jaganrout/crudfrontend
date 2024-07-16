import React from 'react';
import { useContext } from 'react';
import { userContext } from '../store';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Header() {
    const { user, dispatch } = useContext(userContext);
    const navigate = useNavigate();
    // console.log(user)


    const Logout = () => {
        
        dispatch({ type: "reset", valuse: "" });
        // localStorage.clear(); 
        // setIsLoggedIn(true);
        navigate('/')
        // window.location.reload();
        toast.success("Logout Successfully")
    };
    return (
        <>
            <>
                {/*Header Start*/}
                <header className="header sticky-top">
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div
                                className="logo col-auto"
                                data-aos="fade-down"
                                data-aos-duration={1500}
                            >
                                
                            </div>
                            <div className="col-auto">
                                <div className="row align-items-center gx-2">
                                 <div className="col-auto header-btn-area">
                                
                                      {!user.tokendata && <Link className="btn btn-primary me-2" to="/login">
                                            Sign In
                                        </Link>}
                                        {!user.tokendata && <Link className="btn btn-primary me-2" to="/signup">
                                            Sign Up
                                        </Link>}
                                        {user.tokendata && 
                                                <Link className="btn btn-primary me-2" onClick={Logout}>
                                                        Sign Out
                                                    </Link >}
                                            <Link className="btn btn-primary me-2" to="/addpost">
                                            AddPost
                                        </Link>
                                        <Link className="btn-topmenu btn btn-primary" to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </>

        </>
    )
}

export default Header