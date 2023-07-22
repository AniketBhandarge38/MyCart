import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../features/searchSlice";

export default function Search() {
  const [newsearchQuery, setSearchQuery] = useState("");

  function handleSearchQuery(event) {
    setSearchQuery(event.target.value);
  }

  const dispatch = useDispatch();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Find product..."
        onChange={handleSearchQuery}
      />
      <button
        onClick={(e) => {
          dispatch(searchProduct(newsearchQuery));
        }}
      >
        Search
      </button>
    </div>
  );
}
