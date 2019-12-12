const state = {
    main: 10
}

const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.main--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.main++
    }
}

const actions = {
    decCounter(context) {
        context.commit("DECREMENT_MAIN_COUNTER");
    },
    incCounter(context) {
        context.commit("INCREMENT_MAIN_COUNTER");
    },
    someAsyncTask({commit}) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
