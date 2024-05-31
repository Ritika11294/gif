import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import FilterGif from "../components/filtergif";
import Gifs from "../components/gif";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResult = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResult(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResult && searchResult.length > 0 ?  (
		<div className="columns-2 md:columns-3 lg:columns-4 gap-2">
		{searchResult.map((gif) => {
			return <Gifs gif={gif} key={gif.id}/>
		})}
	  </div>
	  ) : ( 
		<span>
			{" "} 
			No GIFs found for {query}. Try something for Stickers instead?
		</span>
	  )}
    </div>
  );
};

export default Search;
