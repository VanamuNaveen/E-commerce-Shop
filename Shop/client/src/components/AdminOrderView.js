import React, { useEffect, useState } from 'react'
import './css/AdminOrderView.css'
import './css/ProductView.css'
import DropDown from './DropDown'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
const AdminOrderView = ({order}) => {
  const navigate = useNavigate()
  const [products,setProducts] = useState([])
  const [totalAmount,setTotalAmount] = useState(0)
  const [totalDiscount,setTotalDiscount] = useState(0)
  const [vis,setVis] = useState(false)
  const statusOptions = ["order placed", "order confirmed", "preparing to ship", "shipped", "delivered"]
  const [selectedStatus,setSelectedStatus] = useState(order.status)
  const [orderStatus,setOrderStatus] = useState(order.status)
  const fetchProducts = async () => {
    let total = 0;
    let dis_total = 0;
    const fetchedProducts = [];
    for (const product of order.products) {
      const response = await fetch(`http://localhost:8080/product/single/${product.productID}`);
      const data = await response.json();
      total += getAmount(data.basePrice,product.quantity,"0%")
      dis_total += getAmount(data.basePrice,product.quantity,product.discount)
      fetchedProducts.push(data);
    }
    setTotalAmount(total);
    setTotalDiscount(dis_total);
    setProducts(fetchedProducts);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const getAmount = (price,quantity,discount)=>{
    discount = discount.slice(0,discount.length-1)
    discount = parseInt(discount)
    let amount = price*quantity
    if(discount){
        amount = amount - (amount*discount/100)
    }
    return amount
}
  const handleClick = () => {
    axios.post("http://localhost:8080/order/updatestatus",{orderId:order._id,status:selectedStatus})
    .then((response) => {
      alert(response.data.message);
      setOrderStatus(selectedStatus);
    })
    .catch((error) => {
      console.error("Error updating order status:", error);
    })
  }
  const viewOrder = () => {
    navigate(`/order/${order._id}`)
  }
  const [deliveryPersonName,setDeliveryPersonName] = useState("")
  const [deliveryPersonPhone,setDeliveryPersonPhone] = useState("")
  const assignDelivery = () => {
    if(!deliveryPersonName || !deliveryPersonPhone){
      alert("Please fill all the fields")
      return
    }
    axios.post("http://localhost:8080/order/assigndelivery",{orderId:order._id,deliveryPersonName,deliveryPersonPhone})
    .then((response) => {
      alert(response.data.message);
      setDeliveryPersonName("")
      setDeliveryPersonPhone("")
    })
    .catch((error) => {
      console.error("Error assigning delivery person:", error);
    })
  }
  
  return (
    <div className='product-view-main-container'>
      <div className='product-view-minimized'>
        <a style={{cursor:"pointer",minWidth:"25%"}} className='hyper-link' href={`/order/${order._id}`}>{order._id}</a>
        <label style={{flex:'1'}}>{totalAmount}</label>
        <label style={{flex:'1'}}>{totalDiscount}</label>
        <label style={{flex:'1',transform:"translateX(-25px)"}}><i class="fa-solid fa-user-pen" onClick={()=>{setVis(true)}} style={{cursor:"pointer"}}></i> {orderStatus}</label>
        <div className='flex-row-center' style={{position:"absolute",right:"0px",scale:"0.7",gap:"5px"}}>
          <select className='common-dropdown' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {
              statusOptions.map((option,index)=>{
                return <option key={index} value={option} selected={order.status===option}>{option}</option>
              })
            }
          </select>
          { (order.status!==selectedStatus) && <button className='common-btn' onClick={handleClick}>update</button>}
        </div>
      </div>
      {vis && <div className='pop-up-details-container'>
        <div style={{cursor:"pointer",position:"absolute",top:"10px",right:"10px"}} onClick={()=>{setVis(false)}}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <label className='common-medium-heading' style={{marginBottom:"10px"}}>Assign Delivery</label>
        <CustomInput changeValue={setDeliveryPersonName} heading="Name" icon={<i class="fa-solid fa-user-large"></i>} width="100%"/>
        <CustomInput changeValue={setDeliveryPersonPhone} heading="Phone Number" icon={<i class="fa-solid fa-phone"></i>} inputtype="number" width="100%"/>
        <button onClick={assignDelivery} style={{marginTop:"10px"}} className='common-btn'>Assign</button>
      </div>}
    </div>
  )
}

export default AdminOrderView
