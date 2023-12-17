const {default: mongoose } = require("mongoose")

const dbConnect = () =>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected sucssfully")

    } catch (error) {
        console.log("database not connected");        
    }
};

module.exports = dbConnect;
