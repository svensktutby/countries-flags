import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import throttle from 'lodash.throttle';

import { rootReducer } from './root-reducer';
import * as api from '../config';
import { loadState, saveState } from '../utils';

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
        applyMiddleware(
            thunk.withExtraArgument({
                client: axios,
                api,
            }),
        ),
    ),
);

store.subscribe(
    throttle(() => {
        saveState({
            theme: store.getState().theme,
        });
    }, 1000),
);
