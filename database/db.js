// db connection

const mongoose = require("mongoose")
const mongoDb =process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Webscape"
mongoose.set('strictQuery', true);
mongoose.connect(mongoDb, (err) => {
    if (err) {
        console.log(`->Database not connected  ${err}`)
    } else {
        console.log("->Data base connected sucessfully")
    }
});
