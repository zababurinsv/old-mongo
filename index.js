const express = require("express");
const Enqueue = require('express-enqueue')
let formidableMiddleware = require('express-formidable');
let cors = require('cors')
let compression = require('compression')
let mongo  = require( './mongo.js')
let bid  = require( './bid.js')
let app = express();
app.use(compression())
app.use(cors())
app.use(formidableMiddleware());
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());
let whitelist = ['http://localhost:9876','https://zababurinsv.github.io','https://web3-monopoly.web.app','http://localhost:8888','http://localhost:8886','http://localhost:8887','http://localhost:8889', 'https://xart-3e938.firebaseapp.com','https://xart-3e938.web.app', 'https://vashi-faili.web.app','https://vashi-faili.web.app',  'https://www.universitykids.ru', 'https://tuning-fork.firebaseapp.com','http://localhost:8888', 'https://jainagul-tezekbaeva.firebaseapp.com','https://tezekbaeva.firebaseapp.com','http://localhost:3003','http://localhost:6310','http://localhost:6130','http://localhost:6112','http://localhost:3002']
const account = `/3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn`
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// app.get('/', async (req, res) => {
//     let rss = await mongo({
//         input:'mongo',
//         model:'feed',
//         type:'/'
//     },'get', 'type')
//     res.type('rss');
//     rss[0]['feed'] === undefined
//     if(rss[0]['feed'] === undefined){
//         res.send(rss);
//     }else{
//         res.send(rss[0]['feed']['rss']);
//     }
// })
app.get('/', async (req, res) => {
    res.send({mongo:"1.0.0"})
})

app.get('/bid',  async (req, res) => {
    let rss = await bid({
        input:'mongo',
        model:'bid',
        type:'/bids'
    },'get', 'type')
    res.type('rss');
    
    if(rss[0]['feed'] === undefined){
        res.send(rss);
    }else{
        res.send(rss[0]['feed']['rss']);
    }
})
app.options('/feeds', cors(corsOptions))
app.get('/feeds',   cors(corsOptions), async (req, res) => {
    try {
        let rss = await mongo({
            input:'mongo',
            model:'feed',
            type:'/feeds'
        },'get', 'type')
        res.send(rss);
    }catch (e) {
        res.send(e);
    }
    // res.send({key:'log'})
})
app.options('/itemsBid', cors(corsOptions))
app.get('/itemsBid',    cors(corsOptions), async (req, res) => {
    try {
        let items = await bid({
            input:'mongo',
            model:'item',
            type:'/itemsBid',
            name:'bid'
        },'get', 'type')
        if(items === null){
            res.send({status:-2});
        }else{
            res.send(items);
        }
    }catch (e) {
    
    }
})

app.options('/bids', cors(corsOptions))
app.get('/bids',   cors(corsOptions), async (req, res) => {
    let rss = await bid({
        input:'mongo',
        model:'bid',
        type:'/bids'
    },'get', 'type')
    
    res.send(rss);
})
app.options('/items', cors(corsOptions))
app.get('/items', cors(corsOptions),async (req, res) => {
    let news = await mongo({
        input:'mongo',
        model:'item',
        type:'/items'
    },'get', 'type')
    res.json(news)
})
app.options('/bidItem/:id', cors(corsOptions))
app.get('/bidItem/:id', cors(corsOptions), async (req, res) => {
    let news = await bid({
        input:'mongo',
        id:req.params.id,
        type:'bidItem'
    },'get', 'type')
    res.json(news)
})

app.options('/item', cors(corsOptions))
app.post('/item', cors(corsOptions),async (req, res) => {
    let item = await mongo({
        input:'mongo',
        model:'item',
        type:'/item',
        date:req.fields['id']
    },'get', 'type')
    res.json(item)
})

