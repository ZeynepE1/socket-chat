import {
	LOGIN,
	LOGOUT,
	TIME,
	STUDENT,
	MESSAGE
} from '../action/types';

import Moment from 'moment';

const initialState = {
	userData: {},
	messageData2: []
};

function reducers(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			const { user, token } = action.payload;
			return {
				...state,
				userData: {
					user

				},
			};
		case LOGOUT:
			return {
				...state,
				userData: {}
			};

		case MESSAGE:
			//const {data} = action.payload;
			return {
				...state,
				messageData2: action.payload
			};
		default:
			return state;
	}
};

export default reducers;