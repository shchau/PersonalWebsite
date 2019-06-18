const initialState = {
	start: false,
	startingPoint: 0,
	drawInstructions: "M 40, 10 L 90, 35",
};

export default function pathFinderReducer(state=initialState, action) {
	switch (action.type) {
		case "START":
			return Object.assign({}, state, {
				startingPoint: action.payload.startingPoint
			});

		case "SET_PATH":
			return Object.assign({}, state, {
				drawInstructions: action.payload.drawInstructions
			});			

		default:
			return state;
	}
};
