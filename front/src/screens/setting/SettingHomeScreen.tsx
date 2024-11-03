import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import SettingItem from '@/components/setting/SettingItem.tsx';
import {colors, settingNavigations} from '@/constants';
import Octicons from 'react-native-vector-icons/Octicons';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';
import useModal from '@/hooks/useModal.ts';
import DarkModeOption from '@/components/setting/DarkModeOption.tsx';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />
        <View style={styles.space} />
        <SettingItem
          onPress={handlePressLogout}
          title="로그아웃"
          color={colors.RED_500}
          icon={<Octicons name="sign-out" color={colors.RED_500} size={16} />}
        />
        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
