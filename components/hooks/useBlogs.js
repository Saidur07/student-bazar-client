import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_ORDERS } from "../../api";

const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(GET_ALL_ORDERS);
      setBlogs(data);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [blogs, loading];
};

export default useBlogs;
