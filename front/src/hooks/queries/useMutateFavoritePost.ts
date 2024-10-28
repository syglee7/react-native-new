import {useMutation} from '@tanstack/react-query';
import {updateFavoritePost, updatePost} from '@/api';
import queryClient from '@/api/queryClient.ts';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
