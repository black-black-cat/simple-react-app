const test = require('tape')
const config = require('../config/webpack.base')



test('webpack base config', t => {
    let tag = '[object Object]'

    t.ok({}.toString.call(config) === tag)
    console.dir(config)
    t.end()
})
