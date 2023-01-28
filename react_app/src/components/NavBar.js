import React from "react";
import { Route, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import SearchBox from "./Search_Box";
import { LogOut } from "../actions/user_Actions";

const NavBar = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const LogOutHandler = () => {
        dispatch(LogOut())
    }
    return(
        <nav>
            <Link to="/">
                <h2>Inicio</h2>
            </Link>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <div>
                <Link to="/cart">
                    <h2>Cart</h2>
                </Link> 
                {userInfo ? (
                    <NavLink title={userInfo.name}>
                        <Link to="/profile">
                            <h2>Profile</h2>
                        </Link>
                        <button onClick={LogOutHandler}>LogOut</button>
                    </NavLink>
                ) : (
                    <Link to="login">
                        <h2>Login</h2>
                    </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                    <div title="Admin" id="adminmenu">
                        <NavLink to="/admin/userlist">
                            <h2><button>Users</button></h2>
                        </NavLink>
                        <NavLink to="/admin/productlist">
                            <h2><button>Products</button></h2>
                        </NavLink>
                        <NavLink to="/admin/orderlist">
                            <h2><button>Orders</button></h2>
                        </NavLink>
                    </div>
                )}          
            </div>
        </nav>
    )
}
export default NavBar