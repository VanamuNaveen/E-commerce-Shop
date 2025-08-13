import React, { useEffect, useState } from 'react'
import './css/DropDown.css'
const DropDown = ({data,placeholder,width,setValues}) => {
  const [vis,setVis]=useState(false)
  const [selectedItems,setSelectedItems]=useState([])
  useEffect(()=>{
    setValues(selectedItems)
  },[selectedItems])
  const deleteSelectedItem = (index)=>{
    setSelectedItems(prev=>prev.filter((item,i)=>index!==i))
  }
  const addSelectedItem = (item)=>{
    setSelectedItems(prev=>[...prev,item])
  }

  return (
    <div className='dropdown-container' style={{width:width}}>
      <input type='text' placeholder={placeholder}/>
      <div className='dropdown-selected-items-container'>
        {
          selectedItems.map((item,index)=>{
            return <div className='selected-item'>
                    <label>{item}</label>
                    <div className='dropdown-icon delete-selection' onClick={()=>{deleteSelectedItem(index)}}>
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                  </div>
          })
        }
      </div>
      <div className='dropdown-items-container' style={{display:(vis)?"flex":"none"}}>
        {
          data.map((item,index)=>{
            return <label key={index} onClick={()=>{addSelectedItem(item)}}>{item}</label>
          })
        }
      </div>
      <div className='dropdown-icon' onClick={()=>{setVis(!vis)}}>
        <i class="fa-solid fa-chevron-down" style={{rotate:(vis)?"180deg":"0deg",transition:"all 0.1s"}}></i>
      </div>
    </div>
  )
}

export default DropDown
