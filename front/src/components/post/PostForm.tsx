import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost.ts';
import useForm from '@/hooks/useForm.ts';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {MarkerColor} from '@/types';
import useModal from '@/hooks/useModal.ts';
import useGetAddress from '@/hooks/useGetAddress.ts';
import useImagePicker from '@/hooks/useImagePicker.ts';
import usePermission from '@/hooks/usePermission.ts';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight.tsx';
import InputField from '@/components/common/InputField.tsx';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton.tsx';
import MarkerSelector from '@/components/post/MarkerSelector.tsx';
import ScoreInput from '@/components/post/ScoreInput.tsx';
import ImageInput from '@/components/post/ImageInput.tsx';
import PreviewImageList from '@/components/common/PreviewImageList.tsx';
import DatePickerOption from '@/components/post/DatePickerOption.tsx';
import {useNavigation} from '@react-navigation/native';
import {LatLng} from 'react-native-maps';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import useDetailPostStore from '@/store/useDetailPostStore.ts';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost.ts';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost?.title : '',
      description: isEditMode ? detailPost?.description : '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost?.score : 5);
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const dateOption = useModal();
  const address = useGetAddress(location);
  const imagePicker = useImagePicker({
    initialImage: isEditMode ? detailPost?.images : [],
  });
  usePermission('PHOTO');

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };

    if (isEditMode) {
      // update
      updatePost.mutate(
        {
          id: detailPost?.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            label={
              isPicked || isEditMode
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
            variant="outlined"
            size="large"
            onPress={dateOption.show}
          />
          <InputField
            placeholder="제목을 입력하세요."
            error={addPost.errors.title}
            touched={addPost?.touched.title}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imageViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption={true}
            />
          </View>
          <DatePickerOption
            isVisible={dateOption.isVisible}
            date={date}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  imageViewer: {
    flexDirection: 'row',
  },
});

export default PostForm;
