const concatAll = aoaoa => {
  const aoas = [];
  aoaoa.forEach(subArray => {
    subArray.forEach(subArrayValue => {
      aoas.push(subArrayValue);
    });
  });
  return aoas;
};

export { concatAll };
