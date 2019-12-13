<template>
    <div id="wrapper">
        <!--<div>-->
        <!--<div>计数器</div>-->
        <!--<div>{{ count }}</div>-->
        <!--<div>{{ $store.state.Counter.main }}</div>-->
        <!--<button @click="inc">+</button>-->
        <!--<button @click="dec">-</button>-->
        <!--</div>-->

        <div>
            <ol>
                <li v-for="v in $store.state.Item.list">
                    {{ v }}
                </li>
            </ol>
            <p>{{$store.state.Item.pagination}}</p>
        </div>
        <button @click="getItem">getItem</button>
        <button @click="getItemTest">getItemTest</button>
        <button @click="createItem">createItem</button>
        <button @click="deleteItem">deleteItem</button>
        <button @click="updateItem">updateItem</button>
        <button @click="filterGoods">filterGoods</button>
        <button @click="$store.dispatch('Item/deleteAllItem')">deleteAllItem</button>
        <div>
            <p>{{$store.state.OrderCensus }}</p>
            <button @click="test">test</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo',
        methods: {
            // setItemPagination() {
            //     let payload = {
            //         pagination: {
            //             current: 1,
            //             pageSize: 10,
            //         }
            //     };
            //     this.$store.dispatch("setItemPagination", payload);
            //     // console.log(this.$store.state.Counter.main)
            //
            // },
            test() {
                this.$store.dispatch("OrderCensus/getTodayCensus")
            },
            getItem() {
                console.log(this.$store.state.Item.list);
                let payload = {
                    pagination: {
                        current: 1,
                        pageSize: 3,
                    }
                };
                this.$store.dispatch("Item/getItem", payload);
                // console.log(this.$store.state.Counter.main)

            },

            filterGoods() {
                // console.log(this.$store.state.Item.list);
                let payload = {
                    name : "te",
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    }
                };
                this.$store.dispatch("Goods/filterGoods", payload);
                // console.log(this.$store.state.Counter.main)

            },


            getItemTest() {
                let payload = {
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    }
                };
                this.$store.dispatch("Item/getItem", payload);
                // console.log(this.$store.state.Counter.main)
            },

            deleteItem() {
                let payload = {
                    _id: "MV2IqSUy70cbwWKA",
                };
                this.$store.dispatch("Item/deleteItem", payload);
            },

            createItem() {
                let payload = {name: "111", quantity: 10, createTime: new Date()};
                this.$store.dispatch("Item/createItem", payload);
            },

            updateItem() {
                let payload = {
                    _id: "MV2IqSUy70cbwWKA",
                    data: {"name": "qweqwe", "quantity": 100}
                };
                this.$store.dispatch("Item/updateItem", payload);
            },

            inc() {
                this.$store.dispatch("Item/incCounter");
                // console.log(this.$store.state.Counter.main)
            },

            dec() {
                this.$store.dispatch("Item/decCounter");
                // console.log(this.$store.state.Counter.main)

            },

        },
        computed: {
            count() {
                return this.$store.state.Counter.main
            }
        }
    }
</script>
