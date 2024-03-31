import React from 'react'

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-400",
    textColor = "text-white",
    className = "",
    ...props
}) {
//   const handleClick = (e) => {
//     console.log("Button clicked");
//     console.log("Button type:", type);
// };

return (
    <button
        type={type}
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
        // onClick={handleClick}
        {...props}
    >
        {children}
    </button>
);
}


// learn about forwardRef !!
