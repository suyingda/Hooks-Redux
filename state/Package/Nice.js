import React, { useEffect, useContext, useReducer, createContext } from 'react';

/**
 * TODO Sky Hole &    state is global Status
 * @type {React.Context<{}>}
 */
export const AppContext = createContext({});
export default function createStore(params) {
    const { initialState } = {
        initialState: {},
        ...params
    };

    function MiddlewareReducer(lastState, action = {}) {
        let nextState = null;
        if (typeof action.reducer === 'function') {
            nextState = action.reducer(lastState);
        } else {
            nextState = { ...lastState, ...action };
        }
        return nextState;
    }
    const store = {
        _state: params,  //initial value
        dispatch: undefined,
        useContext: () => useContext(AppContext),
    };
    const SProvider = props => {
        const { children } = props || {};
        const [state, dispatch] = useReducer(MiddlewareReducer, initialState);
        useEffect(() =>
            () => {
                store.dispatch = undefined;   //aviod conflict
            }
        , []);
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                await dispatch(action);
            };
        }
        const RenderFlutter = {
            ...props,
            children: {
                ...children,
                ['props']: {
                    ...props,
                    ...state,
                }
            }
        };
        return <AppContext.Provider {...RenderFlutter} value={{ ...state, store: props.store }} />;
    };
    return {
        SProvider,
        store
    };
}
