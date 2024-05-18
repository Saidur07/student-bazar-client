import axios from "axios";
import { useEffect, useState } from "react";
import { GET_STATIONARIES } from "../../api";

const useStationeries = () => {
  const [stationeries, setStationeries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(GET_STATIONARIES);
      setStationeries(data?.products);
    }
    fetchData();
    setLoading(false);
  }, []);

  return [stationeries, loading];
};

export default useStationeries;
