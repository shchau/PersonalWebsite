import update from 'react-addons-update';

const initialState = {
	start: false,
	grid: [],
	allowGridChanges: true,
};

export default function PathFinderReducer(state=initialState, action) {
	switch (action.type) {
		case "START":
			return Object.assign({}, state, {
				start: true,
				allowGridChanges: false,
			});

		case "FINISH":
			return Object.assign({}, state, {
				start: false,
			});
		
		case "ALLOW_GRID_CHANGES":
			return Object.assign({}, state, {
				allowGridChanges: true,
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
