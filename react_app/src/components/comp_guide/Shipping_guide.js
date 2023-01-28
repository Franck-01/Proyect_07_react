import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormGuide from './Form_guide'
import { CheckoutStepsGuide } from './Checkout-Steps_Guide'
import { saveShippingAddress } from '../../actions/cart_Actions'

export const ShippingGuide = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shipping_Address} = cart
    const dispatch = useDispatch()

    const [address, set_Address] = useState(shipping_Address.address)
    const [city, set_City] = useState(shipping_Address.city)
    const [postalCode, set_PostalCode] = useState(shipping_Address.postalCode)
    const [country, set_Country] = useState(shipping_Address.country)

    const submit_Handler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

    return (
        <FormGuide>
            <CheckoutStepsGuide step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submit_Handler}>
                <Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={(e) => set_Address(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={(e) => set_City(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						required
						onChange={(e) => set_PostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={(e) => set_Country(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
            </Form>
        </FormGuide>
    )
}