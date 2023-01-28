import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import MessageGuide from '../comp_guide/Message_guide'
import { addToCart, removeFromCart } from '../../actions/cart_Actions'

const CartBody = ({ match, location, history }) => {
    const productId = match.params.id
    const counter = location.search ? Number(location.search.split('=')[1]) : 1
	const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, counter))
        }
    }, [dispatch, productId, counter])
    const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}
    return(
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageGuide>
                        <Link to="/">Inicio</Link>
                    </MessageGuide>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
									<Col md={2}>
										<Link to={`/product/${item.product}`}>
											<img src={item.url} alt={item.name} fluid rounded />
										</Link>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>R{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.counter}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}>
											{[...Array(item.stock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.counter, 0)})
								items
							</h2>
							<span className='push-to-right'>
								R
								{addDecimals(
									cartItems
										.reduce((acc, item) => acc + item.counter * item.price, 0)
										.toFixed(2)
								)}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
        </Row>
    )
}
export default CartBody