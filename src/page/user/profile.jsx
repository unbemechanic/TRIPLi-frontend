import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import SignOut from "../../components/user/signOut";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePers] = useState(0);
  const [errorUploadImg, setErrorUploadImg] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app); // we call app from firebase to identify which storage to call
    const fileName = new Date().getTime() + file.name; // adding date to file name prevents double submission of same file name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file); // to monitor proccess of uploading a file
    //actual function to see progress bar
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePers(Math.round(progress));
      },
      (error) => {
        setErrorUploadImg(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      },
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(
        `https://tripli-backend.onrender.com/api/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data.user));
      // navigate('/')
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <ProfileContainer className="p-3 max-w-lg mx-auto">
      <h1>Profile</h1>
      {currentUser ? (
        <>
          <ProfileForm onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              hidden
              onChange={(e) => setFile(e.target.files[0])}
              id="avatar"
              name="avatar"
            />
            <ProfileImg
              onClick={() => fileRef.current.click()}
              src={formData?.avatar || currentUser.avatar}
              alt="profile"
            />
            <p>
              {errorUploadImg ? (
                <span className="text-red-700 ">
                  Error Image upload (size should be less than 2mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span
                  style={{ color: "#031e40" }}
                >{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span style={{ color: "#0dbf16", fontWeight: "600" }}>
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser.name}
              id="name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="email"
              defaultValue={currentUser.email}
              id="email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Update</button>
          </ProfileForm>
        </>
      ) : null}
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span>Delete account</span>
        <span onClick={SignOut}>Sign Out</span>
      </div>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  max-width: 500px;
  margin-inline: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: #374151; /* bg-slate-700 */
    color: white; /* text-white */
    border-radius: 0.375rem; /* rounded */
    padding: 0.75rem; /* p-3 */
    text-transform: uppercase;
    width: 100%;
    border: none;
    cursor: pointer;
  }
  span {
    color: red;
    cursor: pointer;
  }
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;
`;
const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
`;
