"use client";
import React from "react";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import { GiRoundStar } from "react-icons/gi";
import { AddMediaResponse } from "@/types/userTypes";

const MoviesList: React.FC<AddMediaResponse> = ({
  _id,
  createdAt,
  id,
  media_type,
  backdrop_path,
  first_air_date,
  name,
  original_title,
  poster_path,
  release_date,
  title,
  vote_average,
  Index,
}) => {
  return (
    <div>
      <section className="mt-10 ">
        <div>
          <div className="flex gap-5 max-md:mr-1 mr-20 bg-opacity-40 bg-neutral-800">
            <div className="shrink-0">
              <Images
                src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                width={125}
                height={0}
                alt="moviess"
                rounded="0"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl mt-2 font-medium max-md:text-base">
                <span className="font-light text-xl  pr-1">{Index + 1}.</span>
                {title}
              </h3>
              <div className="flex flex-col justify-between  h-full justify-self-stretch ">
                <div className="flex items-center  gap-6 ml-2 max-md:ml-0 max-md:mb-3 mt-2 text-xs">
                  <div className="flex  items-center gap-2">
                    <p className="text-_light_white max-md:text-xxs text-sm font-normal ">
                      {release_date?.split("-")[0]}
                    </p>
                    <div className="flex gap-1 max-md:text-xxs text-sm  text-_light_white items-center">
                      <span>{vote_average}</span>
                      <GiRoundStar className="text-yellow-500 mb-[1px]" />
                    </div>
                  </div>

                  <span className=" max-md:text-xxs text-sm border-_light_white tracking-wider border-[1px] border-opacity-25 font-thin max-md:px-1 max-md:py-0 px-2 rounded-md py-1 scale-90 text-_white">
                    {media_type}
                  </span>
                </div>
                <section className=" flex  items-center  mb-3 gap-6">
                  <Link
                    href={`/${media_type}/${id}`}
                    className="bg-_genre_chip_bg hover:text-neutral-100 px-5 max-md:px-3 max-md:py-1  py-2 rounded-md tracking-wide text-sm font-light text-neutral-300 "
                  >
                    Watch
                  </Link>
                  <button className="bg-red-400  max-md:px-3 max-md:py-1 hover:bg-opacity-90 transition-opacity duration-150 ease-linear px-5 py-2 rounded-md tracking-wide text-sm  font-normal text-neutral-900">
                    Remove
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesList;
