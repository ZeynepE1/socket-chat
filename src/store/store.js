import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "../reducer/reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
	pReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
