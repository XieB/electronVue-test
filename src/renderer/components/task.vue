<template>
    <div class="task">
        <ul class="clear_fix">
            <li v-for="(item,index) in taskList">
                <label class="demo--label">
                    <input class="demo--radio" type="checkbox" name="demo-checkbox3">
                    <span class="demo--checkbox demo--radioInput"></span>
                    <span class="con">{{item.name}}</span>
                </label>
                <span class="del" @click="delTask(index)">x</span>
            </li>
        </ul>
        <input type="text" placeholder="按enter键加入任务列表" @keyup.enter="addTask" v-model="inputValue.name" class="add_task">

        <div class="test">
            <button @click="ipcRemote">ipcRemote</button>
            <br />
            <button @click="showMessage">消息弹窗？</button>
            <br />
            <button @click="getBaiduIP">原生node获取ip地址</button>
        </div>
    </div>
</template>

<script>

    //弹窗
    const {dialog} = require('electron').remote;

    //主进程通讯
    const {ipcRenderer} = require('electron')
    ipcRenderer.on('replaymsg', (evt, otherData) => {
        console.log(otherData)
    })

    //原生node
    const dns = require('dns');

    export default {
        name: "task",
        data(){
            return {
                taskList : [],
                inputValue : {
                    state : 0,
                    name : '',
                },
            }
        },
        methods : {
            addTask(){
                if (this.inputValue.name != ''){
                    this.taskList.push({...this.inputValue});
                    this.inputValue.name = '';
                }
            },
            delTask(index){
                this.taskList.splice(index,1);
            },
            ipcRemote(){
                this.$electron.ipcRenderer.send('testMessage','this sis a test message');
            },
            getBaiduIP(){
                dns.lookup('www.baidu.com', (err, address, family) => {
                    console.log('IP 地址: %s 地址族: IPv%s', address, family);
                });
            },
            showMessage(){
                dialog.showMessageBox({
                    message : '中文',
                });
            }
        }
    }
</script>

<style lang="less" scoped>
.task{
    padding: 10px;
    ul{
        li{
            position: relative;
            padding: 6px;
            border-bottom: 1px dashed #999;
            .del{
                display: inline-block;
                padding: 4px;
                color: #999;
                font-size: 10px;
                position: absolute;
                top: 4px;
                right: 0;
                cursor: pointer;
            }
            .con{
                display: inline-block;
                vertical-align: middle;
                width: 160px;
                word-wrap: break-word;

            }
        }
    }
    input.add_task{
        display: block;
        padding: 4px;
        width: 180px;
        margin: 10px auto 0;
        outline: none;
        transition: all 0.3s;
        border: 1px solid #999;
        &:focus{
            border-color: lightseagreen;
        }
    }
    .test{
        text-align: center;
        button{
            margin-top: 20px;
        }
    }
}
</style>