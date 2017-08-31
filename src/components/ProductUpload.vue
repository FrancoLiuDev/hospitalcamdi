/*物件上傳畫面*/
 
<template>
    <div class="dev-upload">
        <banner ref="mBanner"></banner>
        <div class="container-block">
            <div class="upload-container">
                <div class="upload-content">
                    <div class="form-up">
                        <div class="fm-up-l">
                            <div class="img-drag-container" img-drag-container>
                                <div id="drop_zone">{{txtPhotoUpload}}</div>
                                <div class="box">
                                    <input type="file" name="fileInput" id="fileInput" class="input-file" />
                                    <img for="fileInput" src="../assets/upload.png" v-on:click="onButtonImageLoad"></img>
                                </div>
                            </div>
                            <div class="int-spac">{{txtDepartment}}
                                <span class="input-item">
                                    <select v-model="mDepItem">
                                        <option v-for="item in depItems" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
                                    </select>
                                </span>
                            </div>
                            <div class="int-spac">{{txtFunction}}
                                <span class="input-item">
                                    <select v-model="mFunItem">
                                        <option v-for="item in funItems" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
                                    </select>
                                </span>
                            </div>
                            <div class="int-spac">{{txtFirm}}
                                <span class="input-item">
                                    <select v-model="mFirmItem">
                                        <option v-for="item in firmItems" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
                                    </select>
                                </span>
                            </div>
                            <div class="int-spac">{{txtModel}}
                                <span class="input-item" v-if="isSelectModel">
                                    <select v-model="mModelItem">
                                        <option v-for="item in modelItems" :key="item.id">{{item.name}}</option>
                                    </select>
                                </span>
                                <span class="input-item">
                                    <VueStateInput ref="mModelText" tagid='input_model' vuetype="text" :value.sync="modelText"></VueStateInput>
                                </span>
                            </div>
                        </div>
                        <div class="fm-up-r" id="ldImgStr">
                            <output id="list"></output>
                        </div>
                    </div>
                    <div class="form-bw">
                        <div class="int-spac">{{txtName}}
                            <span class="input-item">
                                <VueStateInput tagid='input_user' vuetype="text" :value.sync="modelName"></VueStateInput>
                            </span>
                        </div>
                        <div class="int-spac">{{txtDescription}}
                            <span class="input-input-block">
                                <textarea v-model="mStrDec"> </textarea>
                            </span>
                        </div>
                        <VueButton ref="submit" tagid='bt_submit' class="s-bt" :text="txtSubmit" @btclick="onButtonClick"></VueButton>
                    </div>
                </div>
            </div>
        </div>

        <ScreenMask ref="maskHolder">
        </ScreenMask>
        <ScreenMessage ref="msgHolder"></ScreenMessage>
        <ScreenLoading></ScreenLoading>
    </div>
</template>

<script>
import AUTH from '../components/service/AuthModule'
import Banner from '../components/CamdiBanner'
import ScreenMask from '../components/utils/ScreenMask'
import ScreenMessage from '../components/utils/ScreenMessage'
import ScreenLoading from '../components/utils/ScreenLoding.vue'
import ProductModule from '../components/service/ProductModule'
import VueButton from '../components/designs/StateButton.vue'
import VueStateInput from '../components/designs/StateInputBox.vue'
import AppString from '../components/global/AppString'

