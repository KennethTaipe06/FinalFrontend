import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/img/background-3.png";

const GET_PRODUCTS_SERVER = 'http://localhost:5003/items';

const fetchProducts = async () => {
  try {
    const productsResponse = await fetch(`${GET_PRODUCTS_SERVER}`);
    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }
    const responseData = await productsResponse.json();

    if (!Array.isArray(responseData.products)) {
      throw new Error('Products response is not an array');
    }

    const productsWithUserDetails = await Promise.all(responseData.products.map(async (product) => {
      const userResponse = await fetch(`http://localhost:3004/users/public/${product.userId}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }
      const user = await userResponse.json();
      return { ...product, user };
    }));

    return productsWithUserDetails;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsData();
  }, []);

  const convertBinaryToImageSrc = (binaryData) => {
    return `data:image/jpeg;base64,${btoa(binaryData)}`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-gold pt-20" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-900 p-4 text-white lg:block hidden">
        <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
        <input
          type="text"
          placeholder="Buscar en Marketplace"
          className="w-full p-2 mb-6 rounded bg-gray-800 text-white focus:outline-none"
        />
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="hover:text-gold">
                Explorar todo
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gold">
                Notificaciones
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gold">
                Bandeja de entrada
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gold">
                Compra
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gold">
                Venta
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="w-full mt-4 py-2 bg-gold text-black rounded hover:bg-yellow-500"
          onClick={() => navigate('/marketplace/create-product')}
        >
          + Crear publicación
        </button>
        <div className="mt-8">
          <h2 className="text-lg mb-4">Ubicación</h2>
          <p>Quito · En un radio de 23 km</p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg mb-4">Categorías</h2>
          <ul>
            <li className="mb-2 hover:text-gold">Vehículos</li>
            <li className="mb-2 hover:text-gold">Alquiler de propiedades</li>
            <li className="mb-2 hover:text-gold">Aficiones</li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-black bg-opacity-75">
        <div className="lg:hidden flex justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar en Marketplace"
            className="w-full p-2 mb-6 rounded bg-gray-800 text-white focus:outline-none"
          />
          <button
            className="ml-4 py-2 px-4 bg-gold text-black rounded hover:bg-yellow-500"
            onClick={() => navigate('/marketplace/create-product')}
          >
            + Crear publicación
          </button>
        </div>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Novedades para ti</h2>
          <div className="bg-gray-800 text-white p-4 rounded">
            <p>El artículo XBOX SERIE S ahora cuesta 15 $ menos.</p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Destacados de hoy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-800 p-4 rounded text-left text-white shadow-lg">
                <img
                  src={convertBinaryToImageSrc(product.image_data)}
                  alt={product.name}
                  className="mb-4 rounded h-48 w-full object-cover"
                />
                <p className="font-bold text-lg">{product.price} $</p>
                <p className="truncate">{product.name}</p>
                <p className="truncate">{product.description}</p>
                <p>Seller: {product.user.firstName} {product.user.lastName}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
export { Marketplace };
