const path = require('path')
const glob = require('glob')

const filePrefix = 'wxlogin-'

module.exports = function () {
    let WebpackE = {}
    glob.sync("./src/comment/*/index.js").forEach(function(element){
            let  fileName = element.split('/').splice(-2)[0]
            WebpackE[fileName] = element
    })
    console.log(WebpackE)
    return WebpackE
}




  // files.forEach(element => {
        //     // console.log(element)
        //     let  fileName = element.split('/').splice(-2)[0]
        //     // console.log(element.split('/'))
        //     console.log(fileName)
        //     WebpackE[fileName] = element
        //     // console.log('----------------------------')
        //     // console.log(element.split('/').splice(-2))
        // });