export default {
    name: 'ProductUpload',
    mixins: [AUTH, ProductModule, AppString],
    data() {
        return {
            thumb: null,
            modelName: '',
            mDepItem: null,
            mFunItem: null,
            mModelItem: null,
            mFirmItem: null,
            mStrDec: '',
            modelText: '',
            isSelectModel: false,
            depItems: [

            ],
            funItems: [

            ], firmItems: [

            ],
            modelItems: [
                { name: '20170718', id: '1' },
                { name: 'AE_240', id: '2' },
                { name: 'fbxdonghua20170725', id: '3' },
                { name: 'fm_sample_project0725', id: '4' },
                { name: 'hbgzz3', id: '5' },
                { name: 'tingzi', id: '6' },
                { name: 'xinzang2', id: '7' },
                { name: 'xuetangyi', id: '8' },
            ],

            txtPhotoUpload: this.getAppString('PHOTO_UPLOAD'),
            txtDepartment: this.getAppString('GOOD_DEPARTMENT'),
            txtFunction: this.getAppString('GOOD_FUNC_TYPE'),
            txtFirm: this.getAppString('GOOD_PRODUCE_FIRM'),
            txtModel: this.getAppString('MODEL_ID'),
            txtName: this.getAppString('MODEL_NAME'),
            txtDescription: this.getAppString('GOOD_DETAIL_DESC'),
            txtSubmit: this.getAppString('PUSH_SUBMIT'),
        }
    },
    mounted: function() {
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', this.handleDragOver, false);
        dropZone.addEventListener('drop', this.handleFileSelect2, false);

        this.fetchSupportFunction()
        this.fetchSupportDepartment()
        this.fetchSupportFirm()

        document.getElementById('fileInput').addEventListener('change', this.handleFileSelect, false);
    },
    components: {
        Banner, ScreenMask, ScreenMessage, ScreenLoading, VueButton, VueStateInput
    },
    watch: {
        mModelItem: function(val, old) {
            console.log('model select', val)
            this.modelText = val;
            this.$refs.mModelText.setTextValue(this.modelText)
        },
    },
    methods: {
        onButtonImageLoad: function() {
            var bt = document.getElementById('fileInput');
            bt.click();
        },
        onButtonClick: function() {
            if (!this.submitCheckDataInput())
                return

            var newModel = {
                department: this.mDepItem,
                function: this.mFunItem,
                name: this.modelName,
                company: this.mFirmItem,
                description: this.mStrDec,
                d3thumb: this.thumb,
                model: this.modelText
            }
            this.uploadProductItem(newModel)
        },
        submitCheckDataInput: function() {
            if (!this.mDepItem) {
                this.showMessage(this.getAppString('PLS_SELECT') + this.getAppString('GOOD_DEPARTMENT'))
                return
            }
            if (!this.mFunItem) {
                this.showMessage(this.getAppString('PLS_SELECT') + this.getAppString('GOOD_FUNC_TYPE'))
                return
            }
            if (!this.mFirmItem) {
                this.showMessage(this.getAppString('PLS_SELECT') + this.getAppString('GOOD_PRODUCE_FIRM'))
                return
            }
            if (!this.modelText) {
                this.showMessage(this.getAppString('PLS_INPUT') + this.getAppString('MODEL_ID'))
                return
            }
            if (!this.modelName) {
                this.showMessage(this.getAppString('PLS_INPUT') + this.getAppString('MODEL_NAME'))
                return
            }
            if (!this.mStrDec) {
                this.showMessage(this.getAppString('PLS_INPUT') + this.getAppString('GOOD_DETAIL_DESC'))
                return
            }
            if (!this.thumb) {
                this.showMessage(this.getAppString('PLS_SELECT') + this.getAppString('PHOTO_UPLOAD'))
                return
            }
            return true
        },
        cbDepartment: function(status, data) {
            if (status !== 'success')
                return

            for (var index in data.rows) {
                this.depItems.push(data.rows[index])
            }
        },
        cbDepartment: function(status, data) {
            if (status !== 'success')
                return

            for (var index in data.rows) {
                this.depItems.push(data.rows[index])
            }
        },
        cbFunctions: function(status, data) {
            if (status !== 'success')
                return

            for (var index in data.rows) {
                this.funItems.push(data.rows[index])
            }
        },
        cbFirms: function(status, data) {
            if (status !== 'success')
                return

            for (var index in data.rows) {
                this.firmItems.push(data.rows[index])
            }
        },
        cbUploadModel: function(status, data) {
            if (status !== 'success') {
                this.showMessage(this.getAppString('PUSH_FAILD'))
                return
            }

            if (status === 'success') {
                this.showMessage(this.getAppString('PUSH_OK'))
            }
        },

        handleDragOver: function handleDrgOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';
        },
        handleFileSelect: function(evt) {
            var files = evt.target.files;

            for (var i = 0, f; f = files[i]; i++) {
                this.thumb = f

                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {

                        var imgDiv = document.createElement('div');
                        imgDiv.innerHTML = ['<img class="thumb" height="auto" width="300px" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                        ].join('');

                        document.getElementById("ldImgStr").title = "";
                        document.getElementById("list").innerHTML = "";
                        document.getElementById('list').insertBefore(imgDiv, null);
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        },
        handleFileSelect2: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files;
            var output = [];

            for (var i = 0, f; f = files[i]; i++) {
                this.thumb = f
                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {
                        var imgDiv = document.createElement('div');
                        imgDiv.innerHTML = ['<img class="thumb" height="auto" width="300px" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                        ].join('');
                        document.getElementById("ldImgStr").title = "";
                        document.getElementById("list").innerHTML = "";
                        document.getElementById('list').insertBefore(imgDiv, null);

                    };
                })(f);
                reader.readAsDataURL(f);
            }
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        },
        showMessage: function(msg) {
            this.$refs.maskHolder.setDisplay(true)
            this.$refs.msgHolder.setDisplay(msg)
            setTimeout(this.hideMessage, 2200);
        },
        hideMessage: function(msg) {
            this.$refs.maskHolder.setDisplay(false)
            this.$refs.msgHolder.stopDisplay()
        },
    }
}
</script>
 
