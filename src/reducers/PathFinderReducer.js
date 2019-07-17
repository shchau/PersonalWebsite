import update from 'react-addons-update';

const initialState = {
	start: false,
	grid: [],
	finished: false,
};

export default function PathFinderReducer(state=initialState, action) {
	switch (action.type) {
		case "START":
			return Object.assign({}, state, {
				start: true,
				finished: false,
			});

		case "FINISH":
			return Object.assign({}, state, {
				start: false,
				finished: true,
			});
		

		case "SET_GRID":
			return Object.assign({}, state, {
				grid: action.payload.grid,
			});			

		case "CHANGE_GRID_CELL":
			if (!state.finished) {
				return update(state, {
					grid: {
						[action.payload.row]: {
							[action.payload.col]: {$set: action.payload.newValue},
						}
					}
				});
			}
			else {
				return {};
			}
			
		default:
			return state;
	}
};
