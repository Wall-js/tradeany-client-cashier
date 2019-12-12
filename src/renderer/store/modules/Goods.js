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
    GET_GOODS(state, payload) {
        state.list = payload
    },
    GET_GOODS_TOTAL(state, payload) {
        state.pagination.total = payload
    },
};

const actions = {
    getGoodsTotal(ctx, payload) {
        db.goods.count({}, function (err, count) {
            ctx.commit("GET_GOODS_TOTAL", count);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    getGoods(ctx, payload) {
        // db.goods.find({}, (err, docs) => {
        let pageSize = state.pagination.pageSize;
        let skip = (state.pagination.current - 1) * pageSize;
        db.goods.find({}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch("getGoodsTotal");
            ctx.commit("GET_GOODS", docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    deleteGoods(ctx, payload) {
        db.goods.remove({_id: payload._id}, (err, newDocs) => {
            ctx.dispatch("getGoods");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    deleteAllGoods(ctx, payload) {
        db.goods.remove({}, {multi: true}, (err, newDocs) => {
            ctx.dispatch("getGoods");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    updateGoods(ctx, payload) {
        db.goods.update({_id: payload._id}, payload.data, {}, (err, newDocs) => {
            ctx.dispatch("getGoods");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    createGoods(ctx, payload) {
        db.goods.insert(payload, (err, newDocs) => {
            ctx.dispatch("getGoods");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }

        })
    },


};

export default {
    state,
    mutations,
    actions
}
