import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SingleProduct } from "../interfaces.ts";
import Header from "../Layout/Head";
import Heading from "../Layout/Heading";
import Footer from "../Layout/Footer";
import { getSingleProduct } from "../api/product.service";
import Loader from "../Layout/Loader";

const ProductPage: NextPage = () => {
  const [product, setProduct] = useState<SingleProduct>(Object);
  const [productId, setProductId] = useState<string>("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (productId) {
      getSingleProduct(productId)
        .then((res) => {
          setProduct(res);
        })
        .catch((e) => {
          alert("Details Not found");
        });
    }
  }, [productId]);

  useEffect(() => {
    if (id) {
      setProductId(id as string);
    }
  }, [id]);

  return (
    <div className="min-h-full">
      <Header
        title={"Product Page"}
        meta={{ name: "Product", content: "Product Page" }}
      />

      <Heading title="Single Product Page" />
      <main>
        {!product && (
          <div className="p-10">
            <Loader />
          </div>
        )}
        {product && (
          <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Link href="/" passHref>
                <div className="mb-5">
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Back
                  </button>
                </div>
              </Link>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {product?.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    #{product?.category}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.description}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Price{" "}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {`$${product.price}`}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Image
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product?.image && (
                          <Image
                            className="w-full"
                            src={product?.image}
                            alt="No Image"
                            width="100%"
                            height="100%"
                          />
                        )}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Rating
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.rating?.rate} / {product.rating?.count}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="inline-flex mt-5">
                <button
                  className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
                    productId === "1" ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (productId != "1") {
                      setProductId((+productId - 1).toString());
                    }
                  }}
                >
                  Prev
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  onClick={() => {
                    setProductId((+productId + 1).toString());
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
