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
    GET_ITEM_TOTAL(state, payload) {
        state.pagination.total = payload
    },
    SET_ITEM_PAGINATION(state, payload) {
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
    getOneItem(ctx, payload) {
        ctx.commit('SET_ITEM_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        db.item.findOne({_id: 1}).exec((err, docs) => {
            ctx.dispatch('getItemTotal');
            ctx.commit('GET_ITEM', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },

    getItem(ctx, payload) {
        ctx.commit('SET_ITEM_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        db.item.find({}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getItemTotal');
            ctx.commit('GET_ITEM', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    deleteItem(ctx, payload) {
        db.item.remove({_id: payload._id}, (err, newDocs) => {
            ctx.dispatch("getItem");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    deleteAllItem(ctx, payload) {
        db.item.remove({}, {multi: true}, (err, newDocs) => {
            ctx.dispatch("getItem");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    updateItem(ctx, payload) {
        db.item.update({_id: payload._id}, payload.data, {}, (err, newDocs) => {
            ctx.dispatch("getItem");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    createItem(ctx, payload) {
        db.item.insert(payload, (err, newDocs) => {
            ctx.dispatch("getItem");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }

        })
    },
    getItemTotal(ctx, payload) {
        db.item.count({}, function (err, count) {
            ctx.commit('GET_ITEM_TOTAL', count);
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
    getters,
    mutations,
    actions
}
