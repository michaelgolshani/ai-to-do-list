import React, { useState,useEffect } from "react";

function HomePage() {
  const [data, setData] = useState({});
  const [response, setResponse] =  useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/tests/hardcode");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        // console.log("data", data[0]);
        setResponse(data["Response"])

        console.log("response", response)
        // setData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = e => {
      e.preventDefault()

  }


  if (!response) {
    return <div>Loading</div>
  }

  return (
    <>
      <div>test</div>
      {response}
      <form className="test-form" onSubmit = {handleSubmit}>
        <label>Message
          <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
        </label>
      </form>

    </>
  );
}

export default HomePage;
