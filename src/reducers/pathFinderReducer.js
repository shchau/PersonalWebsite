const initialState = {
	start: false,
	grid: [],
};

export default function PathFinderReducer(state=initialState, action) {
	switch (action.type) {
		case "START":
			return Object.assign({}, state, {
				start: true,
			});

		case "SET_GRID":
			return Object.assign({}, state, {
				grid: action.payload.grid,
			});			

		default:
			return state;
	}
};
