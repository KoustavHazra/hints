import React, { useId } from 'react'

const Input = React.forwardRef( function Input({
    label,  // label to understand if the input is used in username or password or anywhere else
    type = "text",  // by default, "text" value will be there. If user passed some other type,
    // it will be changed -- like password type or email type.
    className = "",  // if user sends some new params, we can update it here.
    ...props  // if other props are sent, they will be destructured here .. and we can use them.
}, ref) {
    
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label 
                className='inline-block mb-1 pl-1' 
                htmlFor={id}>
                    {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white 
                            text-black outline-none focus:bg-gray-50 
                            duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
} )

export default Input;
