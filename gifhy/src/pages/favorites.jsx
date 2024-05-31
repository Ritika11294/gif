import React, { useState, useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gifs from "../components/gif";

const Favorites = () => {
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const { gf, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await gf.gifs(favorites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favorites]);
  return (
    <div className="mt-2">
      <span className="faded-text">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
