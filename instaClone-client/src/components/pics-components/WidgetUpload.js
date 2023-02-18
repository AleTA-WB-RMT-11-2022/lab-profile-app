import { useEffect, useRef } from "react";

function WidgetUpload({ setItem }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  // const cloudName = `${process.env.CLOUD_NAME}`;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "daualsgyz", // replace with your own cloud name
        uploadPreset: "zcul2hdv",
      },
      function (error, result) {
        if (result.event === "success") {
          //setPic(result.info.url)
          setItem((values) => ({...values, pic: result.info.url}))
        }
      }
    );
  }, []);

  const openWidget = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  return (
    <button className="btn btn-light" onClick={(e) => openWidget(e)}>
      Upload an image
    </button>
  );
}

export default WidgetUpload;
