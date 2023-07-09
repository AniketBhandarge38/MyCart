export default function ProductCard({ product, onProductClick }) {
  return (
    <div className="product" onClick={onProductClick}>
      <img alt="Thumbnail" src={product.thumbnail} />
      <h2>{product.title}</h2>
      <span>Rating: {product.rating} </span>
      <p>Price: {product.price} ₹</p>
    </div>
  );
}
