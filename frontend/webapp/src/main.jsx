import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {SnackbarProvider} from "notistack";
import {Provider} from 'react-redux';
import {store} from './appStore/store.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <SnackbarProvider>
                <App/>
            </SnackbarProvider>
        </Provider>
    </StrictMode>,
)
