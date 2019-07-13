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
		return new Promise((resolve, reject) => {
			dispatch({
				type: 'SET_GRID',
				payload: {
					grid: grid,
				}
			});
			
			resolve()
		});
	}
}

export const changeToObstacle = (position) => {
	return (dispatch) => {
		return dispatch({
			type: 'CHANGE_TO_OBSTACLE',
			payload: {
				row: position[0],
				col: position[1],
			}
		})
	}
}

export const changeToFree = (position) => {
	return (dispatch) => {
		return dispatch({
			type: 'CHANGE_TO_FREE',
			payload: {
				row: position[0],
				col: position[1],
			}
		})
	}
}