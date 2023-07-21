import { useEffect, useRef, useState } from "react";

export default function ProductDetails({ selectedProd, onClickGoBack }) {
  let images = selectedProd.images;

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [cartItems, setCartItems] = useState([]);

  const cartRef = useRef(cartItems);

  function handleImgClick(event) {
    setSelectedImage(event.target.src);
  }

  function handleAddToCartClick(selectedProd) {
    console.log("Add to cart clicked", selectedProd);
    setCartItems([...cartItems, selectedProd]);
    //onClickGoBack();
  }

  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

  console.log("Ref: ", cartRef.current);

  return (
    <div>
      <div className="product-details">
        <div className="imgages">
          <div className="all-images">
            {images.map((img) => {
              return (
                <img src={img} key={img} alt="item" onClick={handleImgClick} />
              );
            })}
          </div>
          <div className="selected-img">
            <img src={selectedImage} alt="main" />
            <button onClick={() => handleAddToCartClick(selectedProd)}>
              <svg
                className="_1KOMV2"
                width="16"
                height="16"
                viewBox="0 0 16 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                  fill="#fff"
                ></path>
              </svg>
              Add To Cart
            </button>
          </div>
        </div>

        <div className="details">
          <button onClick={onClickGoBack}>Go Back</button>
          <h3>{selectedProd.title}</h3>
          <p>{selectedProd.description}</p>
          <span>Rating: {selectedProd.rating} </span>
          <p>Price: ₹ {selectedProd.price} </p>
          <span>Brand: {selectedProd.brand} </span>
          <p>Category: {selectedProd.category} </p>
        </div>
      </div>
    </div>
  );
}
