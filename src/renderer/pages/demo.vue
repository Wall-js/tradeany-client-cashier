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
        <button @click="getItem">getItem</button>
        <button @click="createItem">createItem</button>
        <button @click="$store.dispatch('deleteAllItem')">deleteAllItem</button>

    </div>
</template>

<script>
    export default {
        name: 'demo',
        methods: {
            getItem() {
                this.$store.dispatch("getItem");
                // console.log(this.$store.state.Counter.main)

            },
            createItem() {
                this.$store.dispatch("createItem");
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
