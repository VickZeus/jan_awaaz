"use client"
import React, { useState } from "react";
import style from "@/styles/reportpage.module.css"
import Image from "next/image"


export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);


  return(
    <div className={style.upload}>
      <input type="file" accept="image/*" onChange={handleChange}/>
      {preview && (
        <Image src={preview} alt="preview" width={80} height={80} style={{marginTop: "5px" }}/>
      )}
    </div>
  );
}
}