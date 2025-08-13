import React, { useEffect, useState } from 'react'
import './css/AdminProduct.css'
import AddProduct from './AddProduct'
import ProductView from './ProductView'
import {sweets} from '../Data.js'
const AdminProduct = () => {
    const [currSelectedItem,setCurrSelecctedItem] = useState("all-products")
    const heading={
      productName: "Name",
      basePrice: "Cost",
      productDescription: "Description",
      discount: "Discount",
      discountDuration: "3 days",
      categories: "Sweets"
    }

    const [products,setProducts] = useState([])

    useEffect(()=>{
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:8080/product/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts()
    }
    ,[])

  return (
    <div className='admin-product-main-container'>
      <div className='admin-product-left'>
        <div className={(currSelectedItem==="all-products")?"item-selected":""} onClick={()=>{setCurrSelecctedItem("all-products")}}>
            <i class="fa-solid fa-cart-shopping"></i>
            <label>All Products </label>
        </div>
        <div className={(currSelectedItem==="add-new-product")?"item-selected":""} onClick={()=>{setCurrSelecctedItem("add-new-product")}}>
            <i class="fa-solid fa-cart-plus"></i>
            <label>Add New Product</label>
        </div>
      </div>
      <div className='admin-product-right'>
        {
          (currSelectedItem==="all-products")?
          <div className='product-details-view'>
          <div className='common-main-heading'>
            <label>All Products</label>
          </div>
          <div className='all-products-container'>
            <div className='all-products-sub-container-heading'>
              <ProductView data={heading} disabled={true}/>
            </div>
            <div className='all-products-sub-container custom-scroll'>
              {
                products.map((item,index)=>{
                  return <ProductView key={index} data={item}/>
                })
              }
            </div>
          </div>
        </div>
        :
        <AddProduct/>
        }
        
      </div>
    </div>
  )
}

export default AdminProduct
