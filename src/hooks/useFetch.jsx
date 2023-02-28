//在这个文件中，我们将编写基于特定关键字获取gif特定查询的逻辑
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API; //这会让我们访问API密钥变量

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      //?后面是我们提供的参数,渲染API_KEY,query以空格为分界符,使用join进行连接,limit为1，是因为我们只需要找到一个gif
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      ); //在括号里我们需要输入想要取回的api
      const { data } = await response.json(); //通过查询得到的response数据在这里进行构造
      setGifUrl(data[0]?.images?.downsized_medium?.url); //设置状态
    } catch (error) {
      //演示fetch,如果没有找到新的gif，就启用下面的演示gif作为默认的来进行使用
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  //指定了依赖数组keyword
  //将在关键字更改时调用
  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
