/* eslint-disable react-hooks/rules-of-hooks */
import langt from './i18';
import {useSelector} from 'react-redux';

const lang = (langString: string) => {
  const langData = useSelector(state => state.settingReducer.language);
  return langt.t(langString, {locale: langData});
};

export default lang;
