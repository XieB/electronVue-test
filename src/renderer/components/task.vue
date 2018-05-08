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
    </div>
</template>

<script>
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
}
</style>