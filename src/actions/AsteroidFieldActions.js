export const openModal = () => {
	return (dispatch) => {
		return dispatch({
			type: 'OPEN_MODAL',
		})
	}
}

export const closeModal = () => {
	return (dispatch) => {
		return dispatch({
			type: 'CLOSE_MODAL',
		})
	}
}
