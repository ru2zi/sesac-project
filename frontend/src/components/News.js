import React from "react";

const newsData = [
  {
    id: 1,
    title: "첫번째 포스팅 추천",
    summary: "[SESAC] 청년취업사관학교(도봉 캠퍼스) 준비 과정 및 일주일 후기",
    img: 'https://postfiles.pstatic.net/MjAyNDAxMDZfMTU3/MDAxNzA0NTE5Nzc1MDMz.ipwleixvvV2D_MNFlSS1_4wtMm0WcIwXeKbxAIwejRYg.eIOHv3ZWqZXDz4jvhmGuohfK4p92NbTD2WLKweqqPHAg.PNG.inno06039/image.png?type=w773',
    link: "https://blog.naver.com/inno06039/223314262954",
    
  },
  {
    id: 2,
    title: "두번째 포스팅 추천",
    summary: "Etri 랩실? 하계 인턴 2주 해보고 느낀 것들 정리해보기",
    img: `https://postfiles.pstatic.net/MjAyMzA3MTRfMjk4/MDAxNjg5MzM4ODk1NDUx.PPCGbNtZrdQLzjP8tLkv1VA-X_lXSRM1LQQ-8dlmibAg.X5VXW3-BzIbVEkK-z9O2t6jIVHqe_r6ZEsZKh4fBsHAg.PNG.inno06039/image.png?type=w773`,
    link: "https://blog.naver.com/inno06039/223156524687",
  },
];

function News() {
  return (
    <div className="p-4 w-2/3 m-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">추천 포스팅</h2>
      <div>
        {newsData.map((newsItem) => (
          <div
            key={newsItem.id}
            className="mb-8 p-5 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between"
          >
            <div className="flex flex-col">
              <h3 className="text-3xl font-semibold text-white">{newsItem.title}</h3>
              <p className="mt-10 text-white">{newsItem.summary}</p>
              <a
                href={newsItem.link}
                className="text-blue-600 hover:text-blue-800 mt-4"
              >
                Read more
              </a>
            </div>
            <a href={newsItem.link}>
              <img referrerPolicy="no-referrer" src={newsItem.img} alt="News" className="w-[300px] h-[300px] object-contain" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;