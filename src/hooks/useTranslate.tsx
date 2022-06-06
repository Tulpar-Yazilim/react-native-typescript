import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const useTranslate = (text = '', params = {}) => {
  const {t, i18n} = useTranslation();
  return useMemo(() => {
    return i18n?.exists(text) ? t(text, params) : false;
  }, [text, params]);
};

export default useTranslate;
