import React, { useEffect, useState } from 'react';
import useWebStore from '../store/web-store';

const SearchBar = () => {
    const getConcert = useWebStore((state)=>state.getConcert)
    const concerts = useWebStore((state)=>state.concerts)
    const actionSearchFilters = useWebStore((state)=>state.actionSearchFilters)
    
    const [ text, setText ] = useState('')
    console.log(text)
    useEffect(()=>{
        const delay= setTimeout(()=>{
            actionSearchFilters({query:text})
            if(!text){
                getConcert()
            }
        },300)
        return ()=> clearTimeout(delay)
    },[text])
  return (
    <div className="absolute p-2 mt-60 w-4/6  drop-shadow-lg bg-white h-16 rounded-lg flex justify-between">
      <input
      onChange={(e)=>setText(e.target.value)}
        type="text"
        placeholder="  ค้นหา"
        className="border border-gray-300 rounded-md p-2 w-full mr-5 focus:outline-none placeholder:font-fcfriday text-xl"
      />
      <button className="bg-blue-500 text-white font-fcfriday text-2xl rounded-md py-2 px-16">
        ค้นหา
      </button>
    </div>
  );
};

export default SearchBar;
