const mongoose = require('mongoose')

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBCLUSTERNAME}.wkgwx.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
        .then(() => {
            console.log('[Database] connection successful')
        })
        .catch((err) => {
            console.log('[Database] connection error: '+ err)
        })
    }

}

module.exports = new Database()