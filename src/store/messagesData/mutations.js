export default {
    addMessage(state, person){
        state.messagesData.push(person)
    },
    initState(state, messagesData){
        state.messagesData = messagesData
    }
}