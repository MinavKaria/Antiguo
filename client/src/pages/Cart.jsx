import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://s3-alpha-sig.figma.com/img/6dd1/4b95/6a316b2558e25dbe2cc135da7f721a50?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K-nQnFveDPrne~6xAB32EYujidYBmIWxcbRa6U3rGf~9KU4Gz6o3~K4R6EszC421WX1gbYMnsfYDqRYrnU49m0eDVtjnY9pO1a~BGKuQ8KHm5HqOkqUG00m6F2M9eNT5ae0dcWNN2x-MHDzJ9yfxHRhhXVWnMIfNEWGsc1bFS0L2wOqcUSXmiwcCi8qb0KTGci2hO6pg7VRxvFouCLbOLLrtRBiLGB16TAqN50GHGMNvGDB77tdwbKys73vusCkWnctRoUdfr2vGB~XKEKXhGL7aJzfVxp~zuIuv~IrjeQPGgPDPKA~LniDj4YKXF5e23xcy1nihm27bADoNac5wAg__",
      name: "Waistcoat with Contrast Piping",
      color: "Navy Blue",
      size: "M",
      price: 74,
      quantity: 1,
    },
    {
      id: 2,
      image:
        "https://s3-alpha-sig.figma.com/img/1a01/030e/96d569345fc1a3342657477d145f720f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AWoAYSs4gm1c525mqsxe7pl3rAWncamhGfV-aHACI6SttcKIaii0nIPExjK65zhcgRQBPH5JxlxqBt6j-MRpKDVKv23Co3y4ERZtHGlxj0Ib1EnAzVK10J~0-GLTE2fO2431SZlIpFSn8flH6ri2Sja5g04ugyq4th5~DZrNS3fDMs81UEQSbzxrD~W8SiL0bAnQoMPLJYoJDEU52gHZ4RGlpFc0-vrPXyse2FmnShiSQlVtbdsqDqA~v7LPDQu2pvqwELzKUCrx1KIh0fFktOvEw86-MGV3OOarzAfz95qzSbj9xc8g1lieTswjsVcGHtfAP31bN5TE4iJ9SWpr8g__",
      name: "Printed Flowing Trousers",
      color: "Purple",
      size: "M",
      price: 20,
      quantity: 1,
    },
    {
      id: 3,
      image:
        "https://s3-alpha-sig.figma.com/img/f306/0bc9/73d24a3025945f88e7fa54dc0aa03a21?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AkxaY7yWUhRB05MlAyENEEMKQLrDqdNGviD9TbIy1vFB37QQJvRBcYzHcO9jjcZQswObdSPLYPSUE5-t8sSe~lWxAMKIdGPLETwYFmV3OY5alwl6PZugEl8mUKegC1rzHCp7as~QzOh-hiflwbypWjjFTuJx2~C0t8VLQzU1GXjiL4WcuGzIqnNsLyc8QGozVHqwqNVxyKJME603GmONcld4O4EW4pbTxwy28f0737rUnYfrrtMk6JrYhAmwfkin4~gDaaDU12Xj-e9JCZpvU5Ac5d5BaSukys-jpXxPeUrNAXvaxizk3TgUjdRYbaaOzZ1VkCzFLHcYt83EjUXYxQ__",
      name: "Track Sole Ankle Boots",
      color: "Black",
      size: 39,
      price: 59,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountedPrice
        ? item.discountedPrice
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="hidden md:table-row">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Units</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b md:table-row flex flex-col md:flex-row space-y-4 md:space-y-0"
              >
                <td className="px-4 py-2 flex md:block">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="block md:hidden">
                        {item.color} / {item.size}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 py-2">{item.color}</td>
                <td className="hidden md:table-cell px-4 py-2">{item.size}</td>
                <td className=" px-4 py-2 flex items-start  md:table-cell">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {item.discountedPrice ? (
                    <span className="text-green-500">
                      ${item.discountedPrice}{" "}
                      <span className="line-through text-gray-500">
                        {item.price}
                      </span>
                    </span>
                  ) : (
                    <span>₹{item.price}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!cartItems.length === 0 ? (
        <>
          <div className="text-right mt-8">
            <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
          </div>

          <div className="text-right mt-4">
            <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              Checkout Now
            </button>
          </div>
        </>
      ):(
        <p className="text-center mt-8 text-5xl text-slate-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
