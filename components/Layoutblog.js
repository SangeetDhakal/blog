import React from 'react'
import HeaderBlog from './headerblog'


const LayoutBlog =({children}) =>{
    return (
        <React.Fragment>
            <HeaderBlog />
            {children}
           


        </React.Fragment>
    )
}

export default LayoutBlog;