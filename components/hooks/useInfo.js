import axios from "axios";
import { useEffect, useState } from "react";
import { GET_COMMON_INFO } from "../../api";

const useInfo = () => {
  // Fetching Info Data
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfoData = async () => {
      setLoading(true);
      const { data } = await axios.get(GET_COMMON_INFO);
      setInfo(data?.attributes ? data?.attributes : {});
    };
    fetchInfoData();
    setLoading(false);
  }, []);

  return [info, loading];
};

export default useInfo;
