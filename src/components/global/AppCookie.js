/*Cookie, Cache 工具類*/

export default {
    /*
        [methods]
        SaveToken  : 使用者信息存在 cookies
        isLogon  : 得到是否登入
        getName  :得到登入名稱
        getToken :得到登入者信息
        createCookie :創建 cookie
        readCookie :得到cookie值
        clearToken :清除 cookie值
   */
    methods: {
        setListIsReload: function(isLoad) {
            this.createCookie('listReload', isLoad, 1)
        },
        getListIsReload: function() {
            var load = this.readCookie('listReload')

            if (load)
                return load

            return false
        },
        saveProductListLastPos: function(pos) {
            this.createCookie('p_ypos', pos, 1)
        },
        getProductListLastPos: function() {
            var pos = this.readCookie('p_ypos')

            if (pos)
                return pos

            return 0
        },
        saveToken: function(account, session, rsession) {

            this.createCookie('account', account, 1)
            this.createCookie('session', session, 1)
            this.createCookie('rsession', rsession, 1)
        },
        isLogon: function() {
            var token = this.getToken()

            if (!token.session)
                return false

            if (token.session === 'null')
                return false

            return true
        },
        getName: function() {
            var account = this.readCookie('account')

            if (account == null)
                return ''

            if (account === 'null')
                return ''

            return account
        },
        getToken: function() {
            var session = this.readCookie('session')
            var token = this.readCookie('rsession')
            var account = this.readCookie('account')

            var data = {
                session: session,
                rsession: token,
                account: account
            }

            return data
        },
        saveCache: function(itemList) {

            if (!this.isLocalStorageNameSupported())
                return

            localStorage.setItem('stockList', JSON.stringify(itemList));
            var storedNames = JSON.parse(localStorage.getItem('stockList'));
        },
        getCacheList: function() {

            if (!this.isLocalStorageNameSupported())
                return null

            var storedNames = JSON.parse(localStorage.getItem('stockList'));

            if (storedNames) {
                return storedNames
            }

            return null
        },
        resetCacheList: function() {
            localStorage.setItem('stockList', null);
        },
        createCookie: function(name, value, days) {
            var expires = ''

            if (days) {
                var date = new Date()
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
                expires = '; expires=' + date.toUTCString()
            }

            document.cookie = name + '=' + value + expires + '; path=/'
        },
        readCookie: function(name) {
            var nameEQ = name + "="
            var ca = document.cookie.split(';')

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i]
                while (c.charAt(0) == ' ') c = c.substring(1, c.length)
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length)
                }
            }

            return null
        },
        clearToken: function() {
            this.createCookie('session', 'null', 1)
            this.createCookie('rsession', 'null', 1)
        },
        isLocalStorageNameSupported: function() {
            var testKey = 'test'

            try {
                localStorage.setItem(testKey, '1');
                localStorage.removeItem(testKey, null);

                return true
            } catch (error) {
                return false;
            }
        }
    }
};