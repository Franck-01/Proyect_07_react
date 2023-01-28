import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomeBody from './comp_body/Home_body'
import {ProductBody, ProductListBody, ProductEditBody} from './comp_body/Product_body'
import CartBody from './comp_body/Cart_body'
import { ShippingGuide } from './comp_guide/Shipping_guide'
import { PaymentGuide } from './comp_guide/Payment_guide'
import { OrderBody, OrderListBody } from './comp_body/Order_body'
import { PlaceOrderGuide } from './comp_guide/Place_Order_guide'
import { LoginBody, RegisterBody, ProfileBody, UserListBody, UserEditBody } from './comp_body/User_body'

const Main = () => {
    return(
        <main>
            <Route path="/login" component={LoginBody}/>
            <Route path="/register" component={RegisterBody}/>
            <Route path="/profile" component={ProfileBody}/>
            <Route path='/shipping' component={ShippingGuide}/>
            <Route path='/payment' component={PaymentGuide}/>
            <Route path='/placeorder' component={PlaceOrderGuide}/>
            <Route path="/order/:id" component={OrderBody}/>
            <Route path='/product/:id' component={ProductBody} />
            <Route path="/cart/:id?" component={CartBody}/>
            <Route path='/admin/userlist' component={UserListBody} />
            <Route path='/admin/user/:id/edit' component={UserEditBody} />
            <Route path='/admin/productlist' component={ProductListBody} exact/>
            <Route path='/admin/productlist/:pageNumber' component={ProductListBody} exact/>
            <Route path='/admin/product/:id/edit' component={ProductEditBody}/>
            <Route path='/admin/orderlist' component={OrderListBody}/>
            <Route path="/admin/:keyword" component={HomeBody} exact/>
            <Route path='/search/:keyword/page/:pageNumber' component={HomeBody} exact />
            <Route path='/page/:pageNumber' component={HomeBody} exact />
            <Route path='/' component={HomeBody} exact />
        </main>
    )
}
export default Main