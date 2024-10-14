import React from 'react'

function SimilarItem({similarProducts, isLoading}) {
  return (
    <>
        <div className="mt-12 ">
        <h2 className="text-xl font-bold mb-4">Similar Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((similarProduct, index) => (
            <div key={index} className="text-center">
              <div className="aspect-w-1 aspect-h-1">
                {isLoading ? (
                  <Skeleton height={200} />
                ) : (
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.name}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <>
                  <h3 className="text-sm font-medium mt-2">
                    {similarProduct.name}
                  </h3>
                  <p className="text-gray-600">₹{similarProduct.price}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SimilarItem