import mongoose, { Schema } from "mongoose";

const bannerSchema = new Schema ({
  image:{
    type:String,
    required:[true,"Banner Image is required"],
    trim:true,
  },
  category:{
    type:String,
    required:[true,"Banner category is required"],
    trim:true,
  }
},{
  timestamps:true,
})


const Banner = mongoose.model("Banner",bannerSchema);
export default Banner;