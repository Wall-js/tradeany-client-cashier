<template>
    <div class="keyboard" v-show="showKeyboard" v-clickoutside="closeModal">
        <p v-for="keys in keyList">
            <template v-for="key in keys">
                <i v-if="key === 'top'" @click.stop="clickKey"  class="iconfont icon-zhiding tab-top"></i>
                <i v-else-if="key === '123'" @click.stop="clickKey"  class="tab-num">123</i>
                <i v-else-if="key === 'del'" @click.stop="clickKey"  id="del"  class="iconfont icon-delete key-delete"></i>
                <i v-else-if="key === 'blank'" @click.stop="clickKey"  class="iconfont icon-konggejian-jianpanyong tab-blank"></i>
                <i v-else-if="key === 'symbol'" @click.stop="clickKey"  class="tab-symbol">符</i>
                <i v-else-if="key === 'point'" @click.stop="clickKey"  class="tab-point">·</i>
                <i v-else-if="key === 'enter'" @click.stop="clickKey"  class="iconfont icon-huiche tab-enter"></i>
                <i v-else @click.stop="clickKey" >{{key}}</i>
            </template>
        </p>
    </div>
</template>

<script>
    import clickoutside from '../clickoutside'
    export default {
        directives: { clickoutside },
        data() {
            return {
                keyList: [],
                status: 2,//0 小写 1 大写 2 数字 3 符号
                lowercase: [
                    ['7', '8', '9'],
                    ['4', '5', '6'],
                    ['1', '2', '3'],
                    ['.','0','del'],
                ],
                //equip:!!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)//是否是移动设备
            }
        },
        props: {
            option: {
                type: Object
            }
        },
        computed: {
            showKeyboard(){
                return this.option.show
            }
        },

        mounted() {
            this.keyList = this.lowercase
        },

        methods: {
            tabHandle({ value = '' }) {
                if(value.indexOf('tab-num') > -1){
                    this.status = 2
                    //数字键盘数据
                }else if(value.indexOf('key-delete') > -1){
                    console.log(value.indexOf('key-delete'))
                    this.emitValue('delete')
                }else if(value.indexOf('tab-blank') > -1){
                    this.emitValue(' ')
                }else if(value.indexOf('tab-enter') > -1){
                    this.emitValue('\n')
                }else if(value.indexOf('tab-point') > -1){
                    this.emitValue('.')
                }else if(value.indexOf('tab-symbol') > -1){
                    this.status = 3
                }else if(value.indexOf('tab-top') > -1){
                    if(this.status === 0){
                        this.status = 1
                    }else{
                        this.status = 0
                        this.keyList = this.lowercase
                    }
                }else{

                }
            },

            clickKey(event) {
                // if(event.type === 'click' && this.equip) return
                let value = event.srcElement.innerText;
                let id = event.srcElement.id;
                let target = event.srcElement ? event.srcElement : event.target;
                if(id !== '' && id === 'del'){//如果点击的是id为del的表示是删除
                    this.emitValue(id);
                }else{//否则
                    value && id !== 'del'? this.emitValue(value) : this.tabHandle(target.classList);
                }

            },

            emitValue(key) {
                console.log(key)
                this.$emit('keyVal', key)
            },

            closeModal(e) {
                if (e.target !== this.option.sourceDom) {
                    // this.showKeyboard = false
                    this.$emit('close', false)
                }
            }
        }
    }
</script>
<!--<style scoped lang="less">-->
    <!--.keyboard {-->
        <!--display: inline-block;-->
        <!--width: 263px;-->
        <!--font-size: 18px;-->
        <!--border-radius: 2px;-->
        <!--background-color: #e5e6e8;-->
        <!--user-select: none;-->
        <!--bottom: 0;-->
        <!--position: absolute;/*定位数字键盘*/-->
        <!--left: -20px;-->
        <!--top: 77px;-->
        <!--z-index: 999;-->
        <!--pointer-events: auto;-->
        <!--p {-->
            <!--width: 100%;-->
            <!--margin: 0 auto;-->
            <!--height: 42px;-->
            <!--margin-bottom: 0.5em;-->
            <!--display: flex;-->
            <!--display: -webkit-box;-->
            <!--flex-direction: row;-->
            <!--flex-wrap: nowrap;-->
            <!--justify-content: center;-->
            <!--i {-->
                <!--display: block;-->
                <!--margin: 0 0.2%;-->
                <!--height: 50px;-->
                <!--line-height: 52px;-->
                <!--font-style: normal;-->
                <!--font-size: 24px;-->
                <!--border-radius: 3px;-->
                <!--width: 44px;-->
                <!--background-color: #fff;-->
                <!--text-align: center;-->
                <!--flex-grow: 1;-->
                <!--flex-shrink: 1;-->
                <!--flex-basis: 0;-->
                <!-- -webkit-box-flex: 1;-->
                <!--&:active {-->
                    <!--background-color: darken(#ccc, 10%);-->
                <!--}-->
            <!--}-->
            <!--.tab-top {-->
                <!--width: 50px;-->
                <!--margin: 0 1%;-->
                <!--background: #cccdd0;-->
                <!--color: #fff;-->
                <!--font-size: 24px;-->
            <!--}-->
            <!--.key-delete {-->
                <!--width: 47px;-->
                <!--margin: 0 0.2%;-->
                <!--color: #827f7f;-->
                <!--background: ;-->
            <!--}-->
            <!--.tab-num {-->
                <!--font-size: 18px;-->
                <!--background: #dedede;-->
                <!--color: #5a5959;-->
            <!--}-->
            <!--.tab-point {-->
                <!--width: 20px;-->
            <!--}-->
            <!--.tab-blank {-->
                <!--width: 50px;-->
                <!--font-size: 12px;-->
                <!--padding: 0 15px;-->
                <!--color: #5a5959;-->
                <!--line-height: 60px;-->
            <!--}-->
            <!--.tab-symbol {-->
                <!--width: 20px;-->
                <!--font-size: 18px;-->
            <!--}-->
            <!--.tab-enter {-->
                <!--font-size: 30px;-->
                <!--line-height: 54px;-->
            <!--}-->
            <!--&:nth-child(2) {-->
                <!--width: 100%;-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</style>-->
