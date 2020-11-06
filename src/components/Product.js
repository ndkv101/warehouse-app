import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core'

const Product = ({ type }) => {
	const [products, setProducts] = useState([])
	const [availability, setAvailability] = useState([])
	const [brands, setBrands] = useState([])

	useEffect(() => {
		const fetchProductdata = async () => {
			try {
				if (type) {
					const products = await getProduct(type)
					setProducts(products)
					setBrands([...new Set(products.map(product => product.manufacturer))])
				}
			} catch (err) {
				console.error(err)
			}
		}
		fetchProductdata()
	}, [])

	useEffect(() => {
		const getPromiseData = async item => {
			return getAvailability(item)
		}

		const fetchAvailability = async () => {
			return Promise.all(brands.map(brand => getPromiseData(brand)))
		}

		fetchAvailability().then(data => setAvailability(data.flat(2)))
	}, [brands])

	const getProduct = async type => {
		const response = await axios.get(
			`https://bad-api-assignment.reaktor.com/products/${type}`
		)

		return response.data
	}

	const checkAvailability = id => {
		const productID = id.toUpperCase()
		const data = availability.find(item => item.id === productID)

		const regex = /\>(.*?)\</
		const state = data?.DATAPAYLOAD.match(regex)[1]

		return state
	}

	const getAvailability = async name => {
		try {
			let result = []
			do {
				const response = await axios.get(
					`https://bad-api-assignment.reaktor.com/availability/${name}`
				)
				result = result.concat(response.data.response)
			} while (result.length <= 1)

			return result
		} catch (err) {
			console.error(err.message)
		}
	}

	if (!products) {
		return null
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Color</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Manufacturer</TableCell>
						<TableCell>Availability</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map(product => (
						<TableRow key={product.id}>
							<TableCell>{product.type}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.color.map(color => color + '\t')}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell>{product.manufacturer}</TableCell>
							<TableCell>{checkAvailability(product.id)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Product
