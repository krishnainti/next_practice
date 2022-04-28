import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Product } from "./interfaces.ts";
import Header from "./Layout/Head";
import Footer from "./Layout/Footer";
import { getProducts } from "./api/product.service";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Layout/Heading";
import Loader from "./Layout/Loader";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((e) => {
        alert("Please open after 30 seconds");
      });
  }, []);

  return (
    <div className="min-h-full">
      <Header
        title={"Products Page"}
        meta={{ name: "Products", content: "Products Page" }}
      />

      <Heading title="Products" />
      <main>
        {!products.length && (
          <div className="p-10">
            <Loader />
          </div>
        )}
        {!!products.length && (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {products.map((product, index) => {
              return (
                <div key={index} className="rounded overflow-hidden shadow-lg">
                  <div className="text-center">
                    <Image
                      className="w-full"
                      src={product.image}
                      alt="No Image"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {product.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)} ... More`
                        : product.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {`$${product.price}`}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{product.category}
                    </span>
                    <Link href={`/product/${product.id}`} passHref>
                      <span className="inline-block cursor-pointer bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        View
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
