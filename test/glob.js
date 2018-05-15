const test = require('tape')
let glob = require('glob')
let path = require('path')

test('glob', t => {
    let dir = path.resolve(__dirname, '../src/client/pages/**/main.js')
    console.log(dir)
    let files = glob.sync(dir, {
        // cwd: process.cwd() // default 使用 npm scripts 时，是package.json所在目录
        // root: path.resolve(options.cwd, "/") // default
    })

    t.ok(Array.isArray(files))
    t.ok(files[0] && files[0].indexOf('main.js') > -1)
    t.equal(files.filter(f => f.indexOf('main.js') > -1).length, files.length)
    t.end()
})
