import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AdminDashboardPage = () => {
  const [video, setVideo] = useState([{"Loading"}]);
  const [error, setError] = useState(true);


  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await fetch("https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE", {
          method: "POST",
          Header: {
            "x-project": "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
            Bearer: `<${localStorage.getItem("token")}>`,
            body: {
                "payload": {},
                "page": 1,
                "limit": 10
            }
          }
        });
        const data = await res.json();
        if(res.error)
          setError(true)
        else
          setVideo(data);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        {
          error || video.map((item)=>{
            <>
              <div>{item.username}</div>
              <div>{item.title}</div>
              <div><img src={item.photo} alt="any"/>"</div>
              <div>{item.like}</div>
            </>
          })
        }
      </div>
    </>
  );
};

export default AdminDashboardPage;
