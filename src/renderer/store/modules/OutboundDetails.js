import db from "../../datastore"

const model = {
    createdTime: undefined,
    // outboundNo: '',
    type: 0,
    typeName:'',//0是出库   1入库
    goodsName: '',
    barCode: '',
    price: 0,
    stock: 0,
    note: '',
};
const state = {
    list: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
};

const mutations = {
    GET_OUTBOUND_DETAILS(state, payload) {
        if(payload){
            payload.forEach((item,index) =>{
                item['No'] = index + 1;
                let type = item['type'];
                if(type === 0){
                    item['typeName'] = '出库';
                }else if(type === 1){
                    item['typeName'] = '入库';
                }
            })
        }
        state.list = payload
    },
    SET_OUTBOUND_DETAILS_TOTAL(state, payload) {
        state.pagination.total = payload
    },
    SET_OUTBOUND_DETAILS_PAGINATION(state, payload) {
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
    getOutboundDetails(ctx, payload) {
        ctx.commit('SET_OUTBOUND_DETAILS_PAGINATION', payload);
        let pageSize = state.pagination.pageSize;
        let skip = (state.pagination.current - 1) * pageSize;
        db.outbound.find({}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getOutboundDetailsTotal');
            ctx.commit('GET_OUTBOUND_DETAILS', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    //过滤出入库明细
    filteOutboundDetails(ctx, payload) {
        ctx.commit('SET_OUTBOUND_DETAILS_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        db.outbound.find({'goodsName': new RegExp(payload.name, 'i')}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getOutboundDetailsTotal');
            ctx.commit('GET_OUTBOUND_DETAILS', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },

    filteOutboundDetailsType(ctx, payload) {
        ctx.commit('SET_OUTBOUND_DETAILS_PAGINATION', payload);
        let pageSize = ctx.state.pagination.pageSize;
        let skip = (ctx.state.pagination.current - 1) * pageSize;
        db.outbound.find({'type': payload.type}).skip(skip).limit(pageSize).exec((err, docs) => {
            ctx.dispatch('getOutboundDetailsTotal');
            ctx.commit('GET_OUTBOUND_DETAILS', docs);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },

    getOutboundDetailsTotal(ctx, payload) {
        db.goods.count({}, function (err, count) {
            ctx.commit("SET_OUTBOUND_DETAILS_TOTAL", count);
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },

    deleteOutboundDetails(ctx, payload) {
        db.outbound.remove({_id: payload._id}, (err, newDocs) => {
            ctx.dispatch("getOutboundDetails");
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        })
    },
    // deleteAllOutboundDetails(ctx, payload) {
    //     db.outbound.remove({}, {multi: true}, (err, newDocs) => {
    //         ctx.dispatch("getOutboundDetails");
    //         if (payload) {
    //             if (payload.callback) {
    //                 payload.callback(err)
    //             }
    //         }
    //     })
    // },
    // updateOutboundDetails(ctx, payload) {
    //     db.outbound.update({_id: payload._id}, payload.data, {}, (err, newDocs) => {
    //         ctx.dispatch("getOutboundDetails");
    //         if (payload) {
    //             if (payload.callback) {
    //                 payload.callback(err)
    //             }
    //         }
    //     })
    // },
    //创建出入库明细
    createOutboundDetails(ctx, payload) {
        payload.createTime = new Date();
        db.outbound.insert(payload, (err, newDocs) => {
            ctx.dispatch("getOutboundDetails");
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
