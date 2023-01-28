import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageGuide from './Message_guide'
import { CheckoutStepsGuide } from './Checkout-Steps_Guide'
import { createOrder } from '../../actions/order_Actions'
import { USER_DETAILS_RESET } from '../../actions/constants/user_Constants'
import { ORDER_CREATE_RESET } from '../../actions/constants/order_Constants'

export const PlaceOrderGuide = ({history}) => {
    const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

    const add_Decimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = add_Decimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.counter, 0)
    )
    cart.shippingPrice = add_Decimals(cart.itemsPrice > 1000 ? 0 : 150)
	cart.taxPrice = add_Decimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice = add_Decimals(
		(
			Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice)
		).toFixed(2)
	)
    const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate
    const place_Order_Handler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}
	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
	}, [history, success])
    return (
        <>
            <CheckoutStepsGuide step1 step2 step3 step4/>
            <Row>
            <Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<span className='push-to-right'>
									<strong>Address: </strong>
									{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
									{cart.shippingAddress.postalCode},{' '}
									{cart.shippingAddress.country}
								</span>
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<span className='push-to-right'>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<MessageGuide>Your cart is empty</MessageGuide>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
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
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
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
									<Col>R{cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Shipping</Col>
									<Col>R{cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Tax</Col>
									<Col>R{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>R{cart.totalPrice}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <MessageGuide variant='danger'>{error}</MessageGuide>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems === 0}
									onClick={place_Order_Handler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
            </Row>
        </>
    )
}