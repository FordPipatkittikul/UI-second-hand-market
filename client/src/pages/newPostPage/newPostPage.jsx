/* 
   TODO: Page is not responsive
*/

import "./newPostPage.scss";

import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {

  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {

    event.preventDefault();
    setError("");
    
    const formData = new FormData(event.target);
    const inputs = Object.fromEntries(formData);

    // console.log(inputs);
    try{
        const res = await apiRequest.post("/posts",{
            postData:{
                title: inputs.title,
                price: parseInt(inputs.price),
                images: images,
            },
            postDetail:{
                desc: inputs.desc
            }
        })
        navigate("/"+res.data.id)
    }catch(err){
        console.log(err)
        setError(err);
    }

  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input min={0} id="price" name="price" type="number" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <input id="desc" name="desc" type="text" />
            </div>
            <div className="low">
                <button className="sendButton">Add</button>
            </div>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image,index) =>(
            <img src={image} key={index} alt=""/>
        ))}
        <UploadWidget uwConfig={{
            multiple: true,
            cloudName: "dstbnty76",
            uploadPreset: "ui-market",
            folder: "posts"
        }}
        setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;