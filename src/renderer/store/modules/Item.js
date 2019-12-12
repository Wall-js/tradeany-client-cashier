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
    GET_ITEM(state, payload) {
        state.list = payload
    },
    CREATE_ITEM(state) {
        db.item.find({}, (err, docs) => {
            state.data = docs
        });
    },
    DELETE_ITEM(state) {
        db.item.remove({}, (err, docs) => {
            state.data = docs
        });
    },
};

const actions = {
    deleteAllItem({dispatch}) {
        db.item.remove({}, {multi: true}, (err, newDocs) => {
            console.log(newDocs);
            dispatch("getItem")
        })
    },
    createItem({dispatch, commit}) {
        let doc = {name: "123"};
        db.item.insert(doc, (err, newDocs) => {
            dispatch("getItem")
        })
    },
    getItem({commit}) {
        db.item.find({}, (err, docs) => {
            console.log(docs)
            commit('GET_ITEM', docs);
        });
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
