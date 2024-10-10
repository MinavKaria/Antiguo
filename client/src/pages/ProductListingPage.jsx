import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyData = [
    {
      name: "Waistcoat with Contrast Piping",
      price: 29,
      image:
        "https://s3-alpha-sig.figma.com/img/0e1d/69ef/7c0c122d7da6878649d632b99f9a2816?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A~3STURj1leYLKOjMAHwKEaEyLqbd2kuEU13tHgQ0XcZd9z7ht4W71ctouQT4tNdBrzyWxIwJv6yis7YahJDdZYPoUx7UwWYnJB2XspxG2-qqxYJr7M2XoHXdYAa6OlvtPg4~AmSW14GGVbRVlu077juqK13T2PxSI2Idp8Wj-0OXG9jvFKZEfsJjwwKj0uf4aHmeMUGFAeEBis3WlSRso8NymX5b9AkD5Yk5WD-5kLlojRJIHLTVT0yJxjP26gAwjVbYhgBMq6AAeaGqBO5RqtAiqaCkf33hPy9jVfiHGR4jIs8g91TtyDBAQ1ILn4TkLgmSCKLbiOWCx7JhznF1Q__",

      id: 1,
    },
    {
      name: "Animal Print Oversized Jacket",
      price: 24,
      image:
        "https://s3-alpha-sig.figma.com/img/7cba/5575/9bd36cf8f2b8bf8e0c4b1d10fc890193?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RX99jB0dU5UbgOIPrOIMIfHG8svXe-riPsN91FQjYUDzSl~F0Xj14kCJ~jrm5VKN3mhuRRRiWBIKfCjxHEoOIbguujuSCimrCFb2vlI9QHJgP7ksN0t2zjQEGuBd~wr6f9H0181nKxMRZMpuVijUKqsLgQiH46fvYxw0Q5e1sbO6Wg~dGQywvDQflx-D9exgvVtBjDJwrlffE4YNds8amQ9Lnv9W-d2GVQ8LJfJ9kyBbD3EyiM3JHJ~Lz2Am-vKPLQzJaJ9j-~qe5oq3CHw5HfkOXB8vs2kOMv5~54lGyuDTvULEwWiX0fclfgr~v6tUeeYf5Sp4UuKL9RjTOsIOmA__",
      id: 2,
    },
    {
      name: "Faux Suede Animal Print Jacket",
      price: 36,
      image:
        "https://s3-alpha-sig.figma.com/img/04c6/3ccd/6c6136606daa4148e09127f3ceec0cb1?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nyQEIGK-GoJn~v73Um8Yw0l3fjL51AqFbDjDWHqYfvMPVu6Rq2TtGQQ6Jjj9JMnkdf-DA76nPY2MzbYoGsAz9t2UvVn-yKFyzcHPDV7J7aJMxR~2Ki4D5Qb-7kHNIB5RNS-1FwHFBENYaYLkQJvQWQ7CxMQVdmmASVq2tQWNr9FDBxUeaUCEtTMzN-Oi68fzwZXmuVbdq6rQtaglBq9JMZMCm8YGBZT9D4Lngi4rawpMR2dHKY1U3DCRhWlP8LhWbNJEREMg-2OsfRWGyK3dUVaatNnlNrKQgRtRHGMrrBPl1RfPmJx5IdAxyja41YoRVPEu4pH3TPpqz0hQAdA0Bg__",
      id: 3,
    },
    {
      name: "Black Long Sleeve Dress",
      price: 32,
      image:
        "https://s3-alpha-sig.figma.com/img/4c7a/cceb/f3e706804fe45c2ef770308e10a7bd02?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RNMZqoqJdJy8vOPwpB5jK7chVxCvTnH6Relphfo0W7BDhEhf3npbXM9ifTP9ZJdzmbtcTPGNyGwzCqdpzQCXxfFCSx1VgBEJ7HBIktySYNUrr1G6QvmdSetuw9X1onk2K5Ko5iObM2bnhZ7RCASTcGrGmqtI7HJHEMLN9zoKIuXrnruk2o-XiAqCgz4z8G8QUFZj-Y88DYISp9V4jkIa7E~DFLT1hbgfq79xHki82u~uhrIi3xjAyuHQ2YAgk0PcfvkzVIfDk9jzDPzLRaFNJIQ68Nw0RIGQ2aBYlSP0Wg8G5U3zD2CAWKL-ncujlYbJFc8dInh-tDha-lAM-y0vdg__",
      id: 4,
    },
    {
      name: "White Sleeveless Jumpsuit",
      price: 45,
      image:
        "https://s3-alpha-sig.figma.com/img/8b0a/36a9/642966aab4e084b9bb918c3c12984c6e?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=POCQwpKlbbU0T549hwC47lixHwJ~mFuVaOmee9kHSKPLyomAVG3y5zaHi-Z-5zkZb3To8JPuW2qFaPYFA7TVkVTsh~EdUqGWBJ3toR89X1w4SZpd-uJ0hmoSpzjZHUQRhnXwRZ0pMi9SECjJmycNA818i6NzkSxIVVUvTbKG-rw3TGYVajD5WAgBSH4eirpnYUrqwKtLnin7dAsLUjOBBVrj-i7W3CzW4rfJIJozgHVv5PyMWRp1rRl~3zmt2IN4wIoWSc8J7-1vFf1xsK2K5-XyeymzTGoLh1-rWhYjzOwureLRBQWpNF0SiMwxpVOIjzGlfrZKYIKPSaQtLf6K~A__",
      id: 5,
    },
    {
      name: "Olive Green Coat",
      price: 55,
      image:
        "https://s3-alpha-sig.figma.com/img/7b8d/cc82/a2e6104290408ab1ffd3237f1227eb5d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CvCWYaRov1Nai3UYNzIeR6CPJTZtNDwOvUxJE19EolBVheVnUHk9GQlaoXfs1tg65e95be7MJZbZhQRsA3dCP5RPSt9Deyy0tPPM8N1yeiP3siKYLk4Uo6nr3RKmUTFRpeGCCnWAUOnWoXFrYg9OpAP56KLhA66yqiUeBKRAbHDTnwCfX93OT-NBRdKLBGkHGvmuSL3CINILxXTrpmmhie8FMxi69mKMaKB0jpFQzTifhDhk3ZbtcqCmnjjmoGbIb152R00t~spQD5N-nW-kzl1BBNwNvrWqy2tpiXs7Mw0pzyFL5xxgUaQUqy2V8RfVsgnoVNgfeLjjld1pWW-0Xw__",
      id: 6,
    },
    {
      name: "FROCK COAT WITH ZIPS",
      price: 55,
      image:
        "https://s3-alpha-sig.figma.com/img/735d/e901/380158dca98a3b47bf28dd0acafbcf57?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oi02z-dp5U8yWe2hdm6L0HStXcLGbJFoUUBAkLDkxn3EPPmuC8wPf47bqKF4vcTs7b5TG3R6Ltpehj~4sklxVJLXJoTq955b5l-7HzWEXJnO5QnJkExz7DbVE7ETU48-XJU3yyl~Vtg8xyacMkd1g1U-a0Io205cASbuLaPpzN1GD3RprihKk44YqvtLU9ropP9PKSVZb8uCH8tOUVv~IS3qBYf~B-cAVQL2w~fVHyByjcI20vLJKlCIkJ2p-j~HnSOCDzxF23TTaQuTHe1NoTIr7gDpm2EgqYlyQar07Rp5SGS1nNnq1pYplRpbblJ2UUbTaNIYhU7vhe92babvgw__",
      id: 7,
    },{
      name: "TEXTURED SWEATER WITH THREAD",
      price: 55,
      image:
        "https://s3-alpha-sig.figma.com/img/f74c/9f52/2eeecdf3cbed61ba69458048e86ac550?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I~RF~RKNBF7AqBqhmHdl2cEg7pJ~A9g-61B7Wi9i2sWzqMSNMc3ZmaSGtZIqgA6I1h4fErqG9Jmnae3HieJwOlmbv5VjKyOHGAqAlruOGk9m8~MhHiTGixR2qRDQc3p9GERo-G-ucJnZstP0wmEu4-msubn4oOvzmCc7vZPnX1a3V3gt3TY58hPkhhYmybeaZnc-8hOnBgfj0KWmjIcFa4W2D5E16UyF~lQJB1SOqQlx1oQrVCH6G3X-ZTRKBlvgXkG-u-lMyCHBZ7Y3IVJzQVk03Z2eyiDTTGCmVXypyfOPmrsbPrfJ4oEYvGQuoI5dIRbhJo47UNJTMBiJPAy41g__",
      id: 8,
    },{
      name: "LACE-TRIMMED SATIN JUMPSUIT",
      price: 55,
      image:
        "https://s3-alpha-sig.figma.com/img/03ff/0d93/f7a3509a991b3cf0bb24322345d72dc5?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WeVmzz~-DZTfYZucvY3Mqgn9M-9ItHr4DqB5gT9udcJowBU7nRmtbW-9r0YUSB-Jf7faGAFwZfcYE7l0mhFx44Nv7B1I8vRP2B7lVlqvgnJZjqbndLnVSN7D0XkIFC3yZnbk8J8LudJKpV9aBDrrzVzT3X2M8Y8wazHe2~InoCgNuHRJMx3anVdvQ-zlJVgJTG3KzkfyftP54VKS9hXRbQg1dIT2BzVJGx0CWQgpBA~yzvMh1IW01NU0gySwTKmbDfCRC8lHd6DP1mT1sPl~Vxk7dEo7Q8oSTCG6qfV-DSNBbNMZwkG3uhTylZgQ5E7711IN1HiU568jQBHDwDgJWQ__",
      id: 9,
    },

  ];
  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyData);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-10 flex flex-col lg:flex-row p-5 gap-10">
      
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="text-center">
                      <Skeleton height={600} className="mb-4" />
                      <Skeleton width={150} className="mb-2" />
                      <Skeleton width={80} />
                    </div>
                  ))
              : products.map((product, index) => (
                  <Link key={index} className="text-center" to={'/products/'+product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover aspect-w-2 aspect-h-2 mb-4 w-full h-96 sm:w-80 sm:h-[500px] lg:w-[400px] lg:h-[600px]"
                    />

                    <h3 className="text-sm font-medium">{product.name.toUpperCase()}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                  </Link>
                ))}
          </div>
        </div>
        <div className="w-full lg:w-1/5 pr-6 mb-8 lg:mb-0">
          <div className="space-y-8">
            <div>
              <h2 className="font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Woman
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Man
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Size</h3>
                  <div className="space-y-2">
                    <label className="block text-gray-600">S</label>
                    <label className="block text-gray-600">M</label>
                    <label className="block text-gray-600">L</label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Color</h3>
                  <select className="block w-full border-gray-300 rounded-lg">
                    <option>Any</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Black</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-semibold">Price</h3>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <button className="text-gray-600 underline">Reset All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
