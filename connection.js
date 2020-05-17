const feed ="mongodb+srv://Sergey:fds744502fds@xart-qd8fc.mongodb.net/school?retryWrites=true&w=majority"
const bid ="mongodb+srv://Sergey:fds744502fds@xart-qd8fc.mongodb.net/bid?retryWrites=true&w=majority"
const mongo = require('mongoose');
mongo.set('useUnifiedTopology', true)
mongo.set('useFindAndModify', false)
mongo.set('bufferCommands', false)

module.exports = (obj)=>{
    return new Promise(async function (resolve, reject) {

        switch (obj) {
            case 'feed':
                break
            case 'bid':
                break
            case 'init':
                    let db = {}
                    db['feed'] =  await mongo.createConnection( feed, {
                        authSource: "admin",
                        useNewUrlParser: true,
                        poolSize: 4
                    });
                    db['bid'] = await mongo.createConnection( bid, {
                        authSource: "admin",
                        useNewUrlParser: true,
                        poolSize: 4
                    });
                    resolve(db)
                break
            default:
                console.log('не определён')
                break

        }

    })
}
