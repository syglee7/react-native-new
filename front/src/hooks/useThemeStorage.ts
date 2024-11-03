import useThemeStore from '@/store/useThemeStore.ts';
import {ThemeMode} from '@/types';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

function useThemeStorage() {
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: ThemeMode) => {
    // asyncStorage 를 사용해도 됨
    await setEncryptStorage('themeMode', mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    // asyncStorage 를 사용해도 됨
    await setEncryptStorage('themeSystem', flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getEncryptStorage('themeMode')) ?? 'light';
      const systemMode = (await getEncryptStorage('themeSystem')) ?? 'false';
      const newMode = systemMode ? systemTheme : mode;
      setTheme(newMode);
      setSystemTheme(systemMode);
    })();
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;
