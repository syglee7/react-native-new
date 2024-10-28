import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from '@/components/common/HeaderButton.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
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

const styles = StyleSheet.create({});

export default FeedHomeHeaderLeft;
