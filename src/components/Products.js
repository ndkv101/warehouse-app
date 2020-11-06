import React from 'react'
import Product from './Product'

const Jacket = () => {
	return (
		<React.Fragment>
			<Product type='jackets' />
		</React.Fragment>
	)
}

const Shirt = () => {
	return (
		<React.Fragment>
			<Product type='shirts' />
		</React.Fragment>
	)
}

const Accessory = () => {
	return (
		<React.Fragment>
			<Product type='accessories' />
		</React.Fragment>
	)
}

export { Jacket, Accessory, Shirt }
