<template>
    <div id="wrapper">
        <div>
            <div>计数器</div>
            <div>{{ count }}</div>
            <div>{{ $store.state.Counter.main }}</div>
            <button @click="inc">+</button>
            <button @click="dec">-</button>
        </div>
        <div>
            {{ $store.state.Item }}
        </div>
        <button @click="setItemPagination">setItemPagination</button>
        <button @click="getItem">getItem</button>
        <button @click="createItem">createItem</button>
        <button @click="deleteItem">deleteItem</button>
        <button @click="updateItem">updateItem</button>
        <button @click="$store.dispatch('deleteAllItem')">deleteAllItem</button>

    </div>
</template>

<script>
    export default {
        name: 'demo',
        methods: {
            setItemPagination() {
                let payload = {
                    current: 2,
                    pageSize: 5,
                };
                this.$store.dispatch("setItemPagination",payload);
                // console.log(this.$store.state.Counter.main)

            },
            getItem() {
                this.$store.dispatch("getItem");
                // console.log(this.$store.state.Counter.main)

            },
            deleteItem() {
                let payload = {
                    _id: "MV2IqSUy70cbwWKA",
                };
                this.$store.dispatch("deleteItem", payload);
            },
            createItem() {
                let payload = {name: "111", quantity: 10};
                this.$store.dispatch("createItem", payload);
            },
            updateItem() {
                let payload = {
                    _id: "MV2IqSUy70cbwWKA",
                    data: {"name": "qweqwe", "quantity": 100}
                };
                this.$store.dispatch("updateItem", payload);
            },
            inc() {
                this.$store.dispatch("incCounter");
                // console.log(this.$store.state.Counter.main)
            },
            dec() {
                this.$store.dispatch("decCounter");
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
