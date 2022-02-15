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
import Axios from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
let size = [];
let image = {};
let garmentName = "";

let description = "";
let price = 0;
export default function NewProduct() {
  const [downloadURL, setDownloadURL] = React.useState("");
  //const [image, setImage] = React.useState(null);

  const [gender, setGender] = React.useState(" ");
  const [sizeState, setSizeState] = React.useState([]);

  const handleUpload = () => {
    console.log("inside upload");

    //v9
    const storage = getStorage(app);
    const storageRef = ref(storage, `tests123/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            setDownloadURL(downloadURL);
            // let p = await updateProfilePic(downloadURL);
            // console.log("sertual abate", p);
          } catch (e) {
            console.log("ere aza new", e);
          }
        });
      }
    );
  };
  const handleImageChange = (e) => {
    console.log("inside change");
    if (e.target.files[0]) {
      //setImage(e.target.files[0]);
      image = e.target.files[0];
      handleUpload();
      //console.log("bnbnbnbnbn", e.target.files[0]);
    }
  };

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
  const postProduct = () => {
    console.log({
      gender,
      garmentName,
      size: sizeState,
      imgUrl: downloadURL,
      description,
      price,
    });
    Axios.post("http://localhost:3001/getallproducts/post", {
      gender,
      garmentName,
      size: sizeState,
      imgUrl: downloadURL,
      description,
      price,
    });
  };
  return (
    <Container maxWidth="sm">
      <FormControl>
        <input id="img" type={"file"} hidden onChange={handleImageChange} />
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 400, height: 400 }}
          variant="square"
          src={downloadURL}
        >
          <InsertPhotoIcon
            onClick={() => {
              document.getElementById("img").click();
            }}
          />
        </Avatar>
        <TextField
          id="outlined-basic"
          label="Designer/Design Name"
          variant="outlined"
          onChange={(e) => {
            garmentName = e.target.value;
          }}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type={"number"}
          onChange={(e) => {
            price = e.target.value;
          }}
        />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          style={{ width: 200 }}
          defaultValue="x"
          onChange={(e) => {
            description = e.target.value;
          }}
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
        <Button variant="contained" onClick={postProduct}>
          test
        </Button>
      </FormControl>
    </Container>
  );
}
