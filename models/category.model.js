import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  bgcolor:{
    type:String,
    required:true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;