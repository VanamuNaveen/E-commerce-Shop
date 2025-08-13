import React, { useState } from 'react'
import './css/AdminHeader.css'
const AdminHeader = ({currSelected,selectCurrSelected}) => {
    
  return (
    <div className='admin-header-container'>
      <div className='admin-header-left'>
        <div className='logo-container'>
            <label>E-Commerce</label>
        </div>
      </div>
      <div className='admin-header-middle'>
        <label className={(currSelected==="products")?'label-underline':''} onClick={()=>{selectCurrSelected("products")}}>Products</label>
        <label className={(currSelected==="orders")?'label-underline':''} onClick={()=>{selectCurrSelected("orders")}}>Orders</label>
        <label className={(currSelected==="notification")?'label-underline':''} onClick={()=>{selectCurrSelected("notification")}}>Notifications</label>
      </div>
      <div className='admin-header-right'>
        <div className={(currSelected==="dashboard")?'icon-selected':""} onClick={()=>{selectCurrSelected("dashboard")}}>  
           <i class="fa-solid fa-chart-line"></i>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
