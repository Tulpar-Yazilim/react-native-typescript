import {useAppSelector} from './index';

const useThemeMode = () => {
  return useAppSelector(state => state.settings.theme);
};

export default useThemeMode;
