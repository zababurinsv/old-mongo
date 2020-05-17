const empty = require('is-empty');
const connection = require('./connection');
const mongo = require('mongoose');
let conn = null;

module.exports = (obj, func, ...args)=>{
    return new Promise( function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err  ~~~', error)
            reject(error)
        }
        switch (func) {
            case 'delete':
                (async (obj, props,data) => {
                    try {
                        // console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'itemBid':
                                (async (obj, props,data) => {
                                    try {
                                        // console.log(`${obj['input']}[(table)${obj[props]}]`)
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }

                                        }

                                        const M = conn['bid'].model('item');
                                        M.findOneAndRemove({ "item.date_modified": obj['date'] })
                                            .exec()
                                            .then(() => {

                                                out({sucsess: 'true'})
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])

                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'create':
                (async (obj, props,data) => {
                    try {
                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'channel':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['bid'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        let M = conn['bid'].model('feed');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'channelBid':
                                (async (obj, props,data) => {
                                    try {
                                        if(empty(obj['name'])){
                                            obj['name'] = 'default'
                                        }
                                        let M = {}
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                                }
                                            }
                                        M = conn['bid'].model('bid');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':
                                (async (obj, props,data) => {
                                    try {

                                        if(empty(obj['name'])){
                                            obj['name'] = 'default'
                                        }
                                        let M = {}
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }
                                        M = conn['bid'].model('item');

                                        // console.log(M)
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'itemBid':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }
                                        let M = conn['bid'].model('item');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }


                        out(obj)
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])

                break
            case 'get':
                (async (obj, props,data) => {
                    try {
                        switch (obj[props]) {
                            case '/bids':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {

                                            conn =   await connection('init')

                                            try {
                                                conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {
                                            }
                                        }else{
                                            try {
                                                conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {
                                            }

                                        }
                                        const M = conn['bid'].model('bid');

                                        M.find()
                                            .exec()
                                            .then(news => {
                                                if(news.length === 0){

                                                    let none = `null`

                                                    out(none)
                                                }else{

                                                    out(news)
                                                }
                                            });
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/itemsBid':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        let itemBidM  = conn['bid'].model('item');
                                        itemBidM.find()
                                            .exec()
                                            .then(news => {

                                                out(news)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'bidItem':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }

                                        const M = conn['bid'].model('item');

                                        M.findOne({ "item.date_modified": obj['id'] })
                                            .exec()
                                            .then((item) => {

                                                out(item)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'update':
                (async (obj, props,data) => {
                    try {
                        // console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'bid':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {

                                            conn =   await connection('init')
                                            conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));

                                        }else{

                                            try {
                                                conn['bid'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }
                                        }
                                        // obj['data']['feed'] = JSON.parse(obj['data']['feed'])
                                        // console.log('@@@@@@@@@@@@@@',JSON.parse(obj['data']['feed']))

                                        const M = conn['bid'].model('bid');
                                        M.findOneAndUpdate({_id: obj['_id']}, obj['data'])
                                            .exec()
                                            .then((product) => {

                                                out(product)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'itemBid':
                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')

                                            conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn['bid'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }
                                        }

                                        const M = conn['bid'].model('item');
                                        M.findOneAndUpdate({ "item.date_modified": obj['id'] },obj['data'])
                                            .exec()
                                            .then((product) => {

                                                out(product)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])

                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }


                        out(obj)
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            default:
                err(`new function ${func}`)
                break
        }
    })
}
