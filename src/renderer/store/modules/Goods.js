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
        if(payload){
            payload.forEach((item,index)=>{
                item['No'] = index+1;
                item['isOperaText'] = [`修改`,`删除`]
            })
        }
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
        let list = ctx.state.list;
        let current = ctx.state.pagination.current;
        if(list.length === 1 && current !==1){
            let current = ctx.state.pagination.current - 1;
            ctx.commit("SET_GOODS_PAGINATION", {
                pagination: {
                    current: current,
                    pageSize: 10,
                }});
        }
        db.goods.remove({_id: payload._id}, (err, newDocs) => {
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
    namespaced: true,
    state,
    mutations,
    actions
}
