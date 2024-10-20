import { CiEdit, CiTrash } from "react-icons/ci";

function ProductList({ products, categories, setProducts }) {
  const deleteHandler = (productId) => {
    const filteredProducts = products.filter(
      (product) => product.id !== parseInt(productId)
    );
    setProducts(filteredProducts);
  };
  if (products.length === 0)
    return (
      <div className="text-secondary-700 mx-auto text-lg">
        There is no product!
      </div>
    );
  return (
    <div className="w-full">
      <h2 className="text-xl text-secondary-700 font bold mb-2">
        Product List
      </h2>
      <div className="flex flex-col gap-4 bg-secondary-0 shadow-lg p-4 rounded-xl overflow-x-auto w-full">
        {products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              categories={categories}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;

export const ProductItem = ({ product, categories, deleteHandler }) => {
  const foundedCategory = categories.find(
    (category) => category.id === parseInt(product.categoryId)
  );

  return (
    <div className="flex items-center justify-between gap-x-2">
      <span className="text-secondary-500 flex-1">{product.title}</span>
      <div className="flex-1 flex items-center justify-between gap-x-4">
        {/* date */}
        <span className="text-secondary-400 text-sm lg:text-base">
          {new Date(product.createdAt).toLocaleDateString("en")}
        </span>
        {/* category */}
        <span className="block px-3 py-0.5 border border-secondary-500 rounded-2xl text-secondary-500 text-sm">
          {foundedCategory.title}
        </span>
        {/* quantity */}
        <span
          className="flex items-center p-1 justify-center w-7 h-7 rounded-full bg-secondary-400 text-white border-2 
      border-slate-300 text-sm"
        >
          {product.quantity}
        </span>
        {/* button */}
        <div className="flex items-center justify-between gap-x-2 lg:gap-x-4">
          <button className="text-primary-900">
            <CiEdit size={25} />
          </button>
          <button
            className="text-red-500"
            onClick={() => deleteHandler(product.id)}
          >
            <CiTrash size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
