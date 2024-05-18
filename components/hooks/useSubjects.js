import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_SUBJECTS } from "../../api";

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(GET_ALL_SUBJECTS);
      setSubjects(data?.subjects);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [subjects, loading];
};

export default useSubjects;
