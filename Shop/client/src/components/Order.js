import React, { useEffect, useState } from 'react'
import './css/Order.css'
import {sweets} from '../Data.js'
import { useParams } from 'react-router-dom'
const Order = () => {
    const {id} = useParams()
    const [order,setOrder] = useState({
        _id:"",
        products:[],
        orderedByUserId:"",
        status:"",
        deliveryAssignedTo:"",
        createdAt:""
    })
    const trackMap = {
        "order placed":1,
        "order confirmed":2,
        "preparing to ship":3,
        "shipped":4,
        "delivered":5
    }
    const [products,setProducts] = useState([])
    const [total,setTotal] = useState(0)
    const [totalDiscount,setTotalDiscount] = useState(0)
    const fetchProducts = async () => {
        let total = 0;
        let discountedTotal = 0;
        const fetchedProducts = [];
        for (const product of order.products) {
          const response = await fetch(`http://localhost:8080/product/single/${product.productID}`);
          let data = await response.json();
          total += data.basePrice * product.quantity;
          discountedTotal += getAmount(data.basePrice,product.quantity,product.discount)
          data = {...data, quantity: product.quantity,discount:product.discount};
          fetchedProducts.push(data);
        }
        setTotal(total);
        setProducts(fetchedProducts);
        setTotalDiscount(discountedTotal);
      };
    const fetchOrder = async () => {
      const response = await fetch(`http://localhost:8080/order/single/${id}`)
      const data = await response.json()
      setOrder(data)
    }
    const getAmount = (price,quantity,discount)=>{
        discount = discount.slice(0,discount.length-1)
        discount = parseInt(discount)
        let amount = price*quantity
        if(discount){
            amount = amount - (amount*discount/100)
        }
        return amount
    }
    useEffect(()=>{
        fetchOrder()
    },[])
    useEffect(() => {
        fetchProducts();
      }, [order.products]);
  return (
    <div className='order-main-container custom-scroll'>
        <div className='flex-row-between wrap' style={{padding:"20px 100px",width:"100%"}}>
            <label className='common-big-heading'>Details of your order</label>
            <div className='flex-column common-small-font'>
                <label>Order ID : {order._id}</label>
                <label>Order Placed on : {order.createdAt}</label>
                <label className='hyper-link'>view invoice <i class="fa-solid fa-chevron-right"></i></label>
            </div>
        </div>
        <div className='flex-row-start wrap' style={{padding:"50px",gap:"10%"}}>
            <div className='img-container' style={{width:"25vw",marginLeft:"10%"}}>
                <img src={products.length>0?products[0].images[0]:null}/>
            </div>
            <div className='flex-column'>
                <div style={{display:"flex",gap:"10px",alignItems:"center",flexDirection:"row",flexWrap:"wrap"}}>
                    {
                       products.map((item,idx)=>{
                        return<> 
                            <label key={idx} className='common-small-font'>{item.productName}</label>
                            <div className='divider-line' style={{width:"1px",height:"15px"}}></div>
                        </>
                       })
                    }
                </div>
                <label className='common-medium-heading'>{order.status}</label>
                <label className='hyper-link common-small-font'>Track Shipment <i class="fa-solid fa-chevron-right"></i></label>
                <div className='order-progress-container flex-column'>
                    <div className='progress flex-row-start'>
                        <div style={{width:`${trackMap[order.status]*20}%`,height:"100%",backgroundColor:"green"}}></div>
                    </div>
                    <div className='flex-row-between'>
                        <label className='common-small-font'>order placed</label>
                        <label className='common-small-font'>order confirmed</label>
                        <label className='common-small-font'>preparing to ship</label>
                        <label className='common-small-font'>shipped</label>
                        <label className='common-small-font'>delivered</label>
                    </div>
                </div>
                <label className='common-medium-font' style={{width:"30vw"}}>your item is on the way. Please use "track shipment" link for the most up-to-date  delivery information, to reshedule or hold or pickup.</label>
            </div>
        </div>
        <div className='divider-line' style={{width:"100%"}}></div>
        <div className='flex-row-even'>
            <div className='flex-column'>
                <label className='common-medium-heading'>Order Details</label>
                {
                    products.map((item,index)=>{
                        return <div className='flex-row-between' style={{gap:"40px",width:"120%",justifyContent:"space-between"}} key={index}>
                            <label className='common-small-font' style={{flex:"1",minWidth:"55%"}}>{item.productName}</label>
                            <label className='common-small-font' style={{flex:"1"}}>{item.basePrice*item.quantity}({item.basePrice}X{item.quantity})</label>
                            <label className='common-small-font'>{getAmount(item.basePrice,item.quantity,item.discount)}({item.discount })</label>
                        </div>
                    })
                }
                <div className='divider-line' style={{width:"120%",margin:"10px 0px"}}></div>
                <div className='flex-row-between' style={{gap:"40px",width:"120%",justifyContent:"space-between"}}>
                    <label className='common-small-font' style={{flex:"1",minWidth:"55%"}}>total</label>
                    <label className='common-small-font' style={{flex:"1"}}>{total}rs</label>
                    <label className='common-small-font'>{totalDiscount}rs</label>
                </div>
            </div>
            <div className='flex-column'>
                <label className='common-medium-heading'>Delivery Assigned to</label>
                <label className='common-small-font'>Assigned to : {order.deliveryAssignedTo}</label>
            </div>
        </div>
    </div>
  )
}

export default Order
