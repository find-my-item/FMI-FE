import { ErrorView } from "@/components/state";

const NotFound = () => {
  return (
    <ErrorView
      iconName="NotFound"
      code="404"
      title="페이지를 찾을 수 없습니다."
      description={
        <>
          존재하지 않는 주소를 입력했거나 <br />
          요청하신 페이지를 사용할 수 없습니다.
        </>
      }
    />
  );
};

export default NotFound;
