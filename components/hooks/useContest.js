import { useEffect, useState } from "react";
import { GET_CONTESTES } from "../../api";

const useContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(GET_CONTESTES);
      const result = await data.json();
      setContests(result.contests);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [contests, loading];
};
export default useContest;
