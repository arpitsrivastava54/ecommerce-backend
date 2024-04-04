import mongoose from "mongoose";


const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique:true,
  },
  image: {
    type: String,
    required: [true, "Category image is required"],
    trim: true,
  },
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
export default ProductCategory;