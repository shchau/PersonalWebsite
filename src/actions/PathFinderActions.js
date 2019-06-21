export const setStartingPoint = (index) => {
	return (dispatch) => {
		return dispatch({
			type: 'START',
			payload: {
				startingPoint: index,
			}
		})
	}
}

export const setDrawInstructions = (drawInstructions) => {
	return (dispatch) => {
		return dispatch({
			type: 'SET_PATH',
			payload: {
				drawInstructions: drawInstructions,
			}
		})
	}
}
