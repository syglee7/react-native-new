import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';

function RootNavigator() {
  const {isLogin} = useAuth();
  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
