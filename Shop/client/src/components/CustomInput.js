import React, { useEffect, useRef, useState } from 'react'
import './css/CustomInput.css'
const CustomInput = ({heading,icon,width,encrypt,changeValue,inputtype}) => {
    const [fontWeight,setFontWeight]=useState("300")
    const [fontSize,setFontSize] = useState("10px")
    const [value,setValue] = useState("")
    const [border,setBorder] = useState(false)
    const [inputType,setInputtype] = useState((inputtype)?inputtype:(encrypt)?"password":'text')
    useEffect(()=>{
        if(value==""){
            setFontWeight("300")
            setFontSize("10px")
        }
        else{
            setFontWeight("bold")
            setFontSize("13px")
        }
    },[value])
    const handleOnFocus = ()=>{
        setBorder(!border)
    }
    const handleVisibility = ()=>{
        if(encrypt){
            if(inputType=="text"){
                setInputtype("password")
            }
            else{
                setInputtype("text")
            }
        }
    }
  return (
    <div className='input-main-container' style={{width:width,border:(border)?"2px solid rgb(121, 174, 255)":"none"}}>
      <div className='input-text-container'>
        <label>{heading}</label>
        <input type={inputType} onFocus={handleOnFocus} onBlur={handleOnFocus} onChange={(e)=>{
          setValue(e.target.value)
          changeValue(e.target.value)
          }} placeholder={`enter your ${heading}`} style={{fontWeight:fontWeight,fontSize:fontSize}}/>
      </div>
      <div className='input-icon-container' onClick={handleVisibility}>
        {icon}
      </div>
    </div>
  )
}

export default CustomInput
