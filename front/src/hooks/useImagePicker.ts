import ImageCropPicker from 'react-native-image-crop-picker';
import {getFormDataImages} from '@/utils';
import useMutateImages from '@/hooks/queries/useMutateImages.ts';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImage: ImageUri[];
}

function useImagePicker({initialImage = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImage);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 갯수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }

    setImageUris((prev) => [
      ...prev,
      ...uris.map((uri) => ({
        uri,
      })),
    ]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter((image) => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removeImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removeImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then((images) => {
        const formData = getFormDataImages(images);
        uploadImages.mutate(formData, {
          onSuccess: (data) => addImageUris(data),
        });
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 사용자가 취소한 경우가 아닐때만 에러 메세지 표시
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
}

export default useImagePicker;
