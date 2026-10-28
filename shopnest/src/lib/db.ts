import mongoose from "mongoose";
const mongodbUrl = process.env.MONGODB_URL;

if(!mongodbUrl){
    throw new Error("Connect failed to the database")
}

let cached = global.mongoose;

if(!cached)
{
    cached = global.mongoose = {conn:null,promise:null}
}

const connectDb = async () =>{
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise)
    {
        cached.promise = mongoose.connect(mongodbUrl,{ autoIndex: true,}).then((c)=> c.connection)
    }
    try {
        let add = await cached.promise;
        return add;
    } catch (error) {
        throw new Error("connection is failed from catch")
    }
}

export default connectDb;