import db from "../../datastore"

const state = {
    list: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
};

const mutations = {
    GET(state) {
        db.item.find({}, (err, docs) => {
            state.data = docs
        });
    },
    CREATE(state) {
        db.item.find({}, (err, docs) => {
            state.data = docs
        });
    },
    DELETE(state) {
        db.item.remove({}, (err, docs) => {
            state.data = docs
        });
    },
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
    state,
    mutations,
    actions
}
