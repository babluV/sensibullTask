 

import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './Style.css' 
import Papa from 'papaparse';

function Symbols() {
  const [symbolList, setSymbolList] = useState();
 const [filterData,setFilterData] = useState("");
 const [filteredArr,setFiltererdArr] = useState([]);

  var  navigate = useNavigate();



  useEffect(() => {
    async function getData() {
      const response = await fetch("https://prototype.sbulltech.com/api/v2/instruments");
      const reader = response.body.getReader();
      console.log("reader" + reader)
      const result = await reader.read(); 
      console.log("result" + result);
      const decoder = new TextDecoder("utf-8");
      console.log("decode" + decoder)
      const csv = decoder.decode(result.value); 
      console.log("csv..." + csv)
      const results = Papa.parse(csv, { header: true }); 
      console.log("result..." + result)
      const rows = results.data;
      console.log("rows..." + rows); 
      setSymbolList(rows);
    }
    getData();
  }, []);

  function details(parsedData){
    const symbolName = parsedData.Symbol;
    navigate(`${symbolName}`)
  }
useEffect(()=>{
  if(filterData.length > 0)
  findData();
},[filterData]);
 

  function findData(){
    const filterArr = symbolList.filter((item)=> 
    item.Symbol && item.Symbol.toString().
    toUpperCase().includes(filterData && filterData.toUpperCase())
    || item.Name && item.Name.toUpperCase().
    includes(filterData && filterData.toUpperCase()));
    setFiltererdArr(filterArr);
  }


  return (
    <div className="Archive">
      <h1>SymbolList 🧑‍💻</h1>
      <input className="search"
        placeholder = "Search By Symbol or Name.."
        value={filterData}
        onChange={(e)=>setFilterData(e.target.value)}
        />
      <table className="ArchiveTable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredArr.length < 1 ? (
          symbolList &&
            symbolList.map((parsedData, index) => (
              <tr key={index}>
                <td onClick={()=>details(parsedData)}>{parsedData.Symbol}</td>
                <td>{parsedData.Name}</td>
                <td>{parsedData.Sector}</td>
              </tr>
            ))
            ):(
              filteredArr.map(((parsedData, index) => (
                <tr key={index}>
                  <td onClick={()=>details(parsedData)}>{parsedData.Symbol}</td>
                  <td>{parsedData.Name}</td>
                  <td>{parsedData.Sector}</td>
                </tr>)
            )))

}
        </tbody>
      </table>
    </div>
  );
}

export default Symbols