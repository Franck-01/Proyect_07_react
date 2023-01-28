import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'


import MessageGuide from '../comp_guide/Message_guide'
import LoaderGuide from '../comp_guide/Loader_guide'
import FormGuide from '../comp_guide/Form_guide'
import { Login, Register, getUserDetails, updateUserProfile, listUsers, deleteUser, updateUser } from '../../actions/user_Actions'
import { listMyOrders } from '../../actions/order_Actions'
import { USER_UPDATE_PROFILE_RESET, USER_UPDATE_RESET } from '../../actions/constants/user_Constants'

export const LoginBody = ({location, history}) => {
    const [email, set_Email] = useState('')
	const [password, set_Password] = useState('')
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
	const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submit_Handler = (e) => {
        e.preventDefault()
        dispatch(Login(email, password))
    }
    return(
        <FormGuide>
            <h1>Sign In</h1>
            {error && <MessageGuide variant="danger">{error}</MessageGuide>}
            {loading && <LoaderGuide/>}
            <Form onSubmit={submit_Handler}>
            <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => set_Email(e.target.value)}
                ></Form.Control>
                <Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => set_Password(e.target.value)}
					></Form.Control>
				</Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
				</Col>
			</Row>
        </FormGuide>
    )
}
export const RegisterBody = ({location, history}) => {
    const [name, set_Name] = useState('')
	const [email, set_Email] = useState('')
	const [password, set_Password] = useState('')
	const [confirmPassword, setConfirm_Password] = useState('')
	const [message, set_Message] = useState(null)
	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister
	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect])

	const submit_Handler = (e) => {
		e.preventDefault()
		// Check if passwords match
		if (password !== confirmPassword) {
			set_Message('Passwords do not match')
		} else {
			// Dispatch register
			dispatch(Register(name, email, password))
		}
	}
    return (
		<FormGuide>
			<h1>Register</h1>
			{message && <MessageGuide variant='danger'>{message}</MessageGuide>}
			{error && <MessageGuide variant='danger'>{error}</MessageGuide>}
			{loading && <LoaderGuide />}
			<Form onSubmit={submit_Handler}>
				<Form.Group controlId='email'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={(e) => set_Name(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => set_Email(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => set_Password(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirm_Password(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>Register</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormGuide>
	)
}
export const ProfileBody = ({history}) => {
    const [name, set_Name] = useState('')
	const [email, set_Email] = useState('')
	const [password, set_Password] = useState('')
	const [confirmPassword, setConfirm_Password] = useState('')
	const [message, set_Message] = useState(null)
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                set_Name(user.name)
                set_Email(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    const submit_Handler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            set_Message('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id:user._id, name, email, password}))
        }
    }
    return(
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <MessageGuide variant='danger'>{message}</MessageGuide>}
                {error && <MessageGuide variant='danger'>{error}</MessageGuide>}
                {success && <MessageGuide variant='success'>Profile Updated</MessageGuide>}
                {loading && <LoaderGuide />}
                <Form onSubmit={submit_Handler} className='push-to-right'>
                    <Form.Group controlId='email'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => set_Name(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => set_Email(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => set_Password(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirm_Password(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                {loadingOrders ? (<LoaderGuide />
                ) : errorOrders ? (
                    <MessageGuide variant='danger'>{errorOrders}</MessageGuide>
                ) : (
                    <Table bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row> 
    )
}
export const UserListBody = ({ history }) => {
	const dispatch = useDispatch()

	const userList = useSelector((state) => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = userDelete

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			history.push('/login')
		}
	}, [dispatch, userInfo, history, successDelete])
	const delete_Handler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id))
		}
	}
	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<LoaderGuide />
			) : error ? (
				<MessageGuide variant='danger'>{error}</MessageGuide>
			) : (
				<Table bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<div to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</div>
								</td>
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => delete_Handler(user._id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}
export const UserEditBody = ({ match, history }) => {
	const userId = match.params.id
	const [name, set_Name] = useState('')
	const [email, set_Email] = useState('')
	const [isAdmin, setIs_Admin] = useState(false)
	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			history.push('/admin/userlist')
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				set_Name(user.name)
				set_Email(user.email)
				setIs_Admin(user.isAdmin)
			}
		}
	}, [successUpdate, dispatch, history, user, userId])
	const submit_Handler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}
	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormGuide>
				<h1>Edit User</h1>
				{loadingUpdate && <LoaderGuide />}
				{errorUpdate && <MessageGuide variant='danger'>{errorUpdate}</MessageGuide>}
				{loading ? (
					<LoaderGuide />
				) : error ? (
					<MessageGuide variant='danger'>{error}</MessageGuide>
				) : (
					<Form onSubmit={submit_Handler}>
						<Form.Group controlId='email'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => set_Name(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => set_Email(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIs_Admin(e.target.checked)}
							></Form.Check>
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