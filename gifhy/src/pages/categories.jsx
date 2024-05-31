import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gifs from "../components/gif";
import FollowOn from "../components/followOn";

const Categories = () => {
  const [results, setResults] = useState([]);
  const { categories } = useParams();
  const { gf } = GifState();

  const fetchResults = async () => {
    const { data } = await gf.gifs(categories, categories);
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [categories]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gifs gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me
        </span>
        <FollowOn />

        <div className="divider"></div>
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {categories.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{categories}
        </h2>
        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-2">
            {results.slice(1).map((gif) => {
              return <Gifs gif={gif} key={gif.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
