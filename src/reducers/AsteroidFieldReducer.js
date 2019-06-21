const initialState = {
	showModal: false,
};

export default function AsteroidFieldReducer(state=initialState, action) {
	switch (action.type) {
		case "OPEN_MODAL":
			return Object.assign({}, state, {
				showModal: true,
			});

		case "CLOSE_MODAL":
			return Object.assign({}, state, {
				showModal: false,
			});

		default:
			return state;
	}
};
