import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from '../Pages/TokenHelper';
import { useContext } from 'react';
import { RegistrationSchema } from '../Pages/Schemas';
import { userContext } from '../store';
import EcommerceService from "../services/ecommerce.service";

import { useNavigate } from "react-router-dom";


function Signup() {

    const { userState, dispatch } = useContext(userContext);
   
    const navigate = useNavigate();
   
    const dataSubmit = async (data) => {
       
        var fdata = new FormData();
       
        fdata.append("name", data.fullName);
        fdata.append("email", data.email);
        fdata.append("password", data.password);
        var response = await EcommerceService.signup(fdata);
        console.log(response.data,'response.data')
        if (response.data.status) {
            
           
         
            reset()
            navigate(`/login`)
            
            toast.success(response.data.message)

        } else {
            
            toast.error(response.data.error)
        }

        console.log(response.data)

    }
    const { register, handleSubmit, formState: { errors },reset, watch } = useForm({
        resolver: yupResolver(RegistrationSchema),
        mode: "all"
    });
    return (

        <section className="registration-form section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-8">
                        <div className="registration-form-inner login-area">
                            <div className="row align-items-center">
                            
                                <div className="col-12">
                                    <div className="registration-form-main">
                                    <h3>Create Account</h3>
                                        <form onSubmit={handleSubmit(dataSubmit)}>
                                        <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"{...register("fullName")}
                                                    placeholder="User Name"
                                                />
                                                <p style={{ color: 'red' }} className='form-field-error'>{errors.fullName?.message}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Email ID</label>
                                                <input
                                                    type="email"
                                                    className="form-control"{...register("email")}
                                                    placeholder="User Name / User ID"
                                                />
                                                <p style={{ color: 'red' }} className='form-field-error'>{errors.email?.message}</p>
                                            </div>
                                          
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password" {...register("password")}
                                                    className="form-control"
                                                    placeholder="********"
                                                />
                                                <p style={{ color: 'red' }} className='form-field-error'>{errors.password?.message}</p>
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                className="search-btn btn btn-primary"
                                            >Signup</button>
                                    
                                            
                                        </form>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
                
               
            </div>
        </section>



    )
}

export default Signup