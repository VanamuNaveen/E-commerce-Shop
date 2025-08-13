import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminProduct from '../components/AdminProduct'
import './css/Admin.css'
import Order from '../components/Order'
import AdminOrderView from '../components/AdminOrderView'
const Admin = () => {
  const [currSelected,selectCurrSelected] = useState("products")
  const [orders,setOrders] = useState([])
  useEffect(()=>{
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:8080/order/all')
      const data = await response.json()
      setOrders(data)
    }
    fetchOrders()
  },[])
  return (
    <div className='admin-main-container'>
      <AdminHeader currSelected={currSelected} selectCurrSelected={selectCurrSelected}/>
      {(currSelected==="products")?<AdminProduct/>:null}
      {/* {(currSelected==="orders")?<Order/>:null} */}
      {(currSelected==="orders")?
        <div style={{width:"100%"}}>
          <div className='flex-row-between' style={{padding:"20px",width:"100%",gap:"3px"}}>
            <label style={{minWidth:"25%"}} className='common-small-heading'>Order Id</label>
            <label style={{flex:'1'}} className='common-small-heading'>Base Amount</label>
            <label style={{flex:'1'}} className='common-small-heading'>Discounted Amount</label>
            <label style={{flex:'1'}} className='common-small-heading'>Status</label>
          </div>
          {orders.map((order) => (
            <AdminOrderView key={order._id} order={order} />
          ))}
        </div>
        :null
      }
    </div>
  )
}

export default Admin
