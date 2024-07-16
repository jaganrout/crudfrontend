import React, { useContext, useEffect } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { userContext } from '../store';

function BasePage() {
  const { userState, dispatch } = useContext(userContext);

  useEffect(() => {
    // getLoginUserInfo()
    dispatch({ type: "firstLoad", value: "" });
  }, [])

  return (
    <>
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default BasePage