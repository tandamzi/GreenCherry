// 적절한 필드가 모두 채워졌는지 확인하는 함수
export const allFieldsFilled = object => {
  return Object.values(object).every(
    value => value !== null && value !== 0 && value !== '',
  );
};
