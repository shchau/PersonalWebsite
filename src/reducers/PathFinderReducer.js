import update from 'react-addons-update';

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

		case "FINISH":
			return Object.assign({}, state, {
				start: false,
			});
		

		case "SET_GRID":
			return Object.assign({}, state, {
				grid: action.payload.grid,
			});			


		case "CHANGE_GRID_CELL":
			return update(state, {
				grid: {
					[action.payload.row]: {
						[action.payload.col]: {$set: action.payload.newValue},
					}
				}
			});
			
		default:
			return state;
	}
};
