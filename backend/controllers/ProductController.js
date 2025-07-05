import {v2 as cloudinary} from "cloudinary"
import productModal from "../modals/ProductModal.js";
// func for  product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
     const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imagesURL =await Promise.all(
            images.map(async(item)=>{
                let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
  name,
  description,
  price: Number(price),
  image: imagesURL,
  category,
  subCategory,
  sizes: JSON.parse(sizes),
  bestSeller: bestSeller === "true" ? true : false,
  date: Date.now()
};

const product= new productModal(productData);
await product.save();
 
    console.log(productData)

    console.log(name, description, price, category, subCategory, sizes, bestSeller);
    console.log(image1, image2, image3, image4);
    console.log(imagesURL)
    console.log(images)
     console.log("Files:", req.files);
    console.log("REQ BODY:", req.body);
console.log("REQ FILES:", req.files);

    res.json({ success: true, message: "Product data logged successfully" });
  } catch (error) {
    console.error("Add Product Error:", error); // ✅ log full error in backend
  res.status(500).json({ success: false, message: error.message }); 
  }
};

// func for list product
const listProduct = async (req, res) => {
  // to be implemented
  try {
    const products=await productModal.find({});
    res.json({success:true,products})
  } catch (error) {
    console.log(error);
    res.json({success:false ,message:error.message})
    
    
  }
};

// func for remove product
const removeProduct = async (req, res) => {

    try {
        await productModal.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        
    }
     console.log(error);
    res.json({success:false ,message:error.message})
  // to be implemented
};

// func for single product
const singleProduct = async (req, res) => {
  try {
    const {productId}=req.body
    const product =await productModal.findById(productId)
    res.json({success:true, product})

  } catch (error) {
     console.log(error);
    res.json({success:false ,message:error.message})
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
