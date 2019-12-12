import db from "../../datastore";

const defaultState = {
    order: {
        type: undefined,
        consumer: {
            uid: undefined,
            name: '游客',
            points: undefined,
            level: undefined,
        },
        subOrder: [],
        total: 0,
        activeKey: 'total'
    },
    cacheOrder: [],
};


const state = Object.assign({}, defaultState);


const mutations = {
    // 清空收银台
    TOTAL(state) {
        state.order.total = state.order.subOrder.length > 0 ? state.order.subOrder.reduce((total, item, index) => {
            const a = numeral(item.goods_price);
            const b = a.multiply(item.quantity);
            const c = b.add(total);
            if (index === state.order.subOrder.length - 1) {
                return c.format('0.00');
            } else {
                return c.value();
            }
        }, 0) : 0;
    },

    // 清空收银台
    ClEAR_ALL(state) {
        state = defaultState;
    },

    // 清空订单
    ClEAR_ORDER(state) {
        state.order = defaultState.order
    },

    // 清空商品
    CLEAN_SUBORDER(state) {
        state.order.subOrder = []
    },

    // 添加商品
    CREATE_SUBORDER(state, payload) {
        console.log(payload);
        const index = state.order.subOrder.findIndex((v) => (v._id === payload._id));
        if (index !== -1) {
            state.order.subOrder[index].quantity += 1;
        } else {
            state.order.subOrder.push(payload);
        }
    },

    // 删除商品
    DELETE_SUBORDER(state, payload) {
        const subOrder = state.order.subOrder.filter(v => v._id !== payload._id);

        if (index !== -1) {
            state.order.subOrder[index].quantity += 1;
        } else {
            state.order.subOrder.push(payload);
        }
        state.cacheOrder.push(state.order);
    },

    // 编辑商品数量
    UPDATE_SUBORDER(state, payload) {
        const index = state.order.subOrder.findIndex((v) => (v._id === payload._id));
        if (index !== -1) {
            state.order.subOrder[index].quantity += 1;
        } else {
            state.order.subOrder.push(payload);
        }
        state.cacheOrder.push(state.order);
    },

    // 挂单
    SET_CACHE_ORDER(state) {
        state.cacheOrder.push(state.order);
        state.order = defaultState.order;
    },

    // 提单
    GET_CACHE_ORDER(state, payload) {
        state.order = state.cacheOrder.find((value, index) => index === payload);
    },

    // 挂单删除
    DELETE_CACHE_ORDER(state, payload) {
        state.cacheOrder = state.cacheOrder.filter((value, index) => index !== payload)
    },
};

const actions = {
    // 清空全部
    clearAll(ctx) {
        ctx.commit("ClEAR_ALL")
    },
    // 清空order
    clearOrder(ctx) {
        ctx.commit("ClEAR_ORDER")
    },
    // 清空商品
    cleanSubOrder(ctx) {
        ctx.commit("CLEAN_SUBORDER")
    },

    // 添加商品
    createSubOrder(ctx, payload) {
        db.goods.findOne({barCode: payload.barCode}, (err, doc) => {
            console.log(doc);
            if (doc) {
                doc.quantity = payload.quantity ? payload.quantity : 1;
                ctx.commit("CREATE_SUBORDER", doc);
                ctx.commit("TOTAL")
            }
            if (payload) {
                if (payload.callback) {
                    payload.callback(err)
                }
            }
        });
    },
    // 删除商品
    deleteSubOrder(ctx, payload) {
        ctx.commit("DELETE_SUBORDER", payload)
        ctx.commit("TOTAL")
    },
    // 编辑商品数量
    updateSubOrder(ctx, payload) {
        ctx.commit("UPDATE_SUBORDER", payload)
        ctx.commit("TOTAL")
    },

    // 挂单
    setCacheOrder(ctx) {
        ctx.commit("SET_CACHE_ORDER", payload)
    },
    // 提单
    getCacheOrder(ctx, payload) {
        ctx.commit("GET_CACHE_ORDER", payload)
    },
    // 挂单删除
    deleteCacheOrder(ctx, payload) {
        ctx.commit("DELETE_CACHE_ORDER", payload)
    },
};

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}
