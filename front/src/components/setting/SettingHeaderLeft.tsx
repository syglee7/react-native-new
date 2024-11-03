import React from 'react';
import {View} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator.tsx';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import HeaderButton from '@/components/common/HeaderButton.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft(navigation: SettingHeaderLeftProps) {
  return (
    <HeaderButton
      icon={
        <Ionicons
          name="menu"
          color={colors.BLACK}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
      }
    />
  );
}

export default SettingHeaderLeft;
