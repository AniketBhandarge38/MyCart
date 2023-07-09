import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";

export default function Body() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);

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
    const selProd = products.filter((prod) => prod.id === productId);

    setSelectedProduct(selProd[0]);
  }

  function handleGoBackClick() {
    setSelectedProduct(null);
  }

  function setSelectedPage(seletedPage) {
    console.log(seletedPage);
    if (
      seletedPage > 0 &&
      seletedPage <= products.length / 10 &&
      seletedPage !== page
    ) {
      setPage(seletedPage);
    }
  }

  return (
    <div>
      <div className="products-container">
        {selectedProduct ? (
          <ProductDetails
            selectedProd={selectedProduct}
            onClickGoBack={handleGoBackClick}
          />
        ) : (
          products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={() => handleProductClick(product.id)}
              />
            );
          })
        )}
      </div>

      {!selectedProduct && (
        <div className="pagination">
          <span onClick={() => setSelectedPage(page - 1)}>Prev</span>

          {[...Array(products.length / 10)].map((_, i) => {
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
