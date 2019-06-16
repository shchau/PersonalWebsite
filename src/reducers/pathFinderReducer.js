const initialState = {
	start: false,
	startingPoint: 0,
};

export default function friendsReducer(state=initialState, action) {
	switch (action.type) {
		case "START":
			return Object.assign({}, state, {
				startingPoint: action.startingPoint
			});


		default:
			return state;
	}
};
