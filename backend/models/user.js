import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true}
})


// In Node.js, Mongoose keeps a cache of all compiled models. If you run mongoose.model('User', userSchema)
//  a second time on an already existing model, it throws an OverwriteModelError.

// mongoose.models.User: Looks into Mongoose's internal list of models to see if a model
//  named User was already compiled during a previous execution.
const User = mongoose.models.User || mongoose.model('User', userSchema)
// const User = mongoose.model('User', userSchema)

export default User;