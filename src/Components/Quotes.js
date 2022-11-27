import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './Style.css'

function Quotes() {
  const [symbol, setSymbol] = useState();
  const [sorting, setSorting] = useState(false);
  const [sortedData, setSortedData] = useState();
  const [value, setValue] = React.useState('asc')

  var navigate = useNavigate();
  const params = useParams();
  const { symbolName } = params;
  
  useEffect(() => {
    async function getData() {
      const response = await fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbolName}`)
        .then((response) => response.json())
        .then((data) => setSymbol(data))


    }
    getData();
    console.log()
  }, []);

  function Arrange(e) {
    setSorting(true);
    setValue(e.target.value);
    // const order = value;

    if (value == "desc") {
      const data = symbol.payload[symbolName].sort((a, b) => (a.time < b.time ? -1 : 1));
      console.log(data);
      setSortedData(data);
    }
    else if (value == "asc"){
      const data = symbol.payload[symbolName].sort((b, a) => (a.time < b.time ? -1 : 1));
      console.log(data);

      setSortedData(data);
    }
  }

  return (
    <div className="Archive">
      <h1>Quotes</h1>
      <label>
       <div className="sortby">SortBy
        <select onChange={(e) => Arrange(e)}>
          <option value="asc">asscending</option>
          <option value="desc">descending</option>

        </select>
        </div>
      </label>
      <table className="ArchiveTable">
        <thead>
          <tr>
            <th>Price</th>
            <th>Time</th>
            <th>Valid_till</th>
          </tr>
        </thead>
        <tbody>
          {!sortedData?
          (symbol &&
            symbol.payload[symbolName].map((parsedData, index) => (
              <tr key={index}>
                <td >{parsedData.price}</td>
                <td>{parsedData.time}</td>
                <td>{parsedData.valid_till}</td>
              </tr>
            )))
            : (sortedData.map((parsedData, index) => (
              <tr key={index}>
                <td >{parsedData.price}</td>
                <td>{parsedData.time}</td>
                <td>{parsedData.valid_till}</td>
              </tr>)
            ))
          }


        </tbody>
      </table>
    </div>
  );
}

export default Quotes;