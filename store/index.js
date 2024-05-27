import { legacy_createStore } from 'redux';
import addressReducer from './reducers/address';

const store = legacy_createStore(addressReducer);

export default store;
