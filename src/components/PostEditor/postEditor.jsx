"use client";

// Components
import Editor from "@components/Editor";

// Styles
import styles from "./postEditor.module.scss";

import { useState } from "react";

const PostEditor = ({
  onSubmit,
  id = null,
  title = "",
  body = "",
  img = "",
}) => {
  const [width, setWidth] = useState(title.length ?? 16);
  const [base64img, setBase64Img] = useState(img);

  const changeHandler = (evt) => {
    setWidth(evt.target.value.length);
  };

  const reduce_image_file_size = async (
    base64Str,
    MAX_WIDTH = 1200,
    MAX_HEIGHT = 1200,
  ) =>
    await new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });

  const image_to_base64 = async (file) =>
    await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.onerror = (error) => {
        console.log(error);
        alert("An Error occurred please try again, File might be corrupt");
      };
      fileReader.readAsDataURL(file);
    });

  const process_image = async (file, min_image_size = 768) => {
    const res = await image_to_base64(file);

    const old_size = calc_image_size(res);
    if (old_size > min_image_size) {
      const resized = await reduce_image_file_size(res);
      const new_size = calc_image_size(resized);
      console.log("new_size=> ", new_size, "KB");
      console.log("old_size=> ", old_size, "KB");
      setBase64Img(resized);
    } else {
      console.log("image already small enough");
      setBase64Img(res);
    }
  };

  const calc_image_size = (image) => {
    let y = 1;
    if (image.endsWith("==")) {
      y = 2;
    }
    const x_size = image.length * (3 / 4) - y;
    return Math.round(x_size / 1024);
  };

  return (
    <div className={styles.new_post}>
      <form onSubmit={(e) => onSubmit(e, id, base64img)}>
        <input
          required={true}
          placeholder="New post title"
          className={styles.new_post__title}
          onChange={changeHandler}
          style={{ width: width + "ch" }}
          defaultValue={title}
        />
        <button type={"submit"}>Post</button>
      </form>
      <input
        style={{ display: "none" }}
        id="img"
        type="file"
        accept="image/*"
        multiple={false}
        onChange={(e) => process_image(e.target.files[0])}
      />
      <div
        className={styles.img_preview}
        style={{
          backgroundImage:
            base64img.length > 0
              ? `url(${base64img})`
              : img.length > 0 && `url(${img})`,
        }}
      >
        <label htmlFor="img">
          Click to upload a new image or change the current one
        </label>
      </div>
      <Editor content={body} />
    </div>
  );
};

export default PostEditor;
