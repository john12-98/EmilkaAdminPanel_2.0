import * as React from "react";

import Axios from "axios";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
let size = [];
const ViewItem = (props) => {
  const [message, setMessage] = React.useState("");
  const [itemData, setItemData] = React.useState();
  const [designer, setDesigner] = React.useState();
  const [price, setPrice] = React.useState();
  const [gender, setGender] = React.useState();
  const [description, setDescription] = React.useState();
  const [sizeAr, setSizeAr] = React.useState([" "]);

  const handleCheck = (e) => {
    if (e.target.checked) {
      size.push(e.target.value);
      size.sort();
      console.log("nmnmnm", size.length);
      setSizeAr([...size]);
      console.log(size);
    } else {
      let result = size.filter((ss) => {
        return ss !== e.target.value;
      });
      size = [...result];
      console.log(size);
      setSizeAr([...size]);
    }
    console.log(size);
  };
  const handleUpdate = () => {
    console.log({
      desc: description,
      garName: designer,
      gen: gender,
      p: price,
      s: sizeAr,
    });
    setMessage("");
    Axios.put(`http://localhost:3001/getallproducts/update`, {
      ID: props.match.params.id,
      desc: description,
      garName: designer,
      gen: gender,
      p: price,
      s: sizeAr,
    })
      .then((response) => {
        console.log("lebaw:", response);
        setMessage(response.statusText);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    Axios.get(
      `http://localhost:3001/getallproducts/item?id=${props.match.params.id}`
    )
      .then((response) => {
        console.log("ypyp", response.data);
        setItemData(response.data);
        setDescription(response.data.description);
        setGender(response.data.gender);
        setPrice(response.data.price);
        setDesigner(response.data.garmentName);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Stack>
          <label>{message}</label>
          Designer/Design Name:
          <input
            type={"text"}
            style={{ marginBottom: 5 }}
            defaultValue={itemData?.garmentName}
            onChange={(e) => {
              setDesigner(e.target.value);
            }}
          />
          Gender:
          <select
            style={{ marginBottom: 5 }}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value={"men"}>Men</option>
            <option value={"women"}>Women</option>
          </select>
          Size:
          <label>
            {" "}
            S:
            <input type={"checkbox"} value={"S"} onChange={handleCheck} />
          </label>
          <label>
            {" "}
            M: <input type={"checkbox"} value={"M"} onChange={handleCheck} />
          </label>
          <label>
            {" "}
            L: <input type={"checkbox"} value={"L"} onChange={handleCheck} />
          </label>
          <label>
            {" "}
            XL: <input type={"checkbox"} value={"XL"} onChange={handleCheck} />
          </label>
          <label>
            {" "}
            XXL:{" "}
            <input type={"checkbox"} value={"XXL"} onChange={handleCheck} />
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            defaultValue={itemData?.description}
            placeholder="Description"
            style={{ width: 400, height: 400 }}
          />
          Price:{" "}
          <input
            type={"number"}
            defaultValue={itemData?.price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <button style={{ width: 70 }} onClick={handleUpdate}>
            Update
          </button>
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default ViewItem;
