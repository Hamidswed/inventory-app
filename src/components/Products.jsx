import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Products({
  categories,
  setProducts,
  products,
  projectToEdit = {},
  onClose = () => {},
}) {
  const [productForm, setProductForm] = useState({
    title: "",
    quantity: 1,
    categoryId: "",
  });

  const { id: editId } = projectToEdit;
  const isEditSession = Boolean(editId);

  useEffect(() => {
    if (isEditSession) {
      setProductForm({
        title: projectToEdit.title || "",
        quantity: projectToEdit.quantity || 1,
        categoryId: projectToEdit.categoryId || "",
      });
    } else {
      setProductForm({ title: "", quantity: 1, categoryId: "" });
    }
  }, [
    isEditSession,
    projectToEdit.title,
    projectToEdit.quantity,
    projectToEdit.categoryId,
  ]);

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setProductForm({ ...productForm, [name]: value });
  };

  const addNewProductHandler = (e) => {
    e.preventDefault();

    if (isEditSession) {
      const updatedProduct = {
        ...projectToEdit,
        ...productForm,
      };

      setProducts((prevState) =>
        prevState.map((product) =>
          product.id === editId ? updatedProduct : product
        )
      );
      toast.success(`${productForm.title} has been updated successfully!`);
      onClose();
    } else {
      const newProduct = {
        ...productForm,
        createdAt: new Date().toISOString(),
        id: new Date().getTime(),
      };

      const productExists = products.some(
        (product) =>
          product.title.toLowerCase() === productForm.title.toLowerCase()
      );
      if (productExists) {
        toast.error(`${productForm.title} has been already added!`);
        return;
      }

      if (!productForm.title) {
        toast.error("Please add a title for product!");
        return;
      }
      if (!productForm.categoryId) {
        toast.error("Please add a category for product!");
        return;
      }

      setProducts((prevState) => [...prevState, newProduct]);
      toast.success(`${productForm.title} has been added successfully!`);
      setProductForm({ title: "", quantity: 1, categoryId: "" });
    }
  };

  return (
    <div className="w-full flex-1">
      <h2 className="text-xl text-secondary-700 font bold mb-2">
        Add new product
      </h2>
      <form className="form">
        <div>
          <label
            htmlFor="product-title"
            className="block mb-1 text-secondary-700"
          >
            Product title
          </label>
          <input
            type="text"
            placeholder="Add a title ..."
            name="title"
            id="product-title"
            value={productForm.title}
            onChange={changeHandler}
            className="bg-transparent rounded-xl border border-slate-500 text-secondary-700"
          />
        </div>
        <div>
          <label
            htmlFor="product-quantity"
            className="block mb-1 text-secondary-700"
          >
            Quantity
          </label>
          <input
            type="number"
            min="1"
            placeholder="quantity ..."
            name="quantity"
            id="product-quantity"
            value={productForm.quantity}
            onChange={changeHandler}
            className="bg-transparent rounded-xl border border-slate-500 text-secondary-700"
          />
        </div>
        <div>
          <label
            htmlFor="product-category"
            className="block mb-1 text-secondary-700"
          >
            Category
          </label>
          <select
            name="categoryId"
            id="product-category"
            onChange={changeHandler}
            value={productForm.categoryId}
            className="bg-transparent rounded-xl border border-slate-500 text-secondary-700 w-full"
          >
            <option className="bg-secondary-0 text-secondary-700" value="">
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option
                  key={category.id}
                  className="bg-secondary-0 text-secondary-700"
                  value={category.id}
                >
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            id="add-new-product"
            className="btn btn--primary w-full"
            onClick={addNewProductHandler}
          >
            {isEditSession ? "Submit" : "Add new product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Products;
