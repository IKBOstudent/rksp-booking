import React from 'react';
import { Provider } from 'react-redux';
import RootComponent from './RootComponent';
import { store } from './store/reducers/store';

import { ThemeProvider } from '@gravity-ui/uikit';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme="light">
                <RootComponent />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
