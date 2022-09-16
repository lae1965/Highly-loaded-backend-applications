import './news.module.scss';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface NewsProps {}
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}
let eTag: string | null;
let cashNews: PeaceOfNews[] | null;

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);

  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }

  useEffect(() => {
    (async () => {
      let news;
      try {
        const response = await fetch('http://localhost:3333/api/news', {
          method: 'GET',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          headers: {'If-None-Match': eTag as any}
        });

        if (response.status === 304 && !!cashNews) {   //Not Modified
          news = cashNews;
        } else if (response.ok) {
          eTag = response.headers.get('etag');
          news = await response.json();
          cashNews = [...news];
        } else {
          throw new Error('Что-то пошло не так');
        }
        setNews(sortNews(news));
      } catch(e) {
          console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {news.map(peaceOfNews => {
        return <li key={peaceOfNews.id}>
          <h2>{peaceOfNews.title}</h2>
          <p>{peaceOfNews.description}</p>
          <hr/>
        </li>
      })}
      </ul>
    </div>
  );
}

export default News;
