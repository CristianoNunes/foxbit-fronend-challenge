/* eslint-disable prefer-const */
export const verifyPolarity = (value: number) => {
  if (!value) return 1;
  const convertedValue = value.toString();
  if (convertedValue.charAt(0) === '-') {
    return 2;
  }
  return 3;
};

export const changePointToComma = (value: number) => {
  if (!value) return '0,00';
  const newValue = Math.abs(value);
  return newValue.toFixed(2).replace('.', ',');
};

export const formatValueFourDecimals = (value: number) => {
  if (!value) return '0,00';
  const numberToString = value.toString();
  let integerPart = numberToString.split('.')[0];
  let decimalPart = numberToString.split('.')[1];
  let newIntegerPart = '';
  if (!decimalPart) decimalPart = '0000';
  let digitsBeforeComma = integerPart.length;
  for (let i = 0; i < digitsBeforeComma; i++) {
    if ((i + 1) % 3 === 0 && i !== digitsBeforeComma - 1) {
      newIntegerPart =
        '.' + integerPart[digitsBeforeComma - i - 1] + newIntegerPart;
    } else {
      newIntegerPart = integerPart[digitsBeforeComma - i - 1] + newIntegerPart;
    }
  }
  return newIntegerPart + ',' + decimalPart;
};
export const formatValueTwoDecimals = (value: number) => {
  if (!value) return;
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};
