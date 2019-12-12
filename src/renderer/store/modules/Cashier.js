const state = {
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

const mutations = {
    SET_ORDER(state, payload) {
        db.item.find({}, (err, docs) => {
            state.data = docs
        });
    },

    SET_CACHE_ORDER(state) {
        state.cacheOrder.push(state.order);
    },

    GET_CACHE_ORDER(state, payload) {
        state.order = state.cacheOrder.find((value, index) => index === payload);
    },
};

const actions = {
    // 添加商品
    clearOrder(ctx) {
    },

    // 添加商品
    createSubOrder(ctx, payload) {
    },
    // 删除商品
    deleteSubOrder(ctx, payload) {
    },
    // 清空商品
    cleanSubOrder(ctx, payload) {
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
    },
};

export default {
    state,
    mutations,
    actions
}
