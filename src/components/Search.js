import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../features/searchSlice";
import { store } from "../store";

export default function Search() {
  const [newsearchQuery, setSearchQuery] = useState("");

  function handleSearchQuery(event) {
    setSearchQuery(event.target.value);
  }

  const dispatch = useDispatch();
  //const { searchQuery } = useSelector((store) => store.search);

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
