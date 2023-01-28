import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageGuide from "../comp_guide/Message_guide";
import LoaderGuide from "../comp_guide/Loader_guide";
import { getOrderDetails, payOrder, deliverOrder, listOrders } from "../../actions/order_Actions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../actions/constants/order_Constants";

export const OrderBody = ({match}) => {
    const order_ID = match.params.id
    const [sdkReady, set_SdkReady] = useState(false)
    const dispatch = useDispatch()

    const order_Details = useSelector((state) => state.orderDetails)
	const { order, loading, error } = order_Details

	const user_Login = useSelector((state) => state.userLogin)
	const { userInfo } = user_Login

	const order_Pay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay } = order_Pay

	const order_Deliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = order_Deliver

    if (!loading) {
        const add_Decimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}
        order.itemsPrice = add_Decimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.counter, 0)
		)
    }

    useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				set_SdkReady(true)
			}
			document.body.appendChild(script)
		}
		if (!order || successPay || successDeliver || order._id !== order_ID) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(order_ID))
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript()
			} else {
				set_SdkReady(true)
			}
		}
	}, [dispatch, order_ID, successPay, successDeliver, order]) // Dependencies, on change they fire off useEffect

	const deliver_Handler = () => {
		dispatch(deliverOrder(order))
	}
    return loading ? (
        <LoaderGuide/>
    ) : error ? (
        <MessageGuide variant="danger">{error}</MessageGuide>
    ) : (
        <>
            <Link
                to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
				className='btn btn-light my-3'
            >Go Back</Link>
            <h1>Order {order._id}</h1>
            <Row>
            <Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
                                <span className='push-to-right'>
                                    <strong>Name: </strong> {order.user.name}
                                </span>
                            </p>
							<p>
								<span className='push-to-right'>
									<strong>Email: </strong>
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
								</span>
							</p>
							<p>
								<span className='push-to-right'>
									<strong>Address: </strong>
									{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
									{order.shippingAddress.postalCode},{' '}
									{order.shippingAddress.country}
								</span>
							</p>
							{order.isDelivered ? (
								<MessageGuide variant='success'>
									Delivered on {order.deliveredAt}
								</MessageGuide>
							) : (
								<MessageGuide variant='danger'>Not Delivered</MessageGuide>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<span className='push-to-right'>
									<strong>Method: </strong>
									{order.paymentMethod}
								</span>
							</p>
							{order.isPaid ? (
								<MessageGuide variant='success'>Paid on {order.paidAt}</MessageGuide>
							) : (
								<MessageGuide variant='danger'>Not Paid</MessageGuide>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<MessageGuide>Your order is empty</MessageGuide>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.counter} x R{item.price} = R{item.counter * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Items</Col>
									<Col>R{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Shipping</Col>
									<Col>R{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Tax</Col>
									<Col>R{order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>R{order.totalPrice}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							{loadingDeliver && <LoaderGuide />}
							{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<ListGroup.Item>
									<Button
										type='button'
										className='btn btn-block'
										onClick={deliver_Handler}
									>Mark As Delivered</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
            </Row>
        </>
    )
}
export const OrderListBody = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

    useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, userInfo, history])
    return ( 
        <>
            <h1>Orders</h1>
            {loading ? (
                <LoaderGuide/>
            ) : error ? (
                <MessageGuide variant="danger">{error}</MessageGuide>
            ) : (
                <Table bordered hover responsive className='table-sm'>
                    <thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th>Info</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>R{order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDeliverd ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<Link to={`/order/${order._id}`}>
										<Button className='btn-sm' variant='light'>
											Details
										</Button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
                </Table>
            )}
        </>
    )
}