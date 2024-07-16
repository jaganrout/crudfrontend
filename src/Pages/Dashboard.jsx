import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import TokenHelper from "./TokenHelper";
import { useContext } from "react";
import { LoginSchama } from "./Schemas";
import { userContext } from "../store";
import EcommerceService from "../services/ecommerce.service";

function Dashboard() {
  const { user, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [activePost, setActivePost] = useState(0);
  const [inactivePost, setInactivePost] = useState(0);

  useEffect(() => {
    getPostList();
    getListCount();
  }, []);
  var deleteAlert = async (id) => {
    Swal.fire({
      title: `Do you want to delete this post?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePost(id);
        getPostList();
      }
    });
  };
  const deletePost = async (id) => {
    const response = await EcommerceService.getDeletePost(id);
    return response;
  };
  const getPostList = async () => {
    try {
      const response = await EcommerceService.getPostList();
      if (response.data) {
        console.log(response.data, "response.data");
        setPostList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };
  const getListCount = async () => {
    try {
      const response = await EcommerceService.getListCount();
      if (response.data) {
        console.log(response.data, "response.data");
        setActivePost(response.data.data.activePosts); 
        setInactivePost(response.data.data.inactivePosts);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };
  
  console.log(postList, "postList");

  return (
    <>
      <div className="container">
        <div className="content-wrapper">
        <h1>Total Active Post {activePost}</h1>
        <h1>Total Inactive Post {inactivePost}</h1>
          <table className="table table-hover class=" table table-bordered>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Created By</th>
                <th style={{ paddingLeft: "410px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post, index) => (
                <tr key={index}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.location.coordinates[0]}</td>
                  <td>{post.location.coordinates[0]}</td>
                  <td>{post.status}</td>
                  <td>{post.createdBy}</td>
                  <td>
                    <td>
                      {" "}
                      <button
                        className="btnPrimary"
                        onClick={() =>
                          navigate("/updatepost", { state: { id: post?._id } })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btnPrimary"
                        onClick={() => deleteAlert(post?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
