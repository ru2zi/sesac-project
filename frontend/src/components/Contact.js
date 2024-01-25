function Contact() {
  return (
    <div className="p-4 w-3/4 m-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">개발자 프로필</h2>
      <div className="border border-gray-200 rounded-lg p-8">
        <div className="text-center mb-4 text-center">
          <img
            src="https://avatars.githubusercontent.com/u/91187038?v=4"
            alt="Developer"
            className="inline-block rounded-full w-64 h-64"
          />
          <h3 className="text-xl font-semibold mt-2 text-white">김인호</h3>
          <p className="text-white">코드 어려움 </p>
        </div>
        <div className="mb-4 text-center">
          <h4 className="text-lg font-semibold text-white">개발자 소개</h4>
          <p className="text-white">저는 도봉이 입니다. 만나서 반가워요.</p>
        </div>
        <div className="mb-4 text-center">
          <h4 className="text-lg font-semibold text-white">기술 스택</h4>
          <p className="text-white">Python One Tool</p>
        </div>
        <div className="mb-4 text-center">
          <h4 className="text-lg font-semibold text-white">경력</h4>
          <p className="text-white">무직</p>
          <p className="text-white">구직</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white text-center">연락처</h4>
          <p className="text-white text-center">Email: inho06039@gmail.com</p>
          <p className="text-white text-center">github: ru2zi</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
