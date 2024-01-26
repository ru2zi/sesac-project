const NavBar = () => {
  return (
    <aside className="font-bold mb-4 bg-green-500 text-white">
      <h1 className=" text-2xl border-b border-gray-300 font-extrabold">
        블로그 유형
      </h1>
      <ul className="list-none text-center flex flex-wrap content-center justify-end">
        <li className="mr-2">
          <a
            href="#link1"
            className="block p-2.5 border-b border-gray-300 hover:bg-green-400"
          >
            일상글
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#link2"
            className="block p-2.5 border-b border-gray-300 hover:bg-green-400"
          >
            지식글
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#link3"
            className="block p-2.5 border-b border-gray-300 hover:bg-green-400"
          >
            감성글
          </a>
        </li>
        <li>
          <a
            href="#link4"
            className="block p-2.5 border-b border-gray-300 hover:bg-green-400"
          >
            학습글
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;
