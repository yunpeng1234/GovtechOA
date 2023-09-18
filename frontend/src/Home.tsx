import React, { useContext, useState } from "react";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { URLReturnProp, getAllUrls, saveUrl } from "./api/urls";
import { AuthContext } from "./context/AuthContext";
import { generateShortenedUrl } from "./helper/generateShort";

const saveShortenedUrl = async (
  user: string,
  longurl: string,
  shorturl: string
) => {
  const resp = await saveUrl({ user, longurl, shorturl });
  console.log(resp);
};

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [shortend, setShortended] = useState("");
  const [url, setUrl] = useState("");

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };
  const listOfUrls = useQuery({
    queryFn: getAllUrls,
    queryKey: [],
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div> Url To Shorten </div>
      <div className="flex">
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={url}
        />
        <Button
          type="primary"
          onClick={() => {
            const res = generateShortenedUrl(user, url);
            setShortended(res);
          }}
        >
          Shorten!
        </Button>
        <a href={"//".concat(url)}>{shortend}</a>
      </div>
      <Button
        type="primary"
        onClick={() => {
          saveShortenedUrl(user, url, shortend);
        }}
        disabled={shortend === ""}
      >
        Save Me
      </Button>
      <div className="flex flex-col">
        {listOfUrls?.data?.map((x: URLReturnProp, index: number) => {
          return (
            <a key={index} href={"//".concat(x.originalURL)}>
              {x.shortenURL}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
