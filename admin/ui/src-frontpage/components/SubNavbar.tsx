import React from 'react';

function SubNavbar() {
  const items = [
    { text: 'INICIO', path: 'inicio' },
    { text: 'MDEA', path: 'mdea' },
    { text: 'ODS', path: 'ods' },
    {
      text: 'Política Nacional del Ambiente',
      path: 'pna',
    },
  ];

  return (
    <div className="w-full bg-gray-200 ">
      <nav className="flex justify-between items-center py-0">
        <ul className="flex list-none space-x-4 py-0 my-2 pl-0">
          {items.map((item, index) => (
            <li key={item.path}>
              <a
                href={`/${item.path}`}
                className="text-gray-800 no-underline hover:text-gray-600 font-segoeui font-semibold text-base leading-20"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SubNavbar;
