import db from "../../datastore"

const model = {
    // OrderNo: undefined,
    // PayNo: undefined,
    // OrderStatus: undefined,
    // OriginFee: undefined,
    // Discount: undefined,
    // PayFee: undefined,
    // PayTime: undefined,
    // VerDept: undefined,
    // UserUid: undefined,
    // UserName: undefined,
    // UserMobile: undefined,
    // IdNumber: undefined,
    // UserMem: undefined,
};

const state = {
    list: [],
    totalprice:0,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
};

const mutations = {
    GET_ORDER(state, payload) {
        payload.forEach((item)=>{
            let d = new Date(item.createTime);
            let times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            item['createTime'] = times;
        });
        state.list = payload
    },
    GET_ORDER_TOTAL(state, payload) {
        state.pagination.total = payload
    },
    SET_ORDER_PAGINATION(state, payload) {
        console.log(666,payload)
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
    getOrder(ctx, payload) {
        ctx.commit('SET_ORDER_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
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
    //订单过滤
    filterOrder(ctx, payload){
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        console.log(payload.filter.startTime);
        db.order.find({ 'createTime':{$lt: payload.filter.startTime}}).skip(skip).limit(pageSize).exec((err, docs) => {
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
    // createOrder(ctx, payload) {
    //     payload.createTime =new Date();
    //     db.order.insert(payload, (err, newDocs) => {
    //         ctx.dispatch("getOrder");
    //         if (payload) {
    //             if (payload.callback) {
    //                 payload.callback(err)
    //             }
    //         }
    //     })
    // },
    createOrder(ctx) {
        ctx.state.order.createTime =new Date();
        // payload.createTime =new Date();
        db.order.insert( ctx.state.order, (err, newDocs) => {
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
