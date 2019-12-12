<template>
    <div id="wrapper">
        <div>{{ count }}</div>
        <button @click="add">+</button>
        <button @click="sub">-</button>
    </div>
</template>

<script>
    export default {
        name: 'Demo',
        methods: {
            add() {

            },
            sub() {

            },
        },
        computed: {
            count() {
                return this.store.state.count
            }
        }
    }
</script>
