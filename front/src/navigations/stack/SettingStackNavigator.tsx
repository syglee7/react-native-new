import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, settingNavigations} from '@/constants';
import EditProfileScreen from '@/screens/setting/EditProfileScreen.tsx';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen.tsx';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft.tsx';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen.tsx';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen.tsx';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.DELETE_ACCOUNT]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
};
const Stack = createStackNavigator<SettingStackParamList>();
function SettingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 15},
        headerTintColor: 'black',
        cardStyle: {backgroundColor: colors.GRAY_100},
        headerStyle: {backgroundColor: 'white', shadowColor: 'gray'},
      }}>
      <Stack.Screen
        name={settingNavigations.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={({navigation}) => ({
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        })}
      />
      <Stack.Screen
        name={settingNavigations.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={({navigation}) => ({
          headerTitle: '회원탈퇴',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={({navigation}) => ({
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
export default SettingStackNavigator;
