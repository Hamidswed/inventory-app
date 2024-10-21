export const filteredSearchTitle = (array, value) => {
  return array.filter((item) => item.title.toLowerCase().includes(value));
};

export const sortDate = (array, value) => {
  let sortedProducts = [...array];
  return sortedProducts.sort((a, b) => {
    if (value === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (value === "earliest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
};

export const sortCategory = (array, value) => {
  let sortedProducts = [...array];
  if (!value) return sortedProducts;
  return sortedProducts.filter((item) => item.categoryId == value);
};
