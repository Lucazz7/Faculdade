import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Blocks, UsersType, BlocksTreeId, BlocksLatLong } from '../../Model/blocksModel';
import { AllDateForecast } from '../../Model/forCast';

export const getBlocksTreeIdRequestData = (initialData: BlocksTreeId[], url: string) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (data);
};

export const getBlocksTreeIdLatLongRequestData = (initialData: BlocksLatLong[], url: string) => {
  const [data, setData] = useState(initialData);


  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const dataBoulds = useMemo(() => {
    return data.map(item => item.bounds);
  }, [data]);

  return (dataBoulds);
};

export const getAllBlocks = (initialData: AllDateForecast[], url: string) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (data);
};

export const getUsersRequestData = (initialData: UsersType[], url: string) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (data);
};


