import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from '@/components/common/HeaderButton.tsx';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

const styles = StyleSheet.create({});

export default CalendarHomeHeaderRight;
