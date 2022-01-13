import { keyframes } from 'styled-components'

export const FadeIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`

export const FadeOut = keyframes`
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
`

export const Spin = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`

export const BounceIn = keyframes`
	0% {
		transform: scale(.8);
		opacity: 0;
	}
	15% {
		transform: scale(.8);
		opacity: 0;
	}
	25% {
		transform: scale(1.2);
		opacity: 1;
	}
	50% {
		transform: scale(1);
		opacity: 1;
	}
	90% {
		transform: scale(1);
		opacity: 1;
	}
	100% {
		transform: scale(.8);
		display: none;
		opacity: 0;
	}
`