import db from "../../datastore"
import numeral from "numeral";
// import day from '@/utils/time'

const defaultState = {
    mouth: {
        date: undefined,
        OrderQuantity: 0,
        OrderTotal: 0,
        list: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    },
    day: {
        date: undefined,
        OrderQuantity: 0,
        OrderTotal: 0,
        list: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },

    },
    today: {
        OrderQuantity: 0,
        OrderTotal: 0,
        list: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    },
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

const state = Object.assign({}, defaultState);

const mutations = {
    CENSUS_TODAY(state, payload) {
        state.today.list = payload;
        state.today.total = state.today.list.length > 0 ? state.today.list.reduce((total, item, index) => {
            const a = numeral(item.total);
            // const b = a.multiply(item.quantity);
            const b = a.add(total)
            if (index === state.today.list.length - 1) {
                return b.format('0.00');
            } else {
                return b.value();
            }
        }, 0) : 0;
    },
};

const actions = {
    getTodayCensus(ctx, payload) {
        let todayStartTime = new Date(new Date().toLocaleDateString()).getTime();
        let todayEndTime = todayStartTime + 24 * 60 * 60 * 1000 - 1;
        db.order.find(
            {
                $where: function () {
                    // console.log(this.createTime);
                    // console.log(this.createTime >= todayStartTime && this.createTime <= todayEndTime);
                    return this.createTime >= todayStartTime && this.createTime <= todayEndTime;
                }
            }
            // {$and: [{createTime: {$gte: todayStartTime}}, {createTime: {$lte: todayEndTime}}]},
            // {createTime: {$gte: todayStartTime}}
        ).exec((err, docs) => {
            console.log(docs);
            // console.log(docs[0].createTime);
            ctx.commit('CENSUS_TODAY', docs);
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
