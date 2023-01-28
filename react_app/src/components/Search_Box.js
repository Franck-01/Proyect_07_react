import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, set_Keyword] = useState("")
    const submit_Handler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}
    return (
		<Form onSubmit={submit_Handler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => set_Keyword(e.target.value)}
				placeholder='Search Products...'
				className='mr-sm-2 ml-sm-5'
			></Form.Control>
			<Button type='submit' className='btn btn-secondary p-2'>
				Search
			</Button>
		</Form>
	)
}
export default SearchBox