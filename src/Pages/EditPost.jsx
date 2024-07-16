import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TokenHelper from "../Pages/TokenHelper";
import { PostSchema } from "../Pages/Schemas";
import { userContext } from "../store";
import EcommerceService from "../services/ecommerce.service";

function EditPost() {
  const { user, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const locationdata = useLocation();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
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
    GetupdatePost(locationdata.state.id)
  }, []);


  const GetupdatePost = async () => {
    const response = await EcommerceService.getEditPost(locationdata.state.id);
    console.log(response.data);

    if (response.data.status) {
      reset({
        title: response.data.data.title,
        description: response.data.data.description,
        status: response.data.data.status,
        latitude: response.data.data.latitude,
        longitude: response.data.data.longitude,
      });
    }
  };


  console.log(user, 'user')
  const dataSubmit = async (data) => {
    
    var fdata = new FormData();

    fdata.append("title", data.title);
    fdata.append("description", data.description);
    fdata.append("status", data.status);
    fdata.append("latitude", location.latitude);
    fdata.append("longitude", location.longitude);
    fdata.append("createdBy", user);

    try {
      var response = await EcommerceService.postEditPost( locationdata.state.id,fdata);
      console.log(response.data, "response.data");
      if (response.data.status) {
        reset();
        navigate(`/dashboard`);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error("An error occurred while submitting the data");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(PostSchema),
    mode: "all",
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
                    <h3>Edit Post</h3>
                    <form onSubmit={handleSubmit(dataSubmit)}>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("title")}
                          placeholder="Title"
                        />
                        <p
                          style={{ color: "red" }}
                          className="form-field-error"
                        >
                          {errors.title?.message}
                        </p>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          {...register("description")}
                          placeholder="Description"
                        />
                        <p
                          style={{ color: "red" }}
                          className="form-field-error"
                        >
                          {errors.description?.message}
                        </p>
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" {...register("status")}>
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <p style={{ color: "red" }} className="form-field-error">
                          {errors.status?.message}
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="search-btn btn btn-primary"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditPost;
