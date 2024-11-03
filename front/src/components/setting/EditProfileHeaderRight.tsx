import React from 'react';
import HeaderButton from '@/components/common/HeaderButton.tsx';

function EditProfileHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="완료" onPress={onSubmit} />;
}

export default EditProfileHeaderRight;
