<template>
    <div>
        <br>
        <myEditor v-model="val" placeholder="请输入内容..."></myEditor>
        <br>
        <h3>预览：</h3>
        <div v-html="val" class="preview"></div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            val: "",
        }
        
    },
    created () {
        setTimeout(() => {
            this.val = "888"
        },400)
    }
}
</script>

<style lang="less" scoped>
.preview {
    padding: 10px;
    border: solid 1px;
    min-height: 200px;
}
</style>