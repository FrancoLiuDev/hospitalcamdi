/*共用字串 工具類*/

export default {
    /*
        [methods]    
        getAppString : 得到字串內容 
        getServiceParam : 得到 Service 相關內容物件
   */
    data() {
        return {
            SERVICE_DEV_ROOT: ''
        }
    },
    methods: {
        getAppString: function(id) {
            switch (id) {
                case 'APP_TITLE':
                    // 中国医疗器械行业协会
                    return this.$t('APP_TITLE')
                    break;
                case 'USER_LOGIN':
                    //用户登录
                    return this.$t('USER_LOGIN')
                    break;
                case 'STRING_LOGIN':
                    //登入
                    return this.$t('STRING_LOGIN')
                    break;
                case 'PLS_INP_ACCOUNT':
                    //请输入电子邮箱
                    return this.$t('PLS_INP_ACCOUNT')
                    break;
                case 'PLS_INP_PWD':
                    //请输入密码
                    return this.$t('PLS_INP_PWD')
                    break;
                case 'PRODUCT_CATALOG':
                    //产品分类
                    return this.$t('PRODUCT_CATALOG')
                    break;
                case 'CAMDI_TITLE':
                    //中国医疗器械行业协会
                    return this.$t('CAMDI_TITLE')
                    break;
                case 'LOGIN_SUCCESS':
                    //登录成功
                    return this.$t('LOGIN_SUCCESS')
                    break;
                case 'LOGIN_FAILD':
                    //登录失败,请重新登入
                    return this.$t('LOGIN_FAILD')
                    break;
                case 'PLS_INPUT_CORRECT_LOGIN_INFO':
                    //请输入正确邮箱及密码
                    return this.$t('PLS_INPUT_CORRECT_LOGIN_INFO')
                    break;
                case 'STRING_LOGOUT':
                    //退出
                    return this.$t('STRING_LOGOUT')
                    break;
                case 'GOOD_CATALOG':
                    //产品类别
                    return this.$t('GOOD_CATALOG')
                    break;
                case 'GOOD_NAME':
                    //产品名称
                    return this.$t('GOOD_NAME')
                    break;
                case 'GOOD_DESCRIPTION':
                    //产品简述
                    return this.$t('GOOD_DESCRIPTION')
                    break;
                case 'GOOD_PRODUCE_FIRM':
                    //生产企业
                    return this.$t('GOOD_PRODUCE_FIRM')
                    break;
                case 'GOOD_CONTACT':
                    //联络人
                    return this.$t('GOOD_CONTACT')
                    break;
                case 'GOOD_CT_PHONE':
                    //联系电话
                    return this.$t('GOOD_CT_PHONE')
                    break;
                case 'GOOD_CT_MAIL':
                    //电子邮件
                    return this.$t('GOOD_CT_MAIL')
                    break;
                case 'GOOD_CT_ADDR':
                    //单位地址
                    return this.$t('GOOD_CT_ADDR')
                    break;
                case 'PUSH_SUBMIT':
                    //提交
                    return this.$t('PUSH_SUBMIT')
                    break;
                case 'PLS_SELECT':
                    //请选择
                    return this.$t('PLS_SELECT')
                    break;
                case 'PLS_INPUT':
                    //请输入
                    return this.$t('PLS_INPUT')
                    break;
                case 'PUSH_FAILD':
                    //上传失败
                    return this.$t('PUSH_FAILD')
                    break;
                case 'PUSH_OK':
                    //上传成功
                    return this.$t('PUSH_OK')
                    break;
                case 'MODEL_ID':
                    //模型标识
                    return this.$t('MODEL_ID')
                    break;
                case 'MODEL_NAME':
                    //模型名称
                    return this.$t('MODEL_NAME')
                    break;
                case 'GOOD_DEPARTMENT':
                    //科别
                    return this.$t('GOOD_DEPARTMENT')
                    break;
                case 'PHOTO_UPLOAD':
                    //上传图片
                    return this.$t('PHOTO_UPLOAD')
                    break;
                case 'GOOD_FUNC_TYPE':
                    //功能类别
                    return this.$t('GOOD_FUNC_TYPE')
                    break;
                case 'GOOD_DETAIL_DESC':
                    //详细说明
                    return this.$t('GOOD_DETAIL_DESC')
                    break;
                default:
                    console.log('unhandle string', id)
                    break;
            }
        },
        getServiceParam: function() {
            var l = '"'
            var strRoot = process.env.VIEW_ROOT
            var viewRoot = strRoot.replace(l, "").replace(l, "")
            var param = {
                service_root: '',
                view_root: viewRoot,
            };

            param.service_root = this.SERVICE_DEV_ROOT
            return param;
        },
    }
};