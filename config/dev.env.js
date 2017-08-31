var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

var viewRoot = ''
var l = "'"
var c = '"'
var root = 'http://60.251.125.208:24000/view/'

if (process.env.CAMDIVIEWER) {
    root = process.env.CAMDIVIEWER + '/view/'
    console.log('VIEWER_PORT_80_TCP_ADDR found!')
} else
    console.log('VIEWER_PORT_80_TCP_ADDR not found')

viewRoot = l + c + root + c + l
console.log('CAMDIVIEWER', viewRoot)
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    VIEW_ROOT: viewRoot,
})