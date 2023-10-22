import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import Card from "./Card";

const SearchBar = () => {
  const accessKey = "QgGMv_fW6ATHXj2hCSfIkbz92JB4HanQk1I2_j8fwhM";
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    fetchImages();
  };

  const fetchImages = useCallback(() => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (page === 1) {
          setItem(data.results);
        } else {
          setItem((prevItems) => [...prevItems, ...data.results]);
        }
        setHasMore(data.total_pages > page);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [page, inputData, accessKey]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    
  };

  useEffect(() => {
    if (inputData !== "") {
      fetchImages();
    }
  }, [page, fetchImages, inputData]);

  return (
    <main>
      <section className="container search">
        <h1 className="text-center mt-5 mb-4">Image Search</h1>
        <form className="input-group" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Search"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button
            type="button"
            className="input-group-text btn btn-success shadow-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </section>

      {/* Render the images */}
      <section className="container main-container mt-3">
        <div className="row" id="result">
          {item.map((items) => {
            return <Card info={items} />;
          })}
        </div>
        <div className="d-flex justify-content-center py-5">
          <button
            className="btn btn-dark shadow-none"
            id="btn_more"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      </section>
    </main>
  );
};

export default SearchBar;
