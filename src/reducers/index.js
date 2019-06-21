import { combineReducers } from 'redux';
import PathFinderReducer from './PathFinderReducer';
import AsteroidFieldReducer from './AsteroidFieldReducer';


export default combineReducers({
	PathFinderReducer,
	AsteroidFieldReducer,
});