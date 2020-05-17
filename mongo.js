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
                            case 'item':
                              await  (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                        conn =   await connection('init')

                                            conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }

                                        }
                                        const M = conn['feed'].model('item');
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
                        switch (obj[props]) {
                            case 'channel':
                               await (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        let M = conn['feed'].model('feed');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'channelBid':
                               await (async (obj, props,data) => {
                                    try {
                                        if(empty(obj['name'])){
                                            obj['name'] = 'default'
                                        }
                                        let M = {}
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            conn['feed'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['feed'].model('bid', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                                }
                                            }
                                        M = conn['feed'].model('bid');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':
                             await (async (obj, props,data) => {
                                    try {

                                        if(empty(obj['name'])){
                                            obj['name'] = 'default'
                                        }
                                        let M = {}
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }
                                        M = conn['feed'].model('item');
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'itemBid':
                               await (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')
                                            conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }
                                        let M = conn['feed'].model('item');
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
                            case '/feeds':
                               await (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn =   await connection('init')


                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{

                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }
                                        const M = conn['feed'].model('feed');
                                        M.find()
                                            .exec()
                                            .then(news => {
                                                if(news.length === 0){

                                                    out({status:'-2'})
                                                }else{

                                                    out(news)
                                                }
                                            });
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/':
                               await (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn = await connection('init')
                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }
                                        const M = conn['feed'].model('feed');

                                        const doc = await M.find()
                                            .exec()
                                            .then(news => {
                                                if(news.length === 0){
                                                    let none = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
</channel>
</rss> `

                                                    out(none)
                                                }else{

                                                    out(news)
                                                }
                                            });
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/item':
                               await (async (obj, props,data) => {
                                    try {
                                        // console.log(`${func}[(${obj['input']})${obj[props]}]`)

                                        if (conn == null) {
                                            conn = await connection('init')

                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        const M = conn['feed'].model('item');

                                        M.findOne({ "item.date_modified": obj['date'] })
                                            .exec()
                                            .then((item) => {

                                                out(item)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/items':
                               await (async (obj, props,data) => {
                                    try {
                                        if(empty(obj['name'])){
                                            obj['name'] = 'default'
                                        }
                                        let M = {}
                                        if (conn == null) {
                                            conn = await connection('init')

                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        M = conn['feed'].model('item');

                                        M.find()
                                            .exec()
                                            .then(news => {

                                                out(news)
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
                            case 'feed':
                               await (async (obj, props,data) => {
                                    try {
                                        // console.log(`${func}[(${obj['input']})${obj[props]}]`)
                                        if (conn === null) {

                                            conn = await connection('init')

                                            conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));

                                        }else{

                                            try {
                                                conn['feed'].model('feed', new mongo.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            }catch (e) {
                                            }
                                        }

                                        const M = conn['feed'].model('feed');

                                        M.findOneAndUpdate({"_id": obj['_id']}, obj['data'])
                                            .exec()
                                            .then((product) => {
                                                out(product)
                                            })
                                    } catch (e) { err({
                                        input:'update-feed',
                                        type:e
                                    })}
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':
                               await (async (obj, props,data) => {
                                    try {
                                        // console.log(`${obj['input']}[(table)${obj[props]}]`)


                                        if (conn == null) {
                                            conn = await connection('init')


                                            conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn['feed'].model('item', new mongo.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }
                                        }

                                        const M = conn['feed'].model('item');
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
