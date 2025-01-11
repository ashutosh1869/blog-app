import React,{useId} from 'react'

function Select({
  options,
  label,
  className,
  ...props
},ref) {
  const id = useId()
  
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className='block text-sm font-medium text-gray-700'>{label}</label>}
      <select {...props} ref={ref} id={id}
      className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      >

        {options?.map((option)=>(
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)