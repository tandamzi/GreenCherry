export const sortAndGroupDataByDate = data => {
  const groupedData = data.reduce((acc, curr) => {
    const date = curr.orderDate.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  return groupedData;
};
