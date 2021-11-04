const mongoose = require('mongoose')

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBCLUSTERNAME}.wkgwx.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
        .then(() => {
            console.log('database connection successful')
        })
        .catch((err) => {
            console.log('database connection error: '+ err)
        })
    }

}

module.exports = new Database()