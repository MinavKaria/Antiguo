// import React, { useState } from 'react';
// import axios from 'axios';

// function VendorUpload() {
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("image"); 
//   const [cdnLink, setCdnLink] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError(""); 
//   };

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", fileType);

//     try {
//       const response = await axios.post("http://localhost:3000/media/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setCdnLink(response.data.fileUrl); 
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setError("Failed to upload file. Please try again.");
//     }
//     finally {
//       setLoading(false);
//     }

//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-5">Vendor Upload</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Upload File:</label>
//           <input 
//             type="file" 
//             onChange={handleFileChange} 
//             required 
//             className="border p-2 w-full" 
//           />
//         </div>
//         {loading && <p className="mt-3">Uploading file...</p>}
//         {cdnLink&&(
//         <>
//           <div>
//             <h2 className="font-bold">Uploaded File:</h2>
//             <img src={cdnLink} alt="Uploaded File" className="mt-5 max-w-[100px]" />
//           </div>
//         </>
//       )}
//         <div className=' hidden'>
//           <label className="block text-gray-700">File Type:</label>
//           <select 
//             value={fileType} 
//             onChange={handleFileTypeChange} 
//             className="border p-2 w-full"
//           >
//             <option value="image">Image</option>
//             <option value="pdf">PDF</option>
//           </select>
//         </div>
     
//       </form>
//       <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Upload</button>
//       {error && <p className="text-red-500 mt-3">{error}</p>}
      
//       {cdnLink && (
//         <div className="mt-5">
//           <h2 className="font-bold">CDN Link:</h2>
//           <a 
//             href={cdnLink} 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className="text-blue-600"
//           >
//             {cdnLink}
//           </a>
//         </div>
//       )}
     
//     </div>
//   );
// }

// export default VendorUpload;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VendorUpload() {
  const [file, setFile] = useState(null);
  const [cdnLink, setCdnLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [rentPrice, setRentedPrice] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image");

    try {
     
      const response = await axios.post("http://localhost:3000/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCdnLink(response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!cdnLink) {
      setError("Please upload an image first.");
      return;
    }

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      imageUrl: cdnLink, 
      rentPrice:Number(rentPrice)
    };

    try {
 
      const response = await axios.post("http://localhost:3000/api/products", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product successfully uploaded:", response.data);
      setError(""); 
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Failed to upload product. Please try again.");
    }finally
    {
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setStock('');
      setRentedPrice('');
      setCdnLink('');
    }
  };

  return (
    <>
    <div className="container mx-auto py-10"> 
    
      <div className=' flex justify-around '>
        <Link to="/vendor/products" className="text-blue-500 py-2">View Products</Link>
        <Link to="/vendor/orders" className="text-blue-500">View Orders</Link>
        <Link to="/vendor/rented" className="text-blue-500">View Rented Orders</Link>
      </div>


      <h1 className="text-2xl font-bold mb-5">Vendor Upload</h1>
      
      
      <form onSubmit={handleSubmitFile} className="space-y-4">
        <div>
          <label className="block text-gray-700">Upload File:</label>
          <input type="file" onChange={handleFileChange} required className="border p-2 w-full" />
        </div>
        {loading && <p className="mt-3">Uploading file...</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload Image</button>
      </form>

      {cdnLink && (
        <div className="mt-5">
          <h2 className="font-bold">CDN Link:</h2>
          <a href={cdnLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">{cdnLink}</a>
          <img src={cdnLink} alt="Uploaded File" className="mt-5 max-w-[100px]" />
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}


      {cdnLink && (
        <form onSubmit={handleSubmitProduct} className="space-y-4 mt-5">
          <div>
            <label className="block text-gray-700">Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Rented Price:</label>
            <input
              type="number"
              value={rentPrice}
              onChange={(e) => setRentedPrice(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit Product</button>
        </form>
      )}
    </div>
    </>
  );
}

export default VendorUpload;
