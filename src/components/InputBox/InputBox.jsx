
import React, { forwardRef } from 'react'
import { useId } from 'react'


const InputBox = forwardRef(function InputBox({
    label,
    type='text',
    classname='',
    ...props
},ref)
    
{   
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} className={`${classname}`} {...props} ref={ref} id={id}></input>
        </div>
    )
})

export default InputBox