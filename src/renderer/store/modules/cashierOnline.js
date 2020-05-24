import db from "../../datastore";
import numeral from 'numeral';
import axios from 'axios';

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
        qtyTotal: 0,
        activeKey: 'total'
    },
    cacheOrder: [],
    list: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
};

const state = Object.assign({}, defaultState);
// const state = {...defaultState};

const mutations = {
    SET_GOODS(state, payload) {
        if(payload.list){
            payload.list.forEach((item,index)=>{
                item['No'] = index+1;
            })
        }
        state.list = payload.list;
        state.pagination=payload.pagination;
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
    //总单
    TOTAL_ORDER(state) {
        //此处添加计算小计  计算总数量
        let subOrder = state.order.subOrder;
        let qtyTotal = 0;
        if (state.order.subOrder) {
            subOrder.forEach(item => {
                item.subTotal = item.quantity * item.price;
                qtyTotal += item.quantity
            })
        }
        state.order.qtyTotal = qtyTotal;
        state.order.total = state.order.subOrder.length > 0 ? state.order.subOrder.reduce((total, item, index) => {
            const a = numeral(item.price);
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
        state = {
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
                qtyTotal: 0,
                activeKey: 'total'
            },
            cacheOrder: [],
        };
    },

    // 清空订单
    ClEAR_ORDER(state) {
        state.order = {
            type: undefined,
            consumer: {
                uid: undefined,
                name: '游客',
                points: undefined,
                level: undefined,
            },
            subOrder: [],
            total: 0,
            qtyTotal: 0,
            activeKey: 'total'
        }
    },

    // 清空商品
    CLEAN_SUBORDER(state) {
        state.order.subOrder = [];
        state.order.total = 0
    },

    // 添加商品
    CREATE_SUBORDER(state, payload) {
        const index = state.order.subOrder.findIndex((v) => (v._id === payload._id));
        if (index !== -1 && payload.stock > state.order.subOrder[index].quantity) {
            state.order.subOrder[index].quantity += 1;
        } else if (index === -1) {
            state.order.subOrder.push(payload);
        }
    },

    // 删除商品
    DELETE_SUBORDER(state, payload) {
        // const subOrder = state.order.subOrder.filter(v => v._id !== payload._id);
        //
        // if (index !== -1) {
        //     state.order.subOrder[index].quantity += 1;
        // } else {
        //     state.order.subOrder.push(payload);
        // }
        // state.cacheOrder.push(state.order);
        // state.order.subOrder.splice(payload.index,1);
        state.order.subOrder = state.order.subOrder.filter((value, index) => index !== payload.index)
        // state.order.subOrder[payload.index].quantity = payload.quantity
    },

    // 编辑商品数量
    UPDATE_SUBORDER(state, payload) {
        // const index = state.order.subOrder.findIndex((v) => (v._id === payload._id));
        // if (index !== -1) {
        //     state.order.subOrder[index].quantity = payload.quantity;
        // } else {
        //     state.order.subOrder.push(payload);
        // }
        // state.cacheOrder.push(state.order);
        state.order.subOrder[payload.index].quantity = payload.quantity
    },

    // 挂单
    SET_CACHE_ORDER(state) {
        console.log(state.order);
        state.cacheOrder.push({...state.order});
        state.order = {
            type: undefined,
            consumer: {
                uid: undefined,
                name: '游客',
                points: undefined,
                level: undefined,
            },
            subOrder: [],
            total: 0,
            qtyTotal: 0,
            activeKey: 'total'
        };
    },

    // 提单
    GET_CACHE_ORDER(state, payload) {
        state.order = state.cacheOrder.find((value, index) => index === payload.index);
        state.cacheOrder = state.cacheOrder.filter((value, index) => index !== payload.index)
    },

    // 挂单删除
    DELETE_CACHE_ORDER(state, payload) {
        state.cacheOrder = state.cacheOrder.filter((value, index) => index !== payload.index)
    },
};

const actions = {
    // 获取全部商品列表
    getGoods(ctx, payload) {
        ctx.commit('SET_GOODS_PAGINATION', payload);
        return new Promise((resolve, reject) => {
            axios.get(`/seller/mall/sell-item-list?`,{
                params: {
                    current: ctx.state.pagination.current,
                    pageSize: ctx.state.pagination.pageSize,
                }
            }).then((res) => {
                let {data:{data}}=res
                ctx.commit('SET_GOODS', data);
            }).catch(function (error) {
                reject(error.response.data)
            });
        });
    },
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
    //创建订单
    createOrder(ctx, payload) {
        let newOrder = ctx.state.order;
        newOrder.createTime = new Date();
        //修改产品库存
        let subOrder = ctx.state.order.subOrder;
        if (subOrder) {
            var p = new Promise((resolve, reject) => {
                subOrder.forEach(obj => {
                    let newPayload = {
                        _id: obj._id,
                        quantity: obj.quantity
                    };
                    ctx.dispatch("Goods/cutStock", newPayload, {root: true}).then(res => {
                            resolve()
                        }, err => {
                            reject(err);
                        }
                    );
                })
            });
            let promise = new Promise((resolve, reject) => {
                p.then(res => {
                    // 插入数据
                    db.order.insert(newOrder, (err, newDocs) => {
                        if (payload) {
                            if (payload.callback) {
                                payload.callbacks(err)
                            }
                        }
                        if (err) {
                            reject('订单创建失败')
                        } else {
                            resolve(ctx.state.order);
                            ctx.commit("ClEAR_ORDER");
                        }
                    })
                }, err => {
                    reject(err);
                })
            });
            return promise
        }

    },
    // 添加商品到订单
    createSubOrder(ctx, payload) {
        db.goods.findOne({barCode: payload.barCode}, (err, doc) => {
            console.log(doc);
            if (doc) {
                if (doc.stock >= 1) {
                    doc.quantity = payload.quantity ? payload.quantity : 1;
                    doc.quantity = doc.quantity <= doc.stock ? doc.quantity : doc.stock;
                    ctx.commit("CREATE_SUBORDER", doc);
                    ctx.commit("TOTAL_ORDER")
                }
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
        ctx.commit("DELETE_SUBORDER", payload);
        ctx.commit("TOTAL_ORDER")
    },
    // 编辑商品数量
    updateSubOrder(ctx, payload) {
        ctx.commit("UPDATE_SUBORDER", payload);
        ctx.commit("TOTAL_ORDER")
    },

    // 挂单
    setCacheOrder(ctx) {
        ctx.commit("SET_CACHE_ORDER")
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
    state,
    mutations,
    actions
}
