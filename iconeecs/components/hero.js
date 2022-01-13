import styled, { keyframes } from 'styled-components'
import { Themes } from 'iconeecs'

const Items = styled.div`
	outline: 1px solid ${ props => props.theme.outline };
	box-shadow: ${ props => props.theme.shadow };
	border-radius: 5px;
	padding: 30px;

	&:nth-child(1) {
		grid-template-columns: 1fr 1fr;
		display: grid;
		gap: 30px;

		& > div {
			&:nth-child(1) {
				display: grid;
				grid-template-rows: 50px 15px 15px 0 50px;
				grid-template-columns: 1fr 50px 1fr;
				gap: 15px;

				& > span {
					background-color: ${ props => props.theme.secondary };
					display: flex;
					width: 100%;

					&:nth-child(1) {
						border-radius: 50px;
						grid-column: 2;
					}

					&:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5) {
						grid-column: 1 / span 3;
					}

					&:nth-child(2), &:nth-child(3), &:nth-child(4) {
						border-radius: 25px;
					}

					&:nth-child(4) {
						background-color: transparent;
						grid-column: 1 / span 2;
					}

					&:nth-child(5) {
						background-color: ${ Themes.Colors.Primary };
						color: hsl(0%, 0%, 100%);
						border-radius: 4px;
					}
				}
			}

			&:nth-child(2) {
				background-color: ${ props => props.theme.secondary };
				border-radius:  5px;
			}
		}
	}

	&:nth-child(2) {
		& > span {
			background-color: ${ props => props.theme.secondary };
			border-radius:  5px;
			place-items: center;
			display: grid;
			height: 100%;
			width: 100%;

			& > span {
				background-color: ${ Themes.Colors.Primary };
				border-radius: 50px;
				height: 100px;
				width: 100px;
			}
		}
	}

	&:nth-child(3) {
		grid-template-columns: 1fr 60px;
		grid-template-rows: 1fr 30px;
		display: grid;
		gap: 30px;
		
		& > span {
			&:nth-child(1) {
				grid-column: 1 / span 2;
			}

			&:nth-child(1), &:nth-child(2) {
				background-color: ${ props => props.theme.secondary };
				border-radius: 5px;
			}

			&:nth-child(3) {
				background-color: ${ Themes.Colors.Primary };
				border-radius: 4px;
			}
		}
	}

	&:nth-child(4) {
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: 1fr 1fr;
		display: grid;
		gap: 30px;

		& > span {
			background-color: ${ props => props.theme.secondary };
			border-radius: 5px;

			&:nth-child(4) {
				background-color: ${ Themes.Colors.Primary };
				border-radius: 4px;
			}

			&:nth-child(5) {
				grid-row: 1 / span 4;
				grid-column: 2;
			}
		}
	}
`

const Decoration = styled.div`
	grid-template-columns: 100px 350px 50px 50px 250px 50px;
	grid-template-rows: 250px 50px 250px;
	display: grid;
	width: auto;

	& > *:nth-child(1) {
		grid-column: 1 / span 3;
	}

	& > *:nth-child(2) {
		grid-column: 5 / span 6;
	}

	& > *:nth-child(3) {
		grid-column: 2;
		grid-row: 3;
	}

	& > *:nth-child(4) {
		grid-column: 4 / span 6;
		grid-row: 3;
	}
`

const wave = keyframes`
	from {
		background-position: 0;
	}
	to {
		background-position: 300px;
	}
`

const TextArea = styled.div`
	flex-direction: column;
	align-items: center;
	text-align: center;
	display: flex;
	width: 100%;

	& > span {
		width: 100%;

		&:nth-child(1) {
			margin-bottom: 30px;
			line-height: 60px;
			font-size: 5.0rem;
			font-weight: 900;

			span {
				background: linear-gradient(to right, #6FB1FC, #4364F7, #0052D4, #4364F7, #6FB1FC);
				animation: ${ wave } 3s linear infinite;
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
			}
		}

		&:nth-child(2) {
			margin-bottom: 50px;
			line-height: 30px;
			font-size: 2.0rem;
		}
	}

	button {
		background-color: ${ Themes.Colors.Primary };
		color: hsl(0, 0%, 100%);
		border-radius: 4px;
		font-size: 1.3rem;
		font-weight: 500;
		padding: 0 30px;
		height: 50px;
		widt: auto;
	}
`

const Section = styled.div`
	align-items: center;
	transition: .5s;
	display: flex;
	height: 100%;
	width: 100%;
`

const Wrapper = styled.div`
	position: relative;
	max-width: 1366px;
	display: flex;
	height: 100%;
	width: 100%;
`

const Container = styled.div`
	min-height: calc(100vh - 140px);
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	display: flex;
	width: 100%;

	${ Wrapper } {
		${ Section } {
			&:nth-child(1) {
				padding: 50px 30px;
				z-index: 1;
			}

			&:nth-child(2) {
				position: absolute;
				opacity: 0;
				left: 0;
			}
		}
	}

	@media (${ Themes.Device.Tablet }) {
		height: auto;

		${ Wrapper } {
			${ Section } {
				&:nth-child(1) {
				}

				&:nth-child(2) {
					opacity: .5;
					left: 50%;
				}
			}
		}
	}

	@media (${ Themes.Device.Laptop }) {
		max-height: calc(768px - 70px);
		height: calc(100vh - 70px);
		min-height: 0;

		${ Wrapper } {
			${ Section } {
				&:nth-child(1) {
					width: calc(1366px / 2);
					padding: 50px;

					${ TextArea } {
						align-items: flex-start;
						text-align: left;
					}
				}

				&:nth-child(2) {
					left: calc(1366px / 2);
					width: 2000px;
					opacity: 1;
				}
			}
		}
	}
`

export const Hero = () => {
	return (
		<Container>
			<Wrapper>
				<Section>
					<TextArea>
						<span>Romadan <span>Online Shop</span><br /> is finally here.</span>
						<span>One of the best Distributor Of Quality Water Filtration,<br /> Container, Bottles and Printing services.</span>
						<button>SHOP NOW</button>
					</TextArea>
				</Section>

				<Section>
					<Decoration>
						<Items>
							<div>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>

							<div>
								
							</div>
						</Items>

						<Items>
							<span>
								<span></span>
							</span>
						</Items>

						<Items>
							<span></span>
							<span></span>
							<span></span>
						</Items>

						<Items>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</Items>
					</Decoration>
				</Section>
			</Wrapper>
		</Container>
	)
}