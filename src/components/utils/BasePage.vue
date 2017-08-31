/*會員下拉選單*/

<template>

</template>

<script>
import Cookie from '../global/AppCookie.js'

export default {
    /*
        [method] 
        handleServiceError:  處理API 錯誤
    */
    name: 'BasePage',
    mixins: [Cookie],
    methods: {
        handleServiceError: function(error) {

            if (error.response) {
                console.log(error.response.headers.code)
                if (error.response.headers.code === '01.003') {
                    this.clearToken()
                    this.$router.push({ name: 'Login' })
                }
            }

        }
    }
}
</script>

