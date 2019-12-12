<template>
    <div>
        <webview :src="fullPath" nodeintegration></webview>
    </div>
</template>


<script>
    import path from 'path'
    const ipcRenderer = require("electron").ipcRenderer;
    export default {
        name: "printer",
        components: {},
        data() {
            return {
                fullPath: path.join(__static, 'print.html'),
                printerList: [],
                printer: ""
            };
        },
        mounted() {
            this.getPrinterList(); //首先先获取
        },
        methods: {
            print() {
                const webview = document.querySelector("webview");
                console.log(webview);
                webview.addEventListener("dom-ready", () => {
                    console.log("dom-ready");
                    //dom-ready---webview加载完成
                    webview.openDevTools();  //这个方法可以打开print.html的控制台
                    var order = {
                        "username": "张萌",
                        "uid": "213456768765342",
                        "orderNo": "234657687645342",
                        "subOrderList": [
                            {
                                "itemName": "卫龙辣条 大包装",
                                "skuName": "20根",
                                "price": "5.00",
                                "qty": "2",
                                "payFee": "10.00"
                            },
                        ],
                        "totalQty": "2",
                        "payFee": "10.00",
                        "payTime": "2019-12-11 12:12",
                    };
                    //在send时将arr传递过去
                    webview.send("ping", order); //向webview嵌套的页面响应事件
                });
                webview.addEventListener("ipc-message", event => {
                    console.log(event.channel); // Prints "pong" 在此监听事件中接收webview嵌套页面所响应的事件
                    if (event.channel == "pong") {
                        console.log("通信成功");
                        console.log(this.printer);
                        webview.print(
                            {
                                //是否是静默打印,true 为静默打印，false 会弹出打印设置框
                                silent: true,
                                printBackground: true,
                                //打印机的名称，this.print1为在getPrinterList()方法中获取到的打印机名字。
                                //注意在demo中这是我打印机的设备，在使用本demo时，先去getPrinterList()中找到你使用的打印机
                                deviceName: this.printer
                            },
                            data => {
                                //这个回调是打印后的回调事件，data为true就是打印成功，为false就打印失败
                                console.log("webview success", data);
                            }
                        );
                    }
                });
            },
            getPrinterList() {
                ipcRenderer.send("getPrinterList");
                //监听主线程获取到打印机列表后的回调
                ipcRenderer.once("getPrinterList", (event, data) => {
                    //data就是打印机列表
                    // 过滤可用打印机
                    this.printerList = data.filter(element => element.status === 0);
                    for (let i in this.printerList) {
                        if (data[i].isDefault) {
                            this.printer = data[i].name;
                            console.log(this.printer)
                        }
                    }
                    console.log(this.printerList);
                    // 判断是否有打印服务
                    console.log(this.printerList.length);
                    if (this.printerList.length <= 0) {
                        this.$message({
                            message: '打印服务异常,无法找到打印机服务',
                            type: 'error'
                        })
                    } else {
                        this.print();
                    }
                });
            }
        }
    };
</script>

<style>
</style>
