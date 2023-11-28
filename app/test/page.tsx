export default function Test() {
  return (
    <nav className="bg-gray-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            Your Brand Name here
          </div>
          <div className="hidden md:flex">
            <a href="#" className="text-white mx-2">
              Services
            </a>
            <a href="#" className="text-white mx-2">
              Products
            </a>
            <a href="#" className="text-white mx-2">
              Blog
            </a>
          </div>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
