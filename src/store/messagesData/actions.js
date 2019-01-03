export default {
    addMessage({ commit }, person){
        commit('addMessage', person)
    },  
    initState({ commit }, messagesData){
        commit('initState', messagesData)
    }  
}