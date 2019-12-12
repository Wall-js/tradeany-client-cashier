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
    getAllGoods(ctx) {
        db.goods.find({}, (err, docs) => {
            ctx.commit('GET_GOODS', docs)
        });
    },
    deleteAllGoods(ctx) {
        db.goods.remove({}, {multi: true}, (err, newDocs) => {
            ctx.dispatch("getItem")
        })
    },
    createGoods(ctx, payload) {
        db.goods.insert(payload, (err, newDocs) => {
            ctx.dispatch("getAllGoods")
        })
    },

};

export default {
    state,
    mutations,
    actions
}
