const utils = require('lisa.utils')
const miniClient = require('mini.req.js')

const G = global || globalThis || window || {}
G.dsonConfigs = G.dsonConfigs || {}

exports.extends = (dson) => {
    if (dson && dson.reg) {
        dson.reg('api',  invoke)
    }
}

const invoke = async (context,urlOrObject,method,data,options)=>{
    var url = urlOrObject
    var m = method
    var d = data
    var options = options
    if(utils.Type.isObject(urlOrObject)){
        url = urlOrObject.url
        m = urlOrObject.method
        d = urlOrObject.data
        options = Object.assign({},urlOrObject,options||{})
    }

    //url 特殊处理
    //todo
    var realMethod = m || 'get'

    //load http client
    var httpClient  = G.dsonConfigs.httpClient || miniClient
    //cache
    //todo

    var result = await httpClient(url,realMethod,data,options)

    context.currentData = context.tempData = result
}