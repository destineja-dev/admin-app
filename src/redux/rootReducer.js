import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import themeReducer from "./themeReducers";

export default combineReducers({
  themeReducer,
  form: formReducer
});
