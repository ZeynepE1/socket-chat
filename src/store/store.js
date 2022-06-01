import { createStore } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "../reducer/reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse, stringify, toJSON, fromJSON } from 'flatted';

// const { parse, stringify, toJSON, fromJSON } = require('flatted');

export const transformCircular = createTransform(
	(inboundState, key) => stringify(inboundState),
	(outboundState, key) => parse(outboundState),
)
const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
	transforms: [transformCircular]
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
	pReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
