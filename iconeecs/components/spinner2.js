import { Themes, SpinnerIcon, Spin } from 'iconeecs'
import styled from 'styled-components'

const Container = styled.div`
	backdrop-filter: blur(3px);
	height: calc(100vh - 70px);
	place-items: center;
	position: fixed;
	display: grid;
	z-index: 999;
	width: 100%;

	svg {
		animation: ${ Spin } 1s linear infinite;
		color: ${ Themes.Colors.Primary };
		height: 50px;
		width: 50px;
	}
`

export const Spinner2 = () => {
	return (
		<Container>
			<SpinnerIcon />
		</Container>
	)
}