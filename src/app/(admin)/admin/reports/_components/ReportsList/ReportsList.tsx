const ReportsList = () => {
  return (
    <section aria-label="신고/문의 목록">
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </section>
  );
};

export default ReportsList;
