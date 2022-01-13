import styled from 'styled-components'
import { SpinnerIcon } from '../icons'
import { Themes } from '../themes'
import { Spin } from '../animate'

const Container = styled.div`
	backdrop-filter: blur(3px);
	place-items: center;
	position: absolute;
	display: grid;
	height: 100vh;
	width: 100%;
	z-index: 999;

	svg {
		color: ${ Themes.Colors.Primary };
		animation: ${ Spin } 1s infinite;
		height: 50px;
		width: 50px;
	}
`

export const Spinner = () => {
	return (
		<Container>
			<SpinnerIcon />
		</Container>
	)
}