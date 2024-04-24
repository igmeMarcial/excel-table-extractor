import React from 'react';

const Item = ({ item }) => {
  return (
    <div
      className={`min-h-16 p-2 rounded-lg text-center self-stretch max-h-5 relative `}
      style={{
        backgroundColor: item.color,
        width: 'calc(11.1111% - ( 0.83333333333333 * 30px ) )',
      }}
    >
      {item.numero !== 18 ? (
        <>
          <div className="text-white text-xl font-bold">{item.numero}</div>
          <div
            style={{ fontSize: '10px', lineHeight: '0.8rem', height: '50%' }}
            className="text-white content-center"
          >
            {item?.titulo}
          </div>
        </>
      ) : (
        <img src={item.urlImg} className="w-full h-full object-cover" />
      )}
    </div>
  );
};

function PrimaryNavOds({ items }) {
  const mitad1 = items.slice(0, Math.ceil(items.length / 2));
  const mitad2 = items.slice(Math.ceil(items.length / 2));
  return (
    <>
      <div className="flex justify-between flex-nowrap mt-5 mb-3 place-items-center">
        {mitad1.map((item, index) => (
          <Item item={item} key={item.color} />
        ))}
      </div>
      <div className="flex justify-between flex-nowrap  mb-5 place-items-center">
        {mitad2.map((item, index) => (
          <Item item={item} key={item.color} />
        ))}
      </div>
    </>
  );
}

export default PrimaryNavOds;
