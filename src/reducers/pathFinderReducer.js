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

		case "SET_GRID":
			return Object.assign({}, state, {
				grid: action.payload.grid,
			});			

		case "CHANGE_TO_OBSTACLE":
			return update(state, {
				grid: {
					[action.payload.row]: {
						[action.payload.col]: {$set: -1},
					}
				}
			});

		case "CHANGE_TO_FREE":
			return update(state, {
				grid: {
					[action.payload.row]: {
						[action.payload.col]: {$set: 0},
					}
				}
			});



		default:
			return state;
	}
};
