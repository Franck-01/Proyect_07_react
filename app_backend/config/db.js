import mongoose from "mongoose"

const URL_MONGO = process.env.URL_MONGO

const connect_data = async () => {
    mongoose.connect(URL_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) return ('Unable to Connect')
        console.log('database Connected')
    })
}

export default connect_data