import { useState,useEffect } from "react";

const useFetch = (url) => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  async function getData(url) {
      try {
        setLoading(true)
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null)
      }
      catch (error)
      {
         setLoading(false)
         setError(error.message || "unknown error")
      }
      finally
      {
setLoading(false)
      }
    }
  
  useEffect(() => {
    getData(url);
  }, [url]);

  return {data,loading,error}

}

export default useFetch