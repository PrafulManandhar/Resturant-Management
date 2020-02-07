import {combineReducers} from 'redux';
import { loginReducer } from './Reducer/loginReducer';




export default combineReducers({
  login:loginReducer,

})