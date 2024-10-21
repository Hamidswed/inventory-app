import { CiEdit, CiTrash } from "react-icons/ci";

export const ProductItem = ({
  product,
  categories,
  editHandler,
  setIsOpenDelete,
  setProjectToDelete,
}) => {
  const foundedCategory = categories.find(
    (category) => category.id === parseInt(product.categoryId)
  );
  const openDeleteHandler = () => {
    setIsOpenDelete(true);
    setProjectToDelete(product);
  };

  return (
    <div className="flex items-center justify-between gap-x-2">
      <span className="text-secondary-500 lg:flex-1">{product.title}</span>
      <div className="flex items-center justify-between gap-x-4 lg:flex-1">
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
          <button
            className="text-primary-900"
            onClick={() => editHandler(product.id)}
          >
            <CiEdit size={25} />
          </button>
          <button className="text-red-500" onClick={openDeleteHandler}>
            <CiTrash size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
