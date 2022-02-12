import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import { deepOrange, green } from "@mui/material/colors";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Container from "@mui/material/Container";
let size = [];
export default function NewProduct() {
  const [gender, setGender] = React.useState(" ");
  const [sizeState, setSizeState] = React.useState([]);
  const handleCheck = (e) => {
    if (e.target.checked) {
      size.push(e.target.value);
      size.sort();
      console.log("nmnmnm", size.length);
      setSizeState([...size]);
      console.log(size);
    } else {
      let result = size.filter((ss) => {
        return ss !== e.target.value;
      });
      size = [...result];
      console.log(size);
      setSizeState([...size]);
    }
    console.log(size);
  };
  return (
    <Container maxWidth="sm">
      <FormControl>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 400, height: 400 }}
          variant="square"
        >
          <InsertPhotoIcon />
        </Avatar>
        <TextField
          id="outlined-basic"
          label="Designer/Design Name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type={"number"}
        />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          style={{ width: 200 }}
          defaultValue="x"
        />
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <label>{gender}</label>
          <FormControlLabel value="women" control={<Radio />} label="Female" />
          <FormControlLabel value="men" control={<Radio />} label="Male" />
        </RadioGroup>
        <label>{sizeState.toString()}</label>
        <FormControlLabel
          control={<Checkbox value={"S"} onChange={handleCheck} />}
          label="S"
        />
        <FormControlLabel
          control={<Checkbox value={"M"} onChange={handleCheck} />}
          label="M"
        />
        <FormControlLabel
          control={<Checkbox value={"L"} onChange={handleCheck} />}
          label="L"
        />
        <FormControlLabel
          control={<Checkbox value={"XL"} onChange={handleCheck} />}
          label="XL"
        />
        <FormControlLabel
          control={<Checkbox value={"XXL"} onChange={handleCheck} />}
          label="XXL"
        />
      </FormControl>
    </Container>
  );
}
