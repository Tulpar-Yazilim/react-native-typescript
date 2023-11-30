import {useEffect, useState} from 'react';

export const {format: formatCurrency} = Intl.NumberFormat('tr-TR', {
  currency: 'TRY',
  style: 'currency',
});

export const useCurrencyInput = (initialValue: string | undefined) => {
  const [value, setValue] = useState(initialValue ?? '');

  useEffect(() => {
    handleChange(initialValue + '00');
  }, []);

  const handleChange = (v: string) => {
    const decimal = Number(v.replace(/\D/g, '')) / 100;
    setValue(
      formatCurrency(decimal || 0)
        .split('₺')[1]
        .replace('R$\xa0', ''),
    );
  };
  return [value, handleChange] as [string, (v: string) => void];
};

export const useCreditCardInput = (initialValue = '', onChangeText?: (_cardValue: string) => void) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (v: string) => {
    const cardValue = RegExp(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/).exec(v.replace(/\D/g, ''));
    if (cardValue) {
      const test = !cardValue[2] ? cardValue[1] : `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ''}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
      setValue(test.toString());
      onChangeText?.(test.toString());
    }
  };
  return [value, handleChange] as [string, (v: string) => void];
};
