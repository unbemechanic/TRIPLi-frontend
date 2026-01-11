import React from "react";
import VideoModal from "./modal";
import { videos } from "./videoConfig";

const VideoGallery = () => {
  return (
    <>
      <h1 className="main-page-sub-title">Video</h1>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoModal key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default VideoGallery;
