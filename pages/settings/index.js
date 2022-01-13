import styled from 'styled-components'

const Content = styled.div`
	height: 100%;
	border: 1px solid red;
`

const Wrapper = styled.div`
	border-left: 1px solid ${ props => props.theme.outline };
	max-height: calc(100vh - 130px);
	overflow-y: scroll;
	max-width: 1366px;
	padding: 0 30px;
	height: 100%;
	width: 100%;
`

const Container = styled.div`
	background-color: ${ props => props.theme.background };
	justify-content: center;
	padding: 30px 0;
	display: flex;
`

const Settings = () => {
	return (
		<Container>
			<Wrapper>
				<Content>
					1
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Settings