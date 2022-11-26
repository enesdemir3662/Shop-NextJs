import { useEffect, useState } from "react";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function FileImg({ setTextModal, image }) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [imageControl, setImageControl] = useState();
  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Görüntü türü geçerli değil");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageControl(fileDataURL);
          setFileDataURL(result);
          {
            setTextModal((prev) => ({ ...prev, productImg: result }));
          }
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      <div
        className="input-group mb-3 mt-3 ms-5"
        style={{ width: "90%", alignSelf: "center" }}
      >
        <form>
          <input
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
            style={{ paddingTop: "10px" }}
          />
        </form>
        {image != "" && imageControl == undefined ? (
          <p className="img-preview-wrapper">
            {<img src={image} style={{ height: "50px", width: "50px" }} />}
          </p>
        ) : (
          ""
        )}
        <br />
        {fileDataURL ? (
          <p className="img-preview-wrapper">
            {
              <img
                src={fileDataURL}
                alt="preview"
                style={{ height: "50px", width: "50px" }}
              />
            }
          </p>
        ) : null}
      </div>
    </>
  );
}
export default FileImg;
