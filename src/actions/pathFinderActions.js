export const startPathFinding = () => {
	return (dispatch) => {
		return dispatch({
			type: 'START',
			payload: {
			}
		})
	}
}

export const finishPathFinding = () => {
	return (dispatch) => {
		return dispatch({
			type: 'FINISH',
			payload: {
			}
		})
	}
}

export const allowGridChanges = () => {
	return (dispatch) => {
		return dispatch({
			type: 'ALLOW_GRID_CHANGES',
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

export const changeGridCell = (position, newValue) => {
	return (dispatch) => {
		return dispatch({
			type: 'CHANGE_GRID_CELL',
			payload: {
				row: position[0],
				col: position[1],
				newValue: newValue,
			}
		})
	}
}