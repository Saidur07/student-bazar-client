import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GET_ALL_AUTHORS } from "../../api";

const useAuthors = () => {
  async function fetchAuthorData() {
    const { data } = await axios.get(GET_ALL_AUTHORS);
    if (data?.authors === undefined) {
      return [];
    } else {
      return data?.authors ? data?.authors : [];
    }
  }

  const {
    isLoading: loading,
    data: authors,
    refetch: fetchAuthors,
  } = useQuery(["allAuthors"], () => fetchAuthorData());

  return [authors, loading];
};
export default useAuthors;
