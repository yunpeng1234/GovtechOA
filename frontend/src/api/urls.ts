import api from "../helper/axios";

export interface URLProp {
  user: string;
  longurl: string;
  shorturl: string;
}

export interface URLReturnProp {
  originalURL: string;
  shortenURL: string;
}

const saveUrl = async (props: URLProp) => {
  try {
    const urls = await api.post("http://localhost:8000/api/url", {
      originalURL: props.longurl,
      shortenURL: props.shorturl,
    });
    return urls.status;
  } catch (e) {
    console.log(e);
  }
};

const deleteUrl = async () => {
  const urls = await api.delete("http://localhost:8000/api/url");
  return urls;
};

const getAllUrls = async () => {
  const urls = await api.get("http://localhost:8000/api/url");
  const res: { data: URLReturnProp[] } = urls.data;
  return res.data;
};

export { saveUrl, deleteUrl, getAllUrls };
