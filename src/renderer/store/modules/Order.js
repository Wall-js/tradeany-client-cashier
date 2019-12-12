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
    GET_ORDER(state, payload) {
        state.list = payload
    },
    GET_ORDER_TOTAL(state, payload) {
        state.pagination.total = payload
    },
};

const actions = {
    getOrder(ctx, payload) {
        let pageSize = state.pagination.pageSize;
        let skip = (state.pagination.current - 1) * pageSize;
        db.order.find({}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getOrderTotal');
            ctx.commit('GET_ORDER', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    deleteOrder(ctx, payload) {
        db.order.remove({_id: payload._id}, (err, newDocs) => {
            ctx.dispatch("getOrder");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    deleteAllOrder(ctx, payload) {
        db.order.remove({}, {multi: true}, (err, newDocs) => {
            ctx.dispatch("getOrder");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    updateOrder(ctx, payload) {
        db.order.update({_id: payload._id}, payload.data, {}, (err, newDocs) => {
            ctx.dispatch("getOrder");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    createOrder(ctx, payload) {
        db.order.insert(payload, (err, newDocs) => {
            ctx.dispatch("getOrder");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }

        })
    },
    getOrderTotal(ctx, payload) {
        db.order.count({}, function (err, count) {
            ctx.commit('GET_ORDER_TOTAL', count);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
