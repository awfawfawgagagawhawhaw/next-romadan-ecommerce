import { useState, useEffect, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Content = styled.div`
	height: 100%;
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

const Admin = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	if ( session && !session.isAdmin ) {
		router.push('/')
		return null
	}

	return (
		<Container>
			<Wrapper>
				<Content>
					
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Admin