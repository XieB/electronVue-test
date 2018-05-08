<template>
    <div class="main">
        <div class="top_bar clear_fix" style="-webkit-app-region: drag">
            <Button @click="quitApp" style="-webkit-app-region: no-drag">x</Button>
            <Button @click="minApp" style="-webkit-app-region: no-drag">_</Button>
        </div>
        <task></task>
    </div>
</template>

<script>
    import task from './task';
    export default {
        name: "index",
        components : {
            task,
        },
        methods : {
            quitApp() {
                this.$electron.ipcRenderer.send('quitApp')
            },
            minApp(){
                this.$electron.ipcRenderer.send('min');
            },
        }
    }
</script>

<style lang="less" scoped>
.main{
    .top_bar{
        padding: 0 10px;
        button{
            float: right;
            margin-left: 10px;
            border: none;
            outline: none;
            background-color: transparent;
            padding: 6px;
            color: #999;
            transition: all 0.3s;
            &:hover{
                color: #333;
            }
        }
    }
}
</style>
<style>
    .clear_fix:after{
        display: block;
        content: '';
        clear: both;
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
        background-color: rgba(255, 250, 205, 0.6);
        font-size: 14px;
    }
</style>