const mongoose = require("mongoose")
require("dotenv").config()
// mongoose.connect(`mongodb+srv://123@cluster0.vuemg.mongodb.net/bluesoftdemoapp?retryWrites=true&w=majority`, { useNewUrlParser: true }, { useUnifiedTopology: true })
// mongoose.connect(`mongodb://localhost:27017/gim`, { useNewUrlParser: true }, ()=>{ console.log('database connected') })
mongoose.connect(`mongodb+srv://123:123@cluster0.vuemg.mongodb.net/<dbname>?retryWrites=true&w=majority`, {useUnifiedTopology: true ,  useNewUrlParser: true }, ()=>{ console.log('database connected') })

