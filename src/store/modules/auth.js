export default {
    namespaced: true,
    state: {
        token: "",
        isLogin: false,
        user:{
            Name:"",
            Image:""
        }
    },
    mutations: {
        SET_AUTH(state, payload){
            state.token = payload.token,
            state.isLogin = payload.isLogin,
            state.user.Name = payload.user.Name,
            state.user.Image = payload.user.Image
        }
    },
    actions: {
        setAuth(context, payload){
            context.commit('SET_AUTH', {
                token:payload.token,
                isLogin:payload.isLogin,
                user:{
                    Name: payload.user.Name,
                    Image: payload.user.Image
                }
            })
        }
    },
}