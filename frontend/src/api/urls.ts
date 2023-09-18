import api from "../helper/axios";

export interface URLProp {
  user: string;
  longurl: string;
  shorturl: string;
}

export interface URLReturnProp {
  longUrl: string;
  shortUrl: string;
}

const saveUrl = async (props: URLProp) => {
  const urls = await api.post("http://localhost:8000/api/url", { props });
  return urls;
};

const deleteUrl = async () => {
  const urls = await api.delete("http://localhost:8000/api/url");
  return urls;
};

const getAllUrls = async () => {
  const urls = await api.get("http://localhost:8000/api/url");
  const res: URLReturnProp[] = urls.data;
  return res;
};

export { saveUrl, deleteUrl, getAllUrls };
