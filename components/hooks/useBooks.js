import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_POPULAR_BOOKS } from "../../api";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(GET_ALL_POPULAR_BOOKS);
      setBooks(data?.products);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [books, loading];
};

export default useBooks;
