function FilterComponent({
  sort,
  searchValue,
  sortHandler,
  searchHandler,
  categories,
  categoryId,
  categoryHandler,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      {/* search */}
      <div className="flex-1 flex items-center justify-between gap-x-2">
        <label htmlFor="search-input" className="text-secondary-400">
          Search
        </label>
        <input
          type="text"
          name="search-input"
          id="search-input"
          value={searchValue}
          onChange={searchHandler}
          className="bg-transparent rounded-xl border border-secondary-500 text-secondary-400 w-full"
        />
      </div>

      {/* sort */}
      <div className="flex-1 flex items-center justify-between gap-x-6 sm:gap-x-2">
        <label htmlFor="sort-products" className="text-secondary-400">
          Sort
        </label>
        <select
          name="sort-products"
          id="sort-products"
          value={sort}
          onChange={sortHandler}
          className="bg-transparent text-secondary-500 border border-secondary-500 rounded-xl w-full"
        >
          <option className="bg-secondary-0 text-secondary-700" value="latest">
            latest
          </option>
          <option
            className="bg-secondary-0 text-secondary-700"
            value="earliset"
          >
            earliset
          </option>
        </select>
      </div>

      {/* category */}
      <div className="flex-1 flex items-center justify-between gap-x-6 sm:gap-x-2">
        <label htmlFor="sort-products" className="text-secondary-400">
          Category
        </label>
        <select
          name="categoryId"
          id="product-category"
          onChange={categoryHandler}
          value={categoryId}
          className="bg-transparent rounded-xl border border-secondary-500 text-secondary-700 w-full"
        >
          <option className="bg-secondary-0 text-secondary-700" value="All">
            All
          </option>
          {categories.map((category) => {
            return (
              <option
                key={category.id}
                className="bg-secondary-0 text-secondary-500"
                value={category.id}
              >
                {category.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterComponent;
