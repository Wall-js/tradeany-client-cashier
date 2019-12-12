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
    SET_GOODS(state, payload) {
        state.list = payload
    },
    SET_GOODS_TOTAL(state, payload) {
        state.pagination.total = payload
    },
    SET_GOODS_PAGINATION(state, payload) {
        if (payload) {
            if (payload.pagination) {
                if (payload.pagination.current) {
                    state.pagination.current = payload.pagination.current;
                }
                if (payload.pagination.pageSize) {
                    state.pagination.pageSize = payload.pagination.pageSize;
                }
            }

        }
    },
};

const actions = {
    getGoods(ctx, payload) {
        console.log("121212",payload);
        ctx.commit('SET_GOODS_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        db.goods.find({}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getGoodsTotal');
            ctx.commit('SET_GOODS', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    getGoodsTotal(ctx, payload) {
        db.goods.count({}, function (err, count) {
            ctx.commit("SET_GOODS_TOTAL", count);
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
