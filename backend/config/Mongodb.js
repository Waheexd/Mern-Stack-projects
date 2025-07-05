import mongoose from 'mongoose'

const connectDb =async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("✅ DB CONNECTED to:", mongoose.connection.name);
        
    })
   await mongoose.connect(`${process.env.MONGODB_URI}`)


}
export default connectDb;