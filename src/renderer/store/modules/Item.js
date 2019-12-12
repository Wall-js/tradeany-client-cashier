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
};

const actions = {
    getItem(ctx, payload) {
        // db.item.find({}, (err, docs) => {
        let pageSize = state.pagination.pageSize;
        let skip = (state.pagination.current - 1) * pageSize;
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
    state,
    mutations,
    actions
}
