import React, { useState } from 'react'
import './css/ProductView.css'
import './css/AdminProduct.css'
const ProductView = ({data,disabled}) => {
    const [vis,setVis] = useState(false)
  return (
    <div className='product-view-main-container'>
      <div className='product-view-minimized' style={{backgroundColor:(vis)?"rgba(46, 119, 255, 0.473)":"white"}}  onClick={()=>{!disabled && setVis(!vis)}}>
        <label style={{width:"20%",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:(disabled)?"500":"normal"}} className='product-name'>{data.productName}</label>
        <label style={{width:"20%",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:(disabled)?"500":"normal",color:(disabled)?"black":"grey"}} className='product-description'>{data.productDescription}</label>
        <label style={{width:"20%",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:(disabled)?"500":"normal",color:(disabled)?"black":"green"}} className='product-price'>{data.basePrice} rupees</label>
        <label style={{width:"20%",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:(disabled)?"500":"normal",color:(disabled)?"black":"red"}} className='product-discount'>{data.discount}</label>
        {(disabled)?<i class="fa-solid fa-expand"></i>:<i class="fa-solid fa-chevron-down" style={{rotate:(vis)?"180deg":"0deg"}}></i>}
      </div>
      <div className='product-detailed-view-container' style={{display:(vis)?"flex":"none"}}>
        <div className='pdvc-left'>
            <div className='pdvc-left-images'>
                {
                    data.images && data.images.map((image,index)=>{
                        return <div key={index}>
                            <img src={image} alt='product-image'/>
                        </div>
                    })
                }
            </div>
            <div className='pdvc-left-image-view'>
              {data.images && <img src={data.images[0]} alt='product-image'/>}
            </div>
        </div>
        <div className='pdvc-right'>
            <label className='common-main-heading'>{data.productName}</label>
            <label style={{color:"green"}}><i class="fa-solid fa-indian-rupee-sign" style={{scale:"0.8"}}></i> {data.basePrice}</label>
            <label style={{fontSize:"14px",width:"50%"}}>{data.productDescription}</label>
            <div className='divider-line'></div>
            <div className='common-input'>
                <label>Discount</label>
                <input type='text' value={data.discount} disabled style={{width:"30%",color:'red'}}/>
            </div>
            <div className='common-input' style={{marginTop:"20px"}}>
                <label>Discount Duration till</label>
                {/* new Date(data.discountDuration).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) */}
                <input type='text' value={new Date(data.discountDuration).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} disabled style={{width:"30%",color:'red'}}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
