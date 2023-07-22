import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { useSelector } from "react-redux";
import { store } from "../store";
import Cart from "./Cart";

export default function Body() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);

  const searchQuery = useSelector((store) => store.search.searchQuery);

  useEffect(() => {
    if (searchQuery) {
      showSearchedProduct(searchQuery);
    } else {
      fetchProducts();
    }
  }, [searchQuery]);

  function showSearchedProduct(searchQuery) {
    console.log("Searched query: ", searchQuery);
    let prods;
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        prods = data.products;
        const searchedProducts = prods?.filter(function (prod) {
          return prod.title.includes(searchQuery);
        });
        console.log(searchedProducts);
        setProducts(searchedProducts);
      });
  }

  function fetchProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleProductClick(productId) {
    const selProd = products.find((prod) => prod.id === productId);
    setSelectedProduct(selProd);
  }

  function handleGoBackClick() {
    setSelectedProduct(null);
  }

  function setSelectedPage(seletedPage) {
    console.log(seletedPage);
    if (
      seletedPage > 0 &&
      seletedPage <= Math.ceil(products.length / 10) &&
      seletedPage !== page
    ) {
      setPage(seletedPage);
    }
  }

  return (
    <div>
      <div className="products-container">
        {selectedProduct ? (
          <>
            <ProductDetails
              selectedProd={selectedProduct}
              onClickGoBack={handleGoBackClick}
              key={selectedProduct.id}
            />
            <Cart />
          </>
        ) : (
          products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <ProductCard
                product={product}
                onProductClick={() => handleProductClick(product.id)}
                key={product.id}
              />
            );
          })
        )}
      </div>

      {!selectedProduct && (
        <div className="pagination">
          <span onClick={() => setSelectedPage(page - 1)}>Prev</span>

          {[...Array(Math.ceil(products.length / 10))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "active-page" : "not-active"}
                key={i}
                onClick={() => {
                  setSelectedPage(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}

          <span onClick={() => setSelectedPage(page + 1)}>Next</span>
        </div>
      )}
    </div>
  );
}
