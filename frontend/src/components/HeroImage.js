import React, { useState, useEffect } from 'react';

function HeroImage(props) {
    console.log(props);
  const [imageSrc, setImageSrc] = useState("");
  

  useEffect(() => {
    if (props.newestPost.publicUrl !== null) {
    //   const blob = new Blob([props.newestPost.file.data], { type: 'image/jpeg' });
    //   setImageSrc(URL.createObjectURL(blob));
    // const imageSrc = URL.createObjectURL(props.newestPost.file.data);
    // test image url
    setImageSrc(props.newestPost.publicUrl);
    }
  }, [props.newestPost]);

  return (
    <div className="image-container">
        <img className="img-fluid" src={imageSrc} alt="hero-image" />
        {/* <img src={`data:image/jpeg;base64,${props.newestPost.file.data}`} /> */}
    </div>
  );
}

export default HeroImage;