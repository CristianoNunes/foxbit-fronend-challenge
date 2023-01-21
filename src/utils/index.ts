export const verifyPolarity = (value: number) => {
  if (!value) return;
  const convertedValue = value.toString();
  if (convertedValue.charAt(0) === '-') {
    return false;
  }
  return true;
};

export const changePointToComma = (value: number) => {
  if (!value) return;
  const newValue = Math.abs(value);
  return newValue.toFixed(2).replace('.', ',');
};

export const formatValueFourDecimals = (value: number) => {
  if (!value) return;
  return value.toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

export const formatValueTwoDecimals = (value: number) => {
  if (!value) return;
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};
