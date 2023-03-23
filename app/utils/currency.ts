export const formatCurrency = (value: number, toFixed = false, icon = true, currency = 'TRY') => {
  const currencyFormatter = new Intl.NumberFormat('tr-TR', {currency: currency || 'TRY'});
  const _value: string = currencyFormatter.format(value);
  return `${_value}${
    toFixed
      ? ',' +
        Array.from({length: 2})
          .map(() => '0')
          .join('')
      : ''
  } ${icon && 'TL'}`;
};
