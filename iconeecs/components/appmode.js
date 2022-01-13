import styled, { keyframes } from 'styled-components'
import { FadeIn, BounceIn } from '../animate'
import { SunIcon, MoonIcon } from '../icons'
import { Iconeecs } from 'sources/stores'
import { useContext } from 'react'

const Scale = keyframes`
	from {
		height: 0;
		width: 0;
	}

	to {
		height: 2500px;
		width: 2500px;
	}
`

const Text = styled.h1`
	color: ${ props => props.color };
	animation: ${ FadeIn } 1s ease;
	font-size: 1.5rem;
	font-weight: 400;
	margin-top: 50px;
`

const Wrapper = styled.div`
	text-align: center;
	z-index: 9;

	svg {
		animation: ${ BounceIn } 3s ease;
		height: 100px;
		width: 100px;
	}
`

const Container = styled.div`
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	display: flex;
	height: 100vh;
	width: 100%;

	span {
		background-color: ${ props => props.background };
		animation: ${ Scale } 1s ease;
		animation-delay: 2.5s;
		position: absolute;
		border-radius: 50%;
	}
`

export const AppMode = () => {

	const { state, dispatch } = useContext(Iconeecs)
	const { appmode } = state

	return (
		<Container background={ appmode.darkmode ? 'hsl(0, 0%, 100%)' : 'hsl(230, 30%, 10%)' }>
			<Wrapper>
				{ appmode.darkmode ? <SunIcon stroke={ appmode.darkmode ? 'hsl(0, 0%, 100%)' : 'hsl(230, 30%, 10%)' } /> : <MoonIcon stroke={ appmode.darkmode ? 'hsl(0, 0%, 100%)' : 'hsl(230, 30%, 10%)' } /> }
				
				<Text color={ appmode.darkmode ? 'hsl(0, 0%, 100%)' : 'hsl(230, 30%, 10%)' }>
					Switching to { appmode.darkmode ? 'Light Mode' : 'Dark Mode' }
				</Text>
			</Wrapper>

			<span></span>
		</Container>
	)
}