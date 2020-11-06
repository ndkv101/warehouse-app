import { Jacket, Accessory, Shirt } from './components/Products'
import { Switch, Route, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'

const Navigation = styled.div`
	background: #f7d1ba;
	padding: 1em;
	text-align: center;
`

const App = () => {
	return (
		<Container>
			<div className='container'>
				<h2 className='header'>WAREHOUSE APP</h2>
				<Navigation>
					<Link to='/jackets'>JACKET</Link>
					<Link to='/shirts'>SHIRT</Link>
					<Link to='/accessories'>ACCESSORY</Link>
				</Navigation>

				<Switch>
					<Route path='/jackets'>
						<Jacket />
					</Route>
					<Route path='/shirts'>
						<Shirt />
					</Route>
					<Route path='/accessories'>
						<Accessory />
					</Route>
				</Switch>
			</div>
		</Container>
	)
}

export default App
