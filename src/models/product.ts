import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
 {
  name:{
    type:String,
    required:[true,"Product name is required"],
    trim:true,
  },
  description:{
    type:String,
    required:[true,"Description is required"],
  },
  image:{
    type:String,
    required:[true,"Product image is required"],
    trim:true,
  },
  price:{
    type:Number,
    required:[true,"Price is required"],
  },
  oldPrice:{
    type:Number,
    default:null,
  },
  sizes:{
    type:[String],
    default:["XS","S","M","L","XL","XXL"]
  },
  category:{
    type:String,
    enum:["jackets","sweatshirts","hoodies","tshirts","joggers","shirts"],
    required:[true,"Category is required"],
  },
  subCategory:{
    type:String,
    enum:["men","women","customized"],
    required:[true,"Sub Category is required"],
  },
  sale:{
    type:Boolean,
    default:false,
  },
  richCollection:{
    type:Boolean,
    default:false,
  },
 },
 {
  timestamps: true,
 }
);

const Product = mongoose.model("Product",productSchema)
export default Product;



// {
//   name: "Example Product",
//   description: "This is an example product description.",
//   image: "example.jpg",
//   price: 50,
//   category: "tshirts",
//   subCategory: "men",
//   sale: true,
// }