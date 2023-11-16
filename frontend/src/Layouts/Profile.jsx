/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  signoutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filepre, setFilePrec] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListError, setShowListError] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (file) {
      fileHandleUpload(file);
    }
  }, [file]);
  const fileHandleUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/authentics/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // firebase storage
  // allow read;
  //     allow write:if request.resource.size<2*1024*1024 && request.resource.contentType.matches('image/.*')
  const handleShowList = async () => {
    try {
      setShowListError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListError(true);
        return;
      }
      setUserList(data);
    } catch (error) {
      setShowListError(true);
    }
  };

  const handleDeleteList = async (listsId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listsId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserList((prev) => {
        prev.filter((lists) => lists._id !== listsId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandle}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center "
        />
        <p className="text-sm self-center">
          {fileError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filepre > 0 && filepre < 100 ? (
            <span className="text-slate-700">{`Uploading ${filepre}%`}</span>
          ) : filepre === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          defaultValue=""
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg py-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Update"}
        </button>
        <Link
          to="/createlisting"
          className="bg-green-800 text-white p-3 rounded-lg uppercase text-center hover:opacity-100"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign-Out
        </span>
      </div>
      <p className="text-red-600">{error ? error : ""}</p>
      <p className="text-green-800 text-center">
        {updateSuccess ? "User Updated Successsfully" : ""}
      </p>
      <button onClick={handleShowList} className="text-green-700 w-full">
        Show List
      </button>
      <p>{showListError ? "Error showing Listings.." : ""}</p>
      {userList && userList.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-5 text-2xl font-semibold ">
            Your List
          </h1>
          {userList.map((lists) => (
            <div
              key={lists}
              className="border rounded-lg p-3 flex justify-between items-center gap-3"
            >
              <Link to={`/listing/${lists._id}`}>
                <img
                  src={lists.imageUrl[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                to={`/listing/${lists._id}`}
                className="text-slate-800 font-semibold flex-1 hover:underline truncate"
              >
                <p>{lists.name}</p>
              </Link>
              <div className="flex flex-col item">
                <button
                  className="text-red-800 uppercase"
                  onClick={() => handleDeleteList(lists._id)}
                >
                  Delete
                </button>
                <Link to={`/updatelisting/${lists._id}`}>
                  <button className="text-green-800 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
