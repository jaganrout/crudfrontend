import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from '../Pages/TokenHelper';
import { useContext } from 'react';
import { LoginSchama } from '../Pages/Schemas';
import { userContext } from '../store';
import EcommerceService from "../services/ecommerce.service";

import { useNavigate } from "react-router-dom";


function Login() {

    const { userState, dispatch } = useContext(userContext);

    const navigate = useNavigate();
   
    const dataSubmit = async (data) => {
       
        var fdata = new FormData();
       
        fdata.append("email", data.email);
        fdata.append("password", data.password);
        var response = await EcommerceService.login(fdata);
        console.log(response.data,'response.data')
        if (response.data.status) {
           
         
           
           
            dispatch({ type: "tokendata", value: response.data.token });
            dispatch({ type: "id", value: response.data.id });
            dispatch({ type: "email", value: response.data.email });
          
            
            navigate(`/dashboard`)
            
            toast.success(response.data.message)

        } else {
        
            toast.error(response.data.message)
        }

        console.log(response.data)

    }
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(LoginSchama),
        mode: "all"
    });
    return (

        <section className="registration-form section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-8">
                        <div className="registration-form-inner login-area">
                            <div className="registration-form-main">
                            <h3>Login</h3>
                                <form onSubmit={handleSubmit(dataSubmit)}>
                                
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            className="form-control"{...register("email")}
                                            placeholder="Enter Email ID"
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
                                    >Login</button>

                                    <div className="row justify-content-between mt-4">
                                        <div className="col-sm-auto">
                                            <Link to="/signup">Create an Account</Link>
                                        </div>
                                    </div>
                            
                                    
                                </form>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </section>



    )
}

export default Login