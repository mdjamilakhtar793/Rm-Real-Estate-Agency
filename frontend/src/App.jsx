/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Blogs,
  CreateListing,
  Home,
  PageLists,
  Profile,
  Search,
  Signin,
  Signout,
  Signup,
  UpdateLists,
} from "./Layouts/index";
import Header from "./Components/Header";
import PrivateRoutes from "./Components/PrivateRoutes";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blogs" element={<Blogs />} />

        <Route path="/listing/:listId" element={<PageLists />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/updatelisting/:listsId" element={<UpdateLists />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
