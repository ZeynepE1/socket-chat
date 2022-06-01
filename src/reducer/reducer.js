import {
	LOGIN,
	LOGOUT,
	TIME,
	STUDENT,
	MESSAGE,
	SOCKET
} from '../action/types';

import Moment from 'moment';

const initialState = {
	userData: {},
	messageData2: [],
	socket: {}
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

		case SOCKET:
			return {
				...state,
				socket: action.payload,
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