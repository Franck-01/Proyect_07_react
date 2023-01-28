import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {ProductGuide, ProductCarouselGuide} from '../comp_guide/Product_guide'
import MessageGuide from '../comp_guide/Message_guide'
import LoaderGuide from '../comp_guide/Loader_guide'
import PagsGuide from '../comp_guide/Pags_guide'
import MetaGuide from '../comp_guide/Meta_guide'
import { listProducts } from '../../actions/product_Actions'

const HomeBody = ({match}) => {
    const keyword = match.params.keyword
	const pageNumber = match.params.pageNumber || 1
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList
    useEffect(
		() => {
			dispatch(listProducts(keyword, pageNumber))
		}, [dispatch, keyword, pageNumber]
	)
    return (
		<>
			<MetaGuide />
			{!keyword ? (
				<ProductCarouselGuide/>
			) : (
				<Link to='/'>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<LoaderGuide />
			) : error ? (
				<MessageGuide variant='danger'>{error}</MessageGuide>
			) : (
				<>
                <div>
                    {products.map((product) => (
                        <div key={product._id} sm={12} md='6' lg={4} xl={3}>
                            <ProductGuide product={product} />
                        </div>
                    ))}
                </div>
                <PagsGuide
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}/>
				</>
			)}
		</>
	)
}
export default HomeBody