app.options('/create-channel', cors(corsOptions))
app.post('/create-channel', cors(corsOptions), async (req, res) => {
    
    let createNews = await mongo({
        input:'mongo',
        data:{
            feed:JSON.parse(req.fields['feed']),
            id: req.fields['id'],
            object:  req.fields['object']
        },
        type:'channel'
        
    },'create', 'type')
    res.json({create:'true'})
})
app.options('/create-bid', cors(corsOptions))
app.post('/create-bid', cors(corsOptions), async (req, res) => {
    
    let createNews = await bid({
        input:'mongo',
        data:{
            feed:JSON.parse(req.fields['feed']),
            id: req.fields['id'],
            object:  req.fields['object']
        },
        type:'bid'
        
    },'create', 'type')
    res.json({create:'true'})
})

app.options('/create-channelBid', cors(corsOptions))
app.post('/create-channelBid', cors(corsOptions), async (req, res) => {
    
    let createNews = await bid({
        input:'mongo',
        data:{
            feed:JSON.parse(req.fields['feed']),
            id: req.fields['id'],
            object:  req.fields['object']
        },
        name:'bid',
        type:'channelBid'
    },'create', 'type')
    res.json(createNews)
})


app.options('/create-itemBid', cors(corsOptions))
app.post('/create-itemBid', cors(corsOptions), async (req, res) => {
    
    await bid({
        input:'mongo',
        data:{
            item:JSON.parse(req.fields['item']),
            id: req.fields['id'],
            object:  req.fields['object']
        },
        name:'bid',
        type:'itemBid'
    },'create', 'type')
    res.json({create:'true'})
})
app.options('/update-feed/:id', cors(corsOptions))
app.put('/update-feed/:id', cors(corsOptions), async (req, res) => {
    await mongo({
        input:'mongo',
        model:'feed',
        type:'feed',
        _id:req.params.id,
        data:{
            feed:JSON.parse(req.fields['feed']),
            id: req.fields['id'],
            object:  req.fields['object']
        }
    },'update', 'type')
    res.json({update:'true'})
    // res.json('true')
})
app.options('/create-item', cors(corsOptions))
app.post('/create-item', cors(corsOptions), async (req, res) => {
    await mongo({
        input:'mongo',
        data:{
            item:JSON.parse(req.fields['item']),
            id: req.fields['id'],
            object:  req.fields['object']
        },
        type:'item'
    },'create', 'type')
    res.json({create:'true'})
})

app.options('/update-bid/:id', cors(corsOptions))
app.put('/update-bid/:id',  cors(corsOptions), async (req, res) => {
    
    await bid({
        input:'mongo',
        model:'bid',
        type:'bid',
        _id:req.params.id,
        data:{
            feed:JSON.parse(req.fields['feed']),
            id: req.fields['id'],
            object:  req.fields['object']
        }
    },'update', 'type')
    res.json({update:'true'})
})
//
app.options('/update-item', cors(corsOptions))
app.put('/update-item', cors(corsOptions), async (req, res) => {
    await mongo({
        input:'mongo',
        model:'feed',
        type:'item',
        id:req.fields['id'],
        data: {
            item:JSON.parse(req.fields['item']),
            id: 'education',
            object:  req.fields['object']
        }
    },'update', 'type')
    res.json({update:'true'})
})

app.options('/update-itemBid', cors(corsOptions))
app.put('/update-itemBid', cors(corsOptions), async (req, res) => {
    await bid({
        input:'mongo',
        model:'item',
        type:'itemBid',
        id:req.fields['id'],
        data: {
            item:JSON.parse(req.fields['item']),
            id: 'education',
            object:  req.fields['object']
        }
    },'update', 'type')
    res.json({update:'true'})
})

app.options('/delete-item', cors(corsOptions))
app.delete('/delete-item', cors(corsOptions), async (req, res) => {
    let del = await mongo({
        input:'mongo',
        model:'item',
        type:'item',
        date:req.fields['date']
    },'delete', 'type')
    res.json('true')
})
app.options('/delete-itemBid', cors(corsOptions))
app.delete('/delete-itemBid', cors(corsOptions),async (req, res) => {
    let del = await bid({
        input:'mongo',
        model:'item',
        type:'itemBid',
        date:req.fields['date']
    },'delete', 'type')
    
    res.json({delete: 'true'})
})
module.exports = app

