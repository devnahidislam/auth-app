import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const useFetch = (query) => {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData({ isLoading: true });

        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        setData({
          isLoading: false,
          apiData: data,
          status: status === 201 ? status : null,
        });
      } catch (error) {
        setData({ isLoading: false, serverError: error });
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
};

export default useFetch;
