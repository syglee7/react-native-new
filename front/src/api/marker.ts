import axiosInstance from '@/api/axios.ts';
import {Marker} from '@/types';

const getMakers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');
  return data;
};

export {getMakers};
