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
    CREATE_CASHIER_GOODS(state, payload) {
        const index = state.order.subOrder.findIndex((v) => (v._id === payload._id));
        if (index !== -1) {
            state.order.subOrder[index].quantity += 1;
        } else {
            state.order.subOrder.push(payload);
        }
        state.cacheOrder.push(state.order);
    },

    // 删除商品
    DELETE_CASHIER_GOODS(state, payload) {
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
    cleanSubOrder(ctx, payload) {
        ctx.commit("CLEAN_SUBORDER")
    },

    // 修改商品数量
    UpdateGoodsQuantity(ctx, payload) {
        ctx.commit("UPDATE_GOODS_QUANTITY")
    },

    // 添加商品
    createCashierGoods(ctx, payload) {
        ctx.commit("CREATE_CASHIER_GOODS")
    },
    // 删除商品
    deleteSubOrder(ctx, payload) {
        ctx.commit("DELETE_CASHIER_GOODS")
    },

    // 挂单
    setCacheOrder(ctx) {
        ctx.commit("SET_CACHE_ORDER")
    },

    // 提单
    getCacheOrder(ctx, payload) {
        ctx.commit("GET_CACHE_ORDER")
    },

    // 挂单删除
    deleteCacheOrder(ctx, payload) {
        ctx.commit("DELETE_CACHE_ORDER")
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
