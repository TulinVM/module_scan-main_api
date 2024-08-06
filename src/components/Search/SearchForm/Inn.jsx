function validateInn(inn, error) {
  if (typeof inn === "number") {
    inn = inn.toString();
  } else if (typeof inn !== "string") {
    inn = "";
  }

  if (!inn) {
    error.code = 1;
    error.message = "ИНН пуст";
    return false;
  }

  if (!/^\d+$/.test(inn)) {
    error.code = 2;
    error.message = "ИНН может состоять только из цифр";
    return false;
  }

  if (![10, 12].includes(inn.length)) {
    error.code = 3;
    error.message = "ИНН может состоять только из 10 или 12 цифр";
    return false;
  }

  const checkDigit = (coefficients) =>
    (coefficients.reduce(
      (sum, coefficient, index) => sum + coefficient * inn[index],
      0
    ) %
      11) %
    10;

  if (inn.length === 10) {
    if (checkDigit([2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(inn[9], 10)) {
      return true;
    }
  } else if (inn.length === 12) {
    if (
      checkDigit([7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(inn[10], 10) &&
      checkDigit([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(inn[11], 10)
    ) {
      return true;
    }
  }

  error.code = 4;
  error.message = "Неправильное контрольное число";
  return false;
}

export default validateInn;
