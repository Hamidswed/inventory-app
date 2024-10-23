import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import Products from "./Products";
import { ProductItem } from "./ProductItem";

function ProductList({ resultProducts, categories, setProducts }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    setProductList(savedProducts);
  }, [resultProducts]);

  const deleteHandler = () => {
    const filteredProducts = productList.filter(
      (product) => product.id !== parseInt(projectToDelete.id)
    );
    setProducts(filteredProducts);
    setIsOpenDelete(false);
    toast.success(`${projectToDelete.title} has been deleted successfully!`);
    setProjectToDelete(null);
  };

  const editHandler = (productId) => {
    setIsOpenModal(true);
    const productToEdit = resultProducts.find(
      (product) => product.id === parseInt(productId)
    );
    setProjectToEdit(productToEdit);
  };

  if (resultProducts.length === 0)
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
      <div className="flex flex-col gap-4 bg-secondary-0 shadow-lg p-4 rounded-xl min-w-[400px]">
        {resultProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              categories={categories}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              setIsOpenDelete={setIsOpenDelete}
              setProjectToDelete={setProjectToDelete}
            />
          );
        })}
      </div>
      <Modal
        title={`Edit - ${projectToEdit?.title}`}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Products
          categories={categories}
          setProducts={setProducts}
          products={resultProducts}
          projectToEdit={projectToEdit}
          onClose={() => setIsOpenModal(false)}
        />
      </Modal>
      <Modal
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        title={`Delete - ${projectToDelete?.title}`}
      >
        <div>
          <h2 className="font-bold text-secondary-700">
            <span>Do you want to delete&nbsp;</span>
            <span className="text-red-500">{projectToDelete?.title}</span>?
          </h2>
          <div className="flex items-center justify-center gap-x-4 mt-4">
            <button
              className="btn btn--primary w-full"
              onClick={() => setIsOpenDelete(false)}
            >
              No
            </button>
            <button
              className="btn btn--secondary w-full"
              onClick={deleteHandler}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProductList;
