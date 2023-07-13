import React from "react";
import { singleEpisodeTypes } from "@/types/types";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Tooltip from "@mui/material/Tooltip";

const Episode: React.FC<singleEpisodeTypes> = ({
  id,
  still_path,
  episode_number,
  air_date,
  gues_star,
  name,
  runtime,
  season_number,
  vote_average,
  overview,
  production_code,
  vote_count,
}) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const TotalEpisodes = searchParams.get("e");
  const currentEpisode = searchParams.get("ce");

  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(
          `/tv/${params.id}/seasons?s=${season_number}&e=${TotalEpisodes}&ce=${episode_number}`
        );
      }}
      className={clsx(
        "flex gap-2 cursor-pointer items-center rounded-3xl px-5 py-[6px]",
        currentEpisode === episode_number.toString()
          ? "bg-_blue bg-opacity-50 font-normal text-white"
          : "bg-_black_bg hover:bg-neutral-700"
      )}
    >
      <p className=" flex-shrink-0 text-neutral-300 font-normal">
        Episode {episode_number}:
      </p>
      <Tooltip title={name} placement="bottom">
        <p
          className={clsx(
            "whitespace-nowrap overflow-ellipsis block font-light  text-sm overflow-hidden",
            currentEpisode === episode_number.toString()
              ? " text-white"
              : "text-neutral-400"
          )}
        >
          {name}
        </p>
      </Tooltip>
    </div>
  );
};

export default Episode;
