import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import TokenHelper from './TokenHelper';
import { useContext } from 'react';
import { LoginSchama } from './Schemas';
import { userContext } from '../store';
import EcommerceService from "../services/ecommerce.service";


function HomePage() {

  const { user, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getNearestPostList({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error("Unable to retrieve your location");
          console.error("Error retrieving location: ", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  }, []);
  const getNearestPostList = async (data) => {
    console.log(data)
    try {

      const response = await EcommerceService.getNearestPost(data);
      if (response.data) {
        console.log(response.data, "response.data");
        setPostList(response.data); 
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };


  console.log(postList, 'postList')

  return (
    <>
      <div className="container">
        <div className="content-wrapper" >



          <table className="table table-hover class=" table table-bordered>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {postList?.length > 0 ? (
                postList.map((post, index) => (
                  <tr key={index}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.location.coordinates[0]}</td>
                    <td>{post.location.coordinates[0]}</td>
                    <td>{post.status}</td>
                    <td>{post.createdBy}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No posts found</td>
                </tr>
              )}

            </tbody>
          </table>







        </div>
      </div>
    </>
  );
}

export default HomePage;
