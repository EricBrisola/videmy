"use client";

import Image from "next/image";
import { useState } from "react";
type VideoThumbProps = {
  videoId: string;
  altText: string;
};

const placeholderImage = "/thumbnail-placeholder.png";

const VideoThumbnail = ({ videoId, altText }: VideoThumbProps) => {
  const [imageSource, setImageSource] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  const handleImageError = () => {
    if (imageSource.includes("maxresdefault.jpg")) {
      setImageSource(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    } else if (imageSource !== placeholderImage) {
      setImageSource(placeholderImage);
    }
  };
  return (
    <Image
      onError={handleImageError}
      src={imageSource}
      alt={altText}
      sizes="(max-width: 768px) 100vw, 50vw"
      fill
      className="object-cover"
    />
  );
};

export default VideoThumbnail;
