import db from "../../datastore";

const state = {
    list: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
};

const mutations = {
    GET_GOODS(state, payload) {
        state.list = payload
    },
};

const actions = {
    getAllGoods({commit}) {
        db.goods.find({}, (err, docs) => {
            commit('GET_GOODS', docs)
        });
    },
    deleteAllItem({dispatch}) {
        db.item.remove({}, {multi: true}, (err, newDocs) => {
            dispatch("getItem")
        })
    },
    createItem({dispatch}) {
        let doc = {name: "123"};
        db.item.insert(doc, (err, newDocs) => {
            dispatch("getItem")
        })
    },

};

export default {
    state,
    mutations,
    actions
}
