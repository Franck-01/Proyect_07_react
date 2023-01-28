import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Table, ListGroup, Card, Button, Form } from 'react-bootstrap'

import RatingGuide from '../comp_guide/Rating_guide'
import MessageGuide from '../comp_guide/Message_guide'
import LoaderGuide from '../comp_guide/Loader_guide'
import MetaGuide from '../comp_guide/Meta_guide'
import PagsGuide from '../comp_guide/Pags_guide'
import FormGuide from '../comp_guide/Form_guide'
import { listProductDetails, createProductReview, listProducts, deleteProduct, createProduct, updateProduct } from '../../actions/product_Actions'

import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../../actions/constants/product_Constants'
import axios from 'axios'

export const ProductBody = ({history, match}) => {
    const [counter, set_Counter] = useState(1)
    const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successProductReview, product._id])
    const addToCart_Handler = () => {
		history.push(`/cart/${match.params.id}?counter=${counter}`)
	}
	const submit_Handler = (e) => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, {rating,comment})
		)
	}
    return(
        <>
            <Link to="/">Go Back</Link>
            {loading ? (
                <LoaderGuide/>
            ) : error ? (
                <MessageGuide variant="danger">{error}</MessageGuide>
            ) : (
                <>
                    <MetaGuide title={product.name}/>
                    <Row>
						<Col md='6'>
							<img src={product.image} alt={product.name} fluid />
						</Col>
						<Col md='3'>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<RatingGuide
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: R{product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md='3'>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>R{product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.stock > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.stock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Counter</Col>
												<Col>
													<Form.Control
														as='select'
														value={counter}
														onChange={(e) => set_Counter(e.target.value)}>
														{[...Array(product.stock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										{product.stock > 0 ? (
											<Button
												onClick={addToCart_Handler}
												className='btn-block'
												type='button'
											>
												<i className='fas fa-plus'></i>
												<span className='plus-sign-margin'>
													<i className='fas fa-shopping-cart'></i>
												</span>
												Add To Cart
											</Button>
										) : (
                                            <Button
												className='btn-block'
												type='button'
												disabled={product.stock === 0}>
												Sold Out
											</Button>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <MessageGuide>No Reviews</MessageGuide>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<RatingGuide value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && (
										<MessageGuide variant='success'>
											Review submitted successfully
										</MessageGuide>
									)}
									{loadingProductReview && <LoaderGuide />}
									{errorProductReview && (
                                        <MessageGuide variant='danger'>
                                            {errorProductReview}
                                        </MessageGuide>
                                    )}
									{userInfo ? (
										<Form className='push-to-right' onSubmit={submit_Handler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Control
													as='textarea'
													required
													row='3'
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												type='submit'
												disabled={loadingProductReview}
												variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<MessageGuide>Please <Link to='/login'>sign in</Link> to write a review</MessageGuide>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
                </>
            )}
        </>
    )
}
export const ProductListBody = ({history, match}) => {
	const page_Number = match.params.page_Number || 1
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector((state) => state.productDelete)
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

	useEffect(() => {
		dispatch({type: PRODUCT_CREATE_RESET})
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/login")
		}
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', page_Number))
		}
	}, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, page_Number])
	const delete_Handler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id))
		}
	}
	const createProduct_Handler = () => {
		dispatch(createProduct())
	}
	return(
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProduct_Handler}>
						<span className='plus-sign-margin'>
							<i className='fas fa-plus'></i>
						</span>
						Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <LoaderGuide />}
			{errorCreate && <MessageGuide variant='danger'>{errorCreate}</MessageGuide>}
			{loadingDelete && <LoaderGuide />}
			{errorDelete && <MessageGuide variant='danger'>{errorDelete}</MessageGuide>}
			{loading ? (
				<LoaderGuide />
			) : error ? (
				<MessageGuide variant='danger'>{error}</MessageGuide>
			) : (
				<>
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Model</th>
								<th>Faction</th>
								<th>Description</th>
								<th>Price</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.model}</td>
									<td>{product.faction}</td>
									<td>{product.description}</td>
									<td>{product.price}</td>
									<td>
										<div to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</div>
									</td>
									<td>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => delete_Handler(product._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<PagsGuide pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	)
}
export const ProductEditBody = ({match, history}) => {
	const productID = match.params.id
	const [name, set_Name] = useState("")
	const [model, set_Model] = useState("")
	const [faction, set_Faction] = useState("")
	const [description, set_Description] = useState("")
	const [url, set_Url] = useState("")
	const [price, set_Price] = useState(0)
	const [stock, set_Stock] = useState(0)

	const [uploading, set_Uploading] = useState(false)
	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const {loading, error, product} = productDetails
	const productUpdate = useSelector((state) => state.productUpdate)
	const {loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() =>{
		if (successUpdate) {
			dispatch({type: PRODUCT_UPDATE_RESET})
			dispatch(listProductDetails(productID))
			history.push("/admin/productList")
		}else{
			if(!product.name||product._id !== productID) {
				dispatch(listProductDetails(productID))
			}else{
				set_Name(product.name)
				set_Model(product.model)
				set_Faction(product.faction)
				set_Description(product.description)
				set_Url(product.url)
				set_Price(product.price)
				set_Stock(product.stock)
			}
		}
	}, [successUpdate, dispatch, history, product, productID])

	const upload_File_Handler = async (e) => {
		const file_manipulate = e.target.files[0]
		const form_Data = new FormData()
		form_Data.append("url", file_manipulate)
		set_Uploading(true)
		try{
			const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			}}
			const {data} = await axios.post('/api/upload', form_Data, config)
			set_Url(data)
			set_Uploading(false)
		} catch (error) {
			console.error(error)
			set_Uploading(false)
		}
	}

	const submit_Handler = (e) => {
		e.preventDefault()
		dispatch(updateProduct({
			_id: productID,
			name,
			model,
			faction,
			description,
			url,
			price,
			stock
		}))
	}

	return (
		<>
			<Link to='/admin/productlist'>Go Back</Link>
			<FormGuide>
				<h1>Edit Product</h1>
				{loadingUpdate && <LoaderGuide/>}
				{errorUpdate && <MessageGuide variant="danger">{errorUpdate}</MessageGuide>}
				{loading ? (
					<LoaderGuide />
				) : error ? (
					<MessageGuide variant='danger'>{error}</MessageGuide>
				) : (
					<Form onSubmit={submit_Handler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => set_Name(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="model">
							<Form.Label>Model</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={model}
								onChange={(e) => set_Model(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="faction">
							<Form.Label>Faction</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={faction}
								onChange={(e) => set_Faction(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => set_Description(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="url">
							<Form.Label>URL</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter url'
								value={url}
								onChange={(e) => set_Url(e.target.value)}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={upload_File_Handler}
							></Form.File>
							{uploading && <LoaderGuide />}
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								min='0'
								step='0.01'
								placeholder='Enter price'
								value={price}
								onChange={(e) => set_Price(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="stock">
							<Form.Label>Stock</Form.Label>
							<Form.Control
								type='number'
								min='0'
								step='1'
								placeholder='Enter count in stock'
								value={stock}
								onChange={(e) => set_Stock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormGuide>
		</>
	)
}