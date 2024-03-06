import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  cty:{
    type:String,
    require:true,
    unique: true,
  }
})

const Category = mongoose.model("Category", categorySchema)

export default Category;
