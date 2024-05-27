import mongoose, {Schema} from "mongoose";

const subscriptionsSchema = new Schema({
    subscriber : {
        type : Schema.Types.ObjectId, // one who is subscribing
        ref : "User"
    },
    channel : {
        type : Schema.Types.ObjectId, // one whom to subscriber
        ref : "User"
    }
}, {timestamps:true})

export const Subscriptions = mongoose.model("Subscriptions" , subscriptionsSchema)


