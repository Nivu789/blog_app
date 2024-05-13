import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto my-24'>
        {children}
    </div>
  )
}

export default Container