const { default: mongoose } = require('mongoose');
const connection = {};
const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.Mongo);
        connection.isConnected = db.connections[0].readyState;
    }
    catch (error) {
        console.log(error)
        throw new Error('Error connecting to database')
    }
}