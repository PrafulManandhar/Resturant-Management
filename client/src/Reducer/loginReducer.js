const initialState = {
  login: false
};
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state,login:true };
    case "LOGOUT":
      return { login:false };
    default:
      return { ...state};
  }
}
