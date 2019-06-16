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