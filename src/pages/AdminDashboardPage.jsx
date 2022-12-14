import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const AdminDashboardPage = () => {
  const [video, setVideo] = useState(["Loading"]);
  const [error, setError] = useState(true);
  const [page, setPage] = useState(1);



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
                "page": page,
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
  }, [page])

  const previous = ()=>{
    if(page == 1)
      return;
    else
      setPage(page-1);
  }
  const next = ()=>{
    if(page == 10)
      return;
    else
      setPage(page+1);
  }
  const logout = ()=>{
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
  }

  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        <button onClick={previous}>previous 10</button>
        <button onClick={next}>next 10</button>
        {
          error || video.map((item)=>{
            <>
              <div>{item.list[item].username}</div>
              <div>{item.list[item].title}</div>
              <div><img src={item.list[item].photo} alt="any"/>"</div>
              <div>{item.list[item].like}</div>
            </>
          })
        }
        <div><button onClick={logout}>LOGOUT</button></div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
