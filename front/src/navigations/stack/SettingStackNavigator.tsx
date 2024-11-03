import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, settingNavigations} from '@/constants';
import EditProfileScreen from '@/screens/setting/EditProfileScreen.tsx';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen.tsx';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft.tsx';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
export default SettingStackNavigator;
