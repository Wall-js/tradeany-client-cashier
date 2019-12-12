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
};

const actions = {
    deleteAllItem({dispatch}) {
        db.item.remove({}, {multi: true}, (err, newDocs) => {
            dispatch("getItem")
        })
    },
    createItem({dispatch},payload) {
        console.log(state.pagination);
        db.item.insert(payload, (err, newDocs) => {
            dispatch("getItem")
        })
    },
    getItem({commit}) {
        db.item.find({}, (err, docs) => {
            commit('GET_ITEM', docs);
        });
    },
};

export default {
    state,
    mutations,
    actions
}
