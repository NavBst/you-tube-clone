import React, { useEffect, useState } from 'react'

const FilterBar = () => {
    const filters = ["All", "Music", "Gaming", "Tech", "News", "Sports", "Popular"];
    const [filter, setFilter] = useState([]);
    const [idx, setIndex] = useState(null);

    const handleFilter = (i) =>{
        setIndex(i);
    }
    useEffect(()=>{
        setFilter(filters)
    },[])
  return (
    <div className='py-2'>
        <div className='w-full flex justify-between'>
            {
                filter.map((items, index)=>{
                    return (
                    <button key={index} onClick={()=>handleFilter(index)} className={` px-2 py-1 text-[14px] rounded-lg font-semibold cursor-pointer ${idx===index ? "bg-black text-white" : "bg-gray-200"}`}>{items}</button>
                )})
            }
        </div>
    </div>
  )
}

export default FilterBar