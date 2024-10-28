import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '@/constants';
import {getMakers} from '@/api';
import {Marker, UseQueryCustomOptions} from '@/types';

function useGetMarkets(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMakers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkets;
