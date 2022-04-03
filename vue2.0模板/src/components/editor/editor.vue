<template>
    <div>
        <div :id="id"></div>
    </div>
</template>

<script>
import E from "wangeditor"
export default {
    data () {
        return {
            dom: null,
            id: "",
            index: 0,
        }
    },
    props: {
        value: {
            default: ""
        },
        placeholder: {
            default: ""
        }
    },
    watch: {
        value (val) {
            if (this.index === 0) {
                this.dom.txt.html(val)
                this.index++
            }
            
        }
    },
    created () {
        let num = Math.random() * 100000
        this.id = "myEditor" + parseInt(num)
    },
    mounted () {

        this.init()
    },
    methods: {
        init () {
            let that = this
            console.log("#" + this.id)
            this.dom = new E("#" + this.id)
            this.dom.config.zIndex = 1
            this.dom.config.onchange = function (html) {
                that.$emit('input', html)
            }
            // console.log(this.placeholder)
            this.dom.config.placeholder = this.placeholder






            this.dom.create()
            this.dom.txt.html(this.value)
            
        },
    }
}
</script>

<style lang="less">
.w-e-toolbar {
    background: #10103d !important;
    >div:hover {
        background: #000 !important;
    }
    i {
        color: #FFF !important;
    }
}
</style>