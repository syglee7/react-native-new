import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';
import {deletePost} from '@/api';
import queryClient from '@/api/queryClient.ts';
import {queryKeys} from '@/constants';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   existingMarkers => {
      //     return existingMarkers?.filter(marker => marker.id !== deleteId);
      //   },
      // );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
