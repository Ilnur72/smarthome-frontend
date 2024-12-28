import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';


export const useAxios = ({ url = null, body = null, method = null }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState({});

  const [trigger, setTrigger] = React.useState(0);

  function refetch() {
    setTrigger(Date.now());
  }

  const fetChData = async () => {
    try {
      let { data } = await axios({ method, body, url });
      setData(data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("login");
      }
      if (error.response?.status === 401) navigate("/login");
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (url && method) {
      fetChData();
    }
  }, [url, body, method, trigger]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
