import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { GET_FAV_DATA, POST_FAV_DATA } from "../../api";

const useFavorite = () => {
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [addLoad, setAddLoad] = useState(false);
  const router = useRouter();
  const [postedData, setPostedData] = useState([]);
  const [fav, setFav] = useState(false);
  const [favItem, setFavItem] = useState([]);
  const [product, setProduct] = useState({});

  /**
   *
   * ADD TO FAVORITE
   *
   */
  const AddToFav = async (id) => {
    if (!token) {
      router.push("/signin");
    }
    setAddLoad(true);
    const fav_data = {
      ProductID: id,
    };
    const { data } = await axios.patch(POST_FAV_DATA, fav_data, {
      headers: {
        Authorization: token,
      },
    });
    setPostedData(data?.favorite_data);

    if (fav === true) {
      toast.success(
        `${product?.ProductTitle} was added to favourites succesfully`
      );
    } else {
      toast.info(`${product?.ProductTitle} was removed from favourites `);
    }
    setAddLoad(false);
  };
  useEffect(() => {
    const object = favItem.find((aa) => aa?.ProductID === product?.ProductID);

    if (object === undefined) {
      setFav(true);
    } else if (object !== undefined) {
      setFav(false);
    }
  }, [favItem, product, fav, postedData]);

  //
  //
  // GET FAVOURITES DATA
  //
  //

  useEffect(() => {
    setAddLoad(true);
    const fetchData = async () => {
      if (token) {
        const { data } = await axios.get(GET_FAV_DATA, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        setFavItem(data?.products);
      }
    };

    fetchData();

    setAddLoad(false);
  }, [product?.ProductID, token, postedData]);

  return [AddToFav, setAddLoad, fav, setProduct];
};

export default useFavorite;
