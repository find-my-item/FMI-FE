const InquiryPrivate = () => {
  return (
    <div className="w-full px-[20px] pt-6">
      <h1 className="mb-6 text-2xl font-bold text-emerald-700">1:1 문의하기</h1>

      <form className="space-y-6">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm text-gray-700">
            문의 카테고리
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded-md border border-gray-300 py-2 focus:outline-none"
          >
            <option value="">선택하세요</option>
            <option value="login">로그인/회원가입</option>
            <option value="board">게시판</option>
            <option value="etc">기타</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="문의 제목을 입력하세요"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
            문의 내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            placeholder="문의 내용을 작성해주세요"
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        <div className="cursor-pointer">
          <label htmlFor="file" className="mb-2 block text-sm font-medium text-gray-700">
            첨부파일 (선택)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-sm file:text-emerald-700 hover:file:bg-emerald-200"
          />
        </div>

        <div className="py-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white shadow transition hover:bg-emerald-700"
          >
            문의 제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryPrivate;
