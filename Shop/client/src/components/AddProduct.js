import React, { useRef, useState } from 'react'
import './css/AdminProduct.css'
import DropDown from './DropDown';
import axios from 'axios';
const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [selectImageIndex,setSelectedImageIndex] = useState(0)
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [basePrice,setBasePrice] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [discountDuration,setDiscountDuration] = useState(0)
    const [category,setCategory] = useState([])
    const fileInputRef = useRef(null);

    const handleAddImage = () => {
        fileInputRef.current.click(); // open file picker
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        console.log(selectedFiles)
        setImages((prevImages) => [...prevImages, ...selectedFiles]);
        // e.target.value = null; // reset input so selecting same file again works
        // console.log(images)
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        // Append each image file
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    
        // Append other product data
        formData.append("productName", name);
        formData.append("productDescription", description);
        formData.append("basePrice", basePrice);
        formData.append("discount", discount);
        formData.append("discountDuration", discountDuration);
        formData.append("categories", JSON.stringify(category)); // Convert array to string
        try {
            const response = await axios.post("http://localhost:8080/product/create", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            // console.log(response.data);
            alert("Product created successfully")
            clearAllVariables()
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    function clearAllVariables(){
        setImages([])
        setName("")
        setDescription("")
        setBasePrice("")
        setDiscount("")
        setCategory([])
        setSelectedImageIndex(0)
    }
    
  return (
    <div className='add-new-product-container'>
      <div className='add-new-product-header'>
        <div>
            <i class="fa-solid fa-cart-shopping" style={{scale:"1.2"}}></i>
            <label className='common-main-heading'>Add Product </label>
        </div>
        <div>
            <div className='add-product-custom-button' onClick={handleSubmit}>
                <i class="fa-solid fa-check"></i>
                <label>Add Product</label>
            </div>
        </div>
      </div>
      <div className='add-product-bottom-container'>
        <div className='add-new-product-bottom-left'>
            <div className='add-new-product-general-info'>
                <label className='common-side-heading'>General Information</label>
                <div className='common-input'>
                    <label>Product Name</label>
                    <input value={name} onChange={e=>setName(e.target.value)} type='text' placeholder='give product name'/>
                </div>
                <div className='common-input'>
                    <label>Product Description</label>
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} rows="6" placeholder='give product description'></textarea>
                </div>
            </div>
            <div>
                <label className='common-side-heading'>Pricing</label>
                <div className='common-input'>
                    <label>Base Price</label>
                    <input value={basePrice} onChange={e=>setBasePrice(e.target.value)} type='text' placeholder='0.00'/>
                </div>
                <div className='common-input'>
                    <label>Discount</label>
                    <input value={discount} onChange={e=>setDiscount(e.target.value)} type='text' placeholder='10%'/>
                </div>
                <div className='common-input'>
                    <label>Discount Duration</label>
                    <input onChange={e => setDiscountDuration(new Date(e.target.value))} type='date' placeholder='10%'/>
                </div>
            </div>
        </div>
        <div className='add-new-product-bottom-right'>
            <div className='add-new-product-image-tab-container'>
                <label>Upload Images</label>
                <div className='add-new-product-image-view'>
                    {(images.length!==0)?<img src={URL.createObjectURL(images[selectImageIndex])}/>:null}
                </div>
                <div className='add-new-product-all-image-container'>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    {
                        images.map((image,index)=>{
                            return <div key={index} className='add-new-product-small-image-display' onClick={()=>{setSelectedImageIndex(index)}}>
                                <img src={URL.createObjectURL(image)}/>
                            </div>
                        })
                    }
                    <div className='add-new-image-adder'>
                        <div className='add-new-product-add-image-button' onClick={handleAddImage}>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <label>Category</label>
                <div className='common-input'>
                    <label>Product Category</label>
                    <DropDown setValues={setCategory} data={["Sweet","Hot","Jaggery","Sugarfree"]} width="100%" placeholder="select category"/>
                    <div className='add-product-custom-button' style={{scale:"0.8",transform:"translateX(25%)"}}>
                        <i class="fa-solid fa-plus"></i>
                        <label>Add Category</label>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
