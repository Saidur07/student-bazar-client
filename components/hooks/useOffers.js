import axios from "axios";
import { useEffect, useState } from "react";
import { GET_OFFERS } from "../../api";

const useOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get(GET_OFFERS);
      setOffers(data?.offers);
      setLoading(false);
    }
    fetchData();
  }, []);

  return [offers, loading];
};
export default useOffers;
