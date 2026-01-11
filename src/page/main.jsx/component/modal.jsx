import React, { useEffect, useState } from "react";
import "../modal.css";
import CloseIcon from "@mui/icons-material/Close";

const VideoModal = ({ video }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle("active-modal", open);
    return () => document.body.classList.remove("active-modal");
  }, [open]);

  return (
    <>
      <div onClick={toggleModal} className="btn-modal">
        <img src={video.thumbnail} alt={video.title} />
      </div>

      {open && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal} />

          <div className="modal-content">
            <h2 className="videoName">{video.title}</h2>

            <iframe
              className="videos"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            <button className="close-modal" onClick={toggleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
