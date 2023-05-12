import React, { useState, useEffect } from 'react';

function HeroImage(props) {
  const [imageSrc, setImageSrc] = useState("");
  

  useEffect(() => {
    if (props.newestPost.publicUrl !== null) {
      setImageSrc(props.newestPost.publicUrl);
    }
  }, [props.newestPost]);

  return (
    <div className="image-container">
        <img className="img-fluid" src={imageSrc} alt="blog-hero" />
    </div>
  );
}

export default HeroImage;