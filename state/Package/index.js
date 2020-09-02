import createStore from './Nice';
import initialState from '../InitialValue';
const { SProvider, store } = createStore({
    initialState: {
        ...initialState
    }
});
export {
    SProvider,
    store
};
