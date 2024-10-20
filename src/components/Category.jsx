import React, { useState } from "react";
import toast from "react-hot-toast";

function Category({ setCategories, categories }) {
  const [isShow, setIsShow] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    title: "",
    description: "",
  });

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const addNewCategoryHandler = (e) => {
    e.preventDefault();
    const newCategory = {
      ...categoryForm,
      createdAt: new Date().toISOString(),
      id: new Date().getTime(),
    };

    const categoryExists = categories.some(
      (category) =>
        category.title.toLowerCase() === categoryForm.title.toLowerCase()
    );
    if (categoryExists) {
      toast.error(`${categoryForm.title} has been already added!`);
      return;
    }
    if (categoryForm.title === "") {
      toast.error("Please add a category!");
      return;
    }
    setCategories((prevState) => [...prevState, newCategory]);
    toast.success(`${categoryForm.title} has been added successfully!`);
    setCategoryForm({ title: "", description: "" });
  };

  return (
    <div className="w-full flex-1 h-full">
      <button
        className={`text-xl text-secondary-500 font bold mb-2 cursor-pointer ${
          isShow && "hidden"
        }`}
        id="add-category"
        onClick={() => setIsShow(!isShow)}
      >
        Add new category?
      </button>
      <div className={`min-h-full ${!isShow && "hidden"}`} id="category-form">
        <h2 className="text-xl text-secondary-700 font bold mb-2">
          Add new category
        </h2>
        <form className="form min-h-full">
          <div>
            <label
              htmlFor="category-title"
              className="block mb-1 text-secondary-700"
            >
              Category Title
            </label>
            <input
              type="text"
              name="title"
              id="category-title"
              value={categoryForm.title}
              onChange={changeHandler}
              className="bg-transparent rounded-xl border border-secondary-500 text-secondary-700"
            />
          </div>
          <div>
            <label
              htmlFor="category-description"
              className="block mb-1 text-secondary-700"
            >
              Category Description
            </label>
            <textarea
              type="text"
              name="description"
              id="category-description"
              value={categoryForm.description}
              onChange={changeHandler}
              className="bg-transparent rounded-xl border border-secondary-500 text-secondary-700 w-full"
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              id="add-new-category"
              className="flex-1 btn btn--primary w-full sm:order-2"
              onClick={addNewCategoryHandler}
            >
              Add new category
            </button>
            <button
              className="flex-1 btn btn--secondary w-full sm:order-1"
              id="cancle-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsShow(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Category;
