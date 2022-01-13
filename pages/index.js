import styled from 'styled-components'
import { Hero } from 'iconeecs'

const Container = styled.div`
	background-color: hsl(230, 100%, 98%);
	height: 100vh;
	width: 100%;
`

const Home = () => {
	return (
		<>
			<Hero />
		</>
	)
}

export default Home