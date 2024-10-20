import DarkModeToggle from "../ui/DarkModeToggle";

function Navbar({ productsLength }) {
  return (
    <div className="h-12 flex items-center justify-center bg-primary-900 mb-6">
      <div className="flex items-center justify-center gap-x-4 max-w-screen-lg w-full">
        <h1 className="text-xl font-bold text-secondary-0">Inventory App</h1>
        <span
          className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary-0 text-primary-900 border-2 border-primary-500 font-bold"
          id="products-counter"
        >
          {productsLength}
        </span>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
