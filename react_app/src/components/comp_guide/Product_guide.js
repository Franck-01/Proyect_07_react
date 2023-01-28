import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'

import LoaderGuide from './Loader_guide'
import MessageGuide from './Message_guide'
import { listProducts } from '../../actions/product_Actions'
import RatingGuide from './Rating_guide'

export const ProductCarouselGuide = () => {
	const dispatch = useDispatch()
    const productTopRated = useSelector((state) => state.productTopRated)
	const { loading, error, products } = productTopRated
	useEffect(
		() => {
			dispatch(listProducts())
		},
		[dispatch]
	)
	return loading ? (
		<LoaderGuide />
	) : error ? (
		<MessageGuide variant='danger'>{error}</MessageGuide>
	) : (
		<Carousel pause='hover' className='bg-light'>
			{products.map((product) => (
				<Carousel.Item key={product._id} interval={2000}>
					<Link to={`/product/${product._id}`}>
						<img src={product.url} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} ({product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}
export const ProductGuide = ({product}) => {
    return(
        <>
            <Link to={`/product/${product._id}`}>
                <img src={product.url}/>
            </Link>
            <div>
                <Link to={`/product/${product._id}`}>
                    <h1><strong>{product.name}</strong></h1>
                </Link>
                <div>
                    <RatingGuide
                        value={product.rating}
						text={`${product.numReviews} reviews`}
                    />
                    <h4>Modelo de nave : <i>{product.model}</i></h4>
                    <p>{product.description}</p>
                    <h3>Precio: <i>{product.price}</i></h3>
                </div>
            </div>
        </>
    )
}