import { useEffect, useState } from "react";
import { GET_PUBLICATIONS } from "../../api";

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetch(GET_PUBLICATIONS);
      const result = await data.json();
      setPublications(result.publications);
      setLoading(false);
    }
    fetchData();
  }, []);

  return [publications, loading];
};
export default usePublications;
