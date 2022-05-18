import React from 'react';
import Router from './src/Router';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';



const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <PersistGate persistor={persistor}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <Router />
                    </SafeAreaView>
                </PersistGate>
            </PaperProvider>
        </Provider>
    );
};

export default App;
