export const auth=(data)=>({
    type:"AUTH",
    payload:data
})
export const authLogout=()=>({
    type:'LOGOUT'
})