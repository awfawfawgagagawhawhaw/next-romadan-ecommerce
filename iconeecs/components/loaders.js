import styled from 'styled-components'
import { BounceIn } from '../animate'
import { LogoIcon } from '../icons'

const Container = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100vh;
	width: 100%;
	svg {
		animation: ${ BounceIn } 3.3s ease;
		height: 100px;
	}
`

export const Loaders = () => {
	return (
		<Container>
			<LogoIcon />
		</Container>
	)
}