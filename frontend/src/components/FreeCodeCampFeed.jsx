import React, { useEffect, useState } from "react";

const FreeCodeCampFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5176/api/articles")
      .then((res) => res.json())
      .then(setArticles)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20" style={{marginTop: '5rem'}}>
      <h1 className="text-sm font-bold mb-4">📰 FreeCodeCamp Articles</h1>
      <ul className="space-y-4" style={{listStyleType: 'none', paddingLeft: '0px'}}>
        {articles.map((article, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-500">{new Date(article.published).toLocaleString()}</p>
            <div
              className="text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreeCodeCampFeed;
