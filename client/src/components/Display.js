import { useState } from "react";
import "./Display.css";

 
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    console.log(Otheraddress)
    try {
      console.log("I am in try")
      if (Otheraddress) {
        console.log("I am in if 1")
        dataArray = await contract.display(Otheraddress);
        console.log("I am in if 2")
        console.log(dataArray);
      } else {
        console.log("I am in else")
        dataArray = await contract.display(account);
      }
    } catch (e) {
      console.log("I am in catch")
      alert("You don't have access");
    }
    console.log("before isEmpty")
    console.log(Object.keys(dataArray).length)
    const isEmpty = Object.keys(dataArray).length === 0;
    console.log(isEmpty)

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        // console.log(`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`)
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
