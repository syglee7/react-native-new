import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import useSearchLocation from '@/hooks/useSearchLocation.ts';
import useUserLocation from '@/hooks/useUserLocation.ts';
import SearchInput from '@/components/common/SearchInput.tsx';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();
  const {regionInfo} = useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };
  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력하세요."
        onSubmit={() => Keyboard.dismiss()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;