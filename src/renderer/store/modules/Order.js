const state = {
    order: {
        type: undefined,
        consumer: {
            uid: undefined,
            name: '游客',
            points: undefined,
            level: undefined,
        },
        subOrder: [],
        total: 0,
        activeKey: 'total'
    },
    cacheOrder: [],
};

const mutations = {
    GET(state) {
        db.item.find({}, (err, docs) => {
            state.data = docs
        });
    },
    DECREMENT_MAIN_COUNTER(state) {
        state.main--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.main++
    }
};

const actions = {
    get({commit}) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    },
    someAsyncTask({commit}) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
