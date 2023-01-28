import React, {useState} from "react";
import {Form, Button, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormGuide from "./Form_guide";
import { CheckoutStepsGuide } from "./Checkout-Steps_Guide";
import { savePaymentMethod } from "../../actions/cart_Actions";

export const PaymentGuide = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shipping_Address} = cart

    const [payment_Method, set_Payment_Method] = useState('PayPal')
	const dispatch = useDispatch()

    if (!shipping_Address) {
        history.push("/shipping")
    }
    const submit_Handler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(payment_Method))
        history.push("/placeorder")
    }
    return (
        <FormGuide>
            <CheckoutStepsGuide step1 step2 step3 />
			<h1>Payment Method</h1>
            <Form onSubmit={submit_Handler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => set_Payment_Method(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
        </FormGuide>
    )
}