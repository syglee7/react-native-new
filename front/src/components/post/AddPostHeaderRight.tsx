import React from 'react';
import HeaderButton from '@/components/common/HeaderButton.tsx';

function AddPostHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}

export default AddPostHeaderRight;
