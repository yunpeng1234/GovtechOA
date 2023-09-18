import sha256 from "crypto-js/sha256";

export const generateShortenedUrl = (url: string, user: string) => {
  return (
    "short.en/" +
    sha256(url + user)
      .toString()
      .slice(0, 4)
  );
};
