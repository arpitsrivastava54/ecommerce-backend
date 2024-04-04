import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  firstName:{
    type:String,
    required:[true,"FirstName is required"],
    trim:true,
  },
  lastName:{
    type:String,
    required:[true,"LastName is required"],
    trim:true,
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    trim:true,
  },
  phone:{
    type:String,
    required:[true,"Phone Number is required"],
    trim:true,
  },
  message:{
    type:String,
    required:[true,"Message is required"],
  }
})



const Contact = mongoose.model("Contact",contactSchema);
export default Contact;