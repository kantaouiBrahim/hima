export default {
    addTyper(state, typer){
        state.typers.push(typer)
    },
    removeTyper(state, typer){
        const typerIndex = state.typers.findIndex(t => t == typer)
        state.typers.splice(typerIndex, 1)
    }
}