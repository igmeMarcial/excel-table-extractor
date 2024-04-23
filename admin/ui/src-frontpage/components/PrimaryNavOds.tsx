import React from 'react';

const Item = ({ item }) => {
  return (
    <div
      className={`min-h-16 p-2 rounded-lg text-center self-stretch max-h-5 relative`}
      style={{
        backgroundColor: item.color,
        width: 'calc(11.1111% - ( 0.83333333333333 * 30px ) )',
      }}
    >
      <div
        style={{ fontSize: '10px', lineHeight: '0.8rem', height: '60%' }}
        className="text-white"
      >
        {item?.titulo}
      </div>
      <img
        src="https://ods.mma.gob.cl/wp-content/uploads/2017/06/1-300x300.png"
        style={{
          width: '50px',
          height: '50px',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
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
