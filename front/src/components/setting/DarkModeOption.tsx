import React from 'react';
import {useColorScheme, View} from 'react-native';
import {CompoundOption} from '@/components/common/CompoundOption.tsx';
import useThemeStorage from '@/hooks/useThemeStorage.ts';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}
function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps) {
  const systemDefault = useColorScheme();
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressLight}
            isChecked={!isSystem && theme === 'light'}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressDark}
            isChecked={!isSystem && theme === 'dark'}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressSystem}
            isChecked={isSystem}>
            시스템 기본값 모드
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default DarkModeOption;
