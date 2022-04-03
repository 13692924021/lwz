<style lang="less" scoped>
.cssWrap {
    // background: #000;
    min-height: 100%;
    padding: 30px;
}
.scroller {
    height: 300px;
    border: solid 1px;
}
.user {
    border: solid 1px;
}
</style>

<template>
   <div class="cssWrap">
       <button class="borderMove op btnHover" @click="save1">
           <i></i><i></i><i></i><i></i>
           <span>Button</span>
       </button>
        <br>
        <br>
        <Button class="btnHover" type="primary">iview btn</Button>
        <br><br>
        <img src="@/assets/logo.png" width="50" >

   </div>
</template>

<script>
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import JSZipUtils from 'jszip-utils';

var sections = {
    "sections":[
        {"section_name":"Languages","data":"Tamil\nTelugu\nHindi\nEnglish","key":"8783", "cus": "hehehe"},
        {"section_name":"Skills","data":"JavaScript<br />jQuery<br />CSS<br />","key":"13486"}
    ]
}; 
export default {
    data () {
        return {
            list: [],
            obj: {
                title: "123a\r\n321"
            }
        }
    },
    mounted () {
        for (let i = 0; i< 10000;i++) {
            this.list.push({
                name: 'name' + i,
                id: i
            })
        }


    },
    methods: {
        loadFile(url,callback){ 
            JSZipUtils.getBinaryContent(url,callback); 
        },
        save1 () {
            this.loadFile("http://127.0.0.1:5500/a.docx",function(error,content){ 
            if (error) { throw error; }; 
            var zip = new PizZip(content); 
            var doc=new Docxtemplater().loadZip(zip); 
            doc.setOptions({nullGetter: function() { 
            return ""; 
            }}); 
            doc.setData(sections); 

            try { 
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...) 
            doc.render(); 
            } 
            catch (error) { 
            var e = { 
            message: error.message, 
            name: error.name, 
            stack: error.stack, 
            properties: error.properties, 
            }; 
            console.log(JSON.stringify({error: e})); 
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object). 
            throw error; 
            } 

            var out=doc.getZip().generate({ 
            type:"blob", 
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
            }); //Output the document using Data-URI 
            saveAs(out,"output.docx"); 
        })
        },
        save () {
            let _this = this;
            JSZipUtils.getBinaryContent('http://127.0.0.1:5500/a.docx', function(error, content) {
                if (error) {
                    throw error;
                }

                // 创建一个JSZip实例，内容为模板的内容

                let zip = new PizZip(content);

                // 创建并加载docxtemplater实例对象

                let doc = new Docxtemplater();
                
                doc.loadZip(zip);

                // 设置模板变量的值

                doc.setData({..._this.obj,});

                // 用模板变量的值替换所有模板变量

                try {doc.render()} catch (error) { }

                // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）

                let out = doc.getZip().generate({

                type: 'blob',

                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

                });

                // 将目标文件对象保存为目标类型的文件，并命名

                saveAs(out, '的简介.docx');

            });

        }
    }

}
</script>

