export default {
    addTyper({ commit }, typer){
        commit('addTyper', typer)
    },
    removeTyper({ commit }, typer){
        commit('removeTyper', typer)
    }
}