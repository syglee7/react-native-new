import React from 'react';
import HeaderButton from '@/components/common/HeaderButton.tsx';

function EditCategoryHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="저장" onPress={onSubmit} />;
}

export default EditCategoryHeaderRight;
