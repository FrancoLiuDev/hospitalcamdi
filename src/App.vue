<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import AppString from './components/global/AppString'

export default {
  name: 'app',
  mixins: [AppString],
  mounted: function() {
    document.title = this.getAppString('APP_TITLE')
  },
}
</script>

<style lang="less">
@import '../src/visaul.less';
* {
  box-sizing: border-box;
  margin: 0px;
  position: relative;
  padding: 0px;
  -webkit-touch-callout: none;
  letter-spacing: 3px;
  font-family: @font-dafault-family;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
