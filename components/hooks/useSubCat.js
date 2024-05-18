import axios from "axios";
import { useEffect, useState } from "react";
import { GET_POPULAR_SUBCATEGORY } from "../../api";

const useSubCat = () => {
  const [subCat, setSubCat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(GET_POPULAR_SUBCATEGORY);
      setSubCat(data?.subcategories);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [subCat, loading];
};

export default useSubCat;
