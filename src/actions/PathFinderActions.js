export const setStartingPoint = (index) => {
	return (dispatch) => {
		return dispatch({
			type: 'START',
			payload: {
			}
		})
	}
}

export const setGrid = (grid) => {
	return (dispatch) => {
		return dispatch({
			type: 'SET_GRID',
			payload: {
				grid: grid,
			}
		})
	}
}
