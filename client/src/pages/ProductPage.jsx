import React from "react";
import Skeleton from "react-loading-skeleton";
import SimilarItem from "../components/SimilarItem";

const ProductPage = ({ isLoading }) => {
  // Dummy data for the main product
  const product = {
    name: "Waistcoat with Contrast Piping",
    price: 24,
    mainImage:
      "https://s3-alpha-sig.figma.com/img/0e1d/69ef/7c0c122d7da6878649d632b99f9a2816?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A~3STURj1leYLKOjMAHwKEaEyLqbd2kuEU13tHgQ0XcZd9z7ht4W71ctouQT4tNdBrzyWxIwJv6yis7YahJDdZYPoUx7UwWYnJB2XspxG2-qqxYJr7M2XoHXdYAa6OlvtPg4~AmSW14GGVbRVlu077juqK13T2PxSI2Idp8Wj-0OXG9jvFKZEfsJjwwKj0uf4aHmeMUGFAeEBis3WlSRso8NymX5b9AkD5Yk5WD-5kLlojRJIHLTVT0yJxjP26gAwjVbYhgBMq6AAeaGqBO5RqtAiqaCkf33hPy9jVfiHGR4jIs8g91TtyDBAQ1ILn4TkLgmSCKLbiOWCx7JhznF1Q__",
    thumbnails: [
      "https://s3-alpha-sig.figma.com/img/e9ef/0233/5385118bf5db83ffbae7faf4c57209d2?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LjzEH0HuRbqa2LLYiz31QP5ZdtZlCsRZwYKSpCGnXoW3o5KF4E1e-Nlzlu2~o0u~WqEBdTHBXwjUebl5lOcawFvpWMK3YHZLj4nXOIQaTsvN~gNgQQn-lWTjATPDF5fi5yHJBC24F8p1XY1GU1urL70-jeOyGCDfIQqqI65tPHA9jsmtBgtPL1A1SVoEmhMsxVIbAE~m1TmCricGwE0dNlx68jS-nFtOUGIHpWFmjgWSvt6-wHUaFwqly--lugLqH5~4Zlc5~0wutc7vTxBfqsDnTSHY4j9YZCEdUGvDd~R0cgH7V22tTaJfOoEEQcR3eqYa6k-8uNGOC-WFsFackw__",
      "https://s3-alpha-sig.figma.com/img/c246/29e9/39172779bf6fe37f98660278465c200f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VNicxIx35MjurgTESn9j6Dxt2UhmEuL6XCHZoDtZBwSyKsateOTiTEUqjq7xDS6oKfa~pCT2Z-zyQGB6ucCXDhUAULx~4NjuzjfYPRx065HoxyNsr91yhqyV2p0-2N0Fy6ChQKEcifwaHCcofuUSXrpuG~U5np6PfQYEqOxJeziknRU6OBpsaF2Qk7f4QzCLBiF5ioYwwDuzp0CSoifkOOMhRAY9AT63Eu6pmXDLu9g8rq-fnnm7T0A5NN20lPBfFqZPo~JXjAUo~qiCW~mDyIhqdRpEgyzAKyi-I89o1JYs8AzGKnlfpVvb9Gu93s1yyI~esq47bx~aIJy9k5npsQ__",
      "https://s3-alpha-sig.figma.com/img/c81a/5813/1ce0cf9f3c4f64de9a97b84e3287d486?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oWm43rsPjY2dCuk21rBxKdEDif4MquDP35ufKKgYsAFJcC0NIs8uoP3sSPoLcKE9lUkeU1H4gaWmJrcUfzlQCrs1BUQrQNlCD22RDdJX8SkDSpJgDc7TsmAIvcpEoJtedV1wIsKahIQI58HCugCmlzPGFPRkpi~hEfbiweKV6NNuRWb5DX-Zyeb9R9eN5doARdPQjddgJZbeJlS7rUZCVv66KwFaJd80cdat~fynCIIr6ybi63BLMYJ1LHNo9XHsi9MRjlW05abvKW8cxVNJxszyveh7ANZE9crUESgpHPR64PE7DQifhMvP7rFRVjs0IJzNmZvyitn-PVx2YcWuPQ__",
    ],
    description:
      "A versatile waistcoat featuring contrast piping. Ideal for a casual yet stylish look.",
  };

  const similarProducts = [
    {
      name: "Waistcoat with V-neck",
      price: 28,
      image:
        "https://s3-alpha-sig.figma.com/img/24e9/9cd9/83b1f04db3721513da088b6266635870?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KIgghhcjva0TuFf8xDzirbOYHvd3JVcmSkgBEMqo0Hpg5gFARrzwwLDwHWYiLTdilzxYPFM~FVlwdVi-OmlyIN9P00ASZcqTLiV8JjIdoHkH7Uu1ivZpS9~vOmUupZJ-T99u9ZY~HFpONwKAr7tCDTwd418RBZx1EuHwN9r0dl~IUuubtM5F-BZC-cgRfiSWYJq3rAkOaHnGzKkSGKbZsNpHZwRuPX6aMdQgCMMOdxNhirD2XQYscmr~w1RB3g~jsPvhHPolo3m0GXRD8qngRkz4o1XqhBPvt4JvrYaUOAJCBgH0sgaanVR6FQVKGJF3PVeCP47E7sgB1S0hjKTWYg__",
    },
    {
      name: "Animal Print Jacket",
      price: 35,
      image:
        "https://s3-alpha-sig.figma.com/img/44e0/fb9e/e8cf6976a5226c1a3837f905ac0e9884?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CMR85XFcf-UTLcAnobgokEUR4KDZXFBcYtoBsTfDwfRKqYmG49T3PjUNNgQopprDLpN4VmZhaG0xpV6QbIbmVSj73U7FuOLWzHja8sRKKPA54nBlo7VkbH6~PhM4~6LP3gook2s6U1nr9r0wYTz8I2ccBnUdrOqJLB60JlLKWLQ0-2kPkAPQ7g5cQ7rn9zC52QBB4wbj-D5Jdh4FAitsOI~eIVV3shKu~Dz~XbIx~68Hhc2pTQkys1Sm-UP9UkYJfsKdHvlL8SYg3sb0f0p3wEgyBumjCbhXvCZEObcxNM~us4NaH500jyFm~wOyue7~basqvV8Fq4k1XEBL-KODHQ__",
    },
    {
      name: "Buttoned Sleeveless Dress",
      price: 40,
      image:
        "https://s3-alpha-sig.figma.com/img/d38e/5b74/3a3673547521db00f0cbd035a496454d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SX8P5TluWLV9SZr-i4SjLwAPbEx2FSqrLXzPtqxAqFu3SUWQnRgSPLFqpfj19ntn~T8I2IqhoGPb1NxpCZ52DjDKn5fnJs6Fp28hdLlJJkbMFrtvTkepnk1ZhfDD5Lz80DF0p1XulmTscLQiZdvzu1GWRKJGg7jJKa81oHxOWNgxB5mR9~pl84SauTrG9UCq3BX4KMlZ982h0f~9zq~28xywjmdOF6AbyGIdeZlK2-kNWwWwQmV2ck9t2irS3UdU7JJUFILPdmyQsss775r-LZu8j~uh4EtSSl05WEb9tbknlX2OAFGmdVyqvMPmJ8bMLi4P4oLMB3vnGtZrOQOz9A__",
    },
    {
      name: "Long Coat with Belt",
      price: 50,
      image:
        "https://s3-alpha-sig.figma.com/img/58b5/5eb0/96907b434663c25344dc69c8eb3730a8?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cUn2RukP6Vbvb4busMb8nQLoCylMWBnltdfGlj~WKV08F0oekdsJC9jG63~IXnA-M~RiO7QHIypmejFfNBPgW8z3IyZCH~SvjC48k8c-Yw~rTEIC6FIJ9sN6WMbzTaZc24k3pV8RAc9~AW6XMLM6aEFRsMj1m3NrYtvNjLa-jLFGi2CoD8nrBLjAqpHUR8OaHfVBX4w0equ4dEvL8DE2pD2xC-ZUkMOCDnsHh58ROyH6kps5sGWH7Stsd3N4n5aGi49d9eez4SBTqORBnCL1ocut-BGMckqePDdpWTAV2VLAjf3ZZDploLfPqZSuYmnM4DzzjB~eX~TQBRLrJE0Z4g__",
    },
  ];

  return (
    <div className="container mx-auto p-16">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-1/2  flex">
          <div className="aspect-w-3 aspect-h-4 relative pr-4  ">
            {isLoading ? (
              <Skeleton height={600} />
            ) : (
              <img
                src={product.mainImage}
                alt={product.name}
                className="object-cover aspect-w-2 aspect-h-2 mb-4 w-full "
              />
            )}

            <div className="flex flex-col justify-start items-center gap-5 space-y-4 mt-4 absolute top-[20%]  right-[-30px] lg:top-[15%] md:top-[10%] ">
              {product.thumbnails.map((thumb, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 ">
                  <img
                    src={thumb}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="object-cover  cursor-pointer aspect-w-2 aspect-h-2 mb-4 w-full h-96 sm:w-[80px] sm:h-[80px] lg:w-[150px] lg:h-[150px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-20 py-6">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 text-lg">₹{product.price}</p>
              <p className="text-gray-600 my-4">{product.description}</p>
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>

      <SimilarItem similarProducts={similarProducts} isLoading={isLoading}/>
    </div>
  );
};

export default ProductPage;
