import React from "react";
import AllUser from "../../ShredComponents/AllUser/AllUser";
import Sidebar from "../../ShredComponents/Sidebar/Sidebar";
import SinglePost from "../../ShredComponents/SinglePost/SinglePost";
import CreatePost from "../../ShredComponents/CreatePost/CreatePost";

const Home = () => {
  return (
    <div className="flex relative">
      {/* main app left sidebar */}
      <div className=" h-full p-3 sticky top-[73px]">
        <Sidebar />
      </div>
      {/* Home component  */}
      <div className="w-full max-w-[40rem]">
        <CreatePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
      </div>

      {/* main app right sidebar */}
      <div className=" min-h-screen p-3 sticky top-[73px]">
        <AllUser />
      </div>
    </div>
  );
};

export default Home;