<style lang="less" scoped>
@import '../visaul.less';
@import '../page_styles.less';

@main_background: @c11_page_background;

.dev-upload {
    &:extend(.main-container);
    min-height: 100vh;
}

.upload-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 620px;
    background-color: @main_background;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}

.input-item {
    display: block;
    height: 2em;
}

.upload-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 650px;
    padding-top: 70px;
    background-color: white;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}

textarea {
    padding: 15px;
}

select {
    &:extend( .base-input-field);
    width: 100%;
    padding-left: 15px;
    height: 30px;
    &:focus {
        &:extend(.base-input-field-fc);
    }
    &::-webkit-input-placeholder {
        &:extend(.base-input-field-hold);
    }
}

.form-up {
    display: flex;
    flex-direction: row;
    height: 500px;
    padding: 15px;
}

.box {
    position: relative;
    bottom: 0;
    left: 0;
    cursor: pointer;
}

.form-bw {
    flex: 1;
    padding: 15px;
}

.fm-up-l {
    flex: 4;
    vertical-align: middle;
}

.img-div {
    display: table-cell;
    height: 100%;
    width: 240px;
    text-align: center;
    vertical-align: middle;
    text-align: center;
    background-color: white;
}

.fm-up-r {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 6;
    background: @main_background;
    border-radius: 5px;
    margin-left: 15px;
    overflow: hidden;
}

.int-spac {
    margin-top: 8px;
}

.input-input-block {
    display: block;
    height: 10em;
}

.container-block {
    display: flex;
    flex: 1 1 auto;
    background-color: rgb(240, 240, 240);
}

.img-drag-container {
    text-align: center;
    padding: 0px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

#drop_zone {
    margin: 20px;
    padding: 25px;
    border: 2px dashed #bbb;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    text-align: center;
    font: 20pt bold 'Vollkorn';
    color: #bbb;
}

.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.login-title-part {
    display: block;
    height: 100px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.login-title-part span {
    display: inline-block;
    height: 30%;
    vertical-align: middle;
    text-align: center;
}

.login-title-bottom {
    display: block;
    position: absolute;
    height: 35px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 0;
}

.login-title-dash {
    display: inline-block;
    position: absolute;
    height: 50%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    border-width: 0px;
    border-bottom: 1px solid @c1_main_color;
}

.login-title-line {
    &:extend( .t001_Login_title);
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    padding-left: 10px;
    padding-right: 10px;
    transform: translate(-50%, -50%);
    background-color: white;
}

.login-input-part {
    display: block;
    height: 70%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.s-bt {
    margin-top: 30px;
    margin-bottom: 100px;
}

img.resize {
    width: 200px;
    height: auto;
}

textarea {
    &:extend(.base-input-field);
    display: block;
    height: 100%;
    width: 100%;
    &:focus {
        &:extend(.base-input-field-fc);
    }
    &::-webkit-input-placeholder {
        &:extend(.base-input-field-hold);
    }
}

.thumb {
    height: auto;
    width: auto;
    max-width: 300px;
    max-height: 300px;
}

.input-file {
    display: none;
}
</style>
