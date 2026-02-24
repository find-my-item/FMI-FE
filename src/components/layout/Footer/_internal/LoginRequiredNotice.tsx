const LoginRequiredNotice = () => {
  return (
    <div
      role="alert"
      className="animate-float absolute left-1/2 top-[-42px] z-[9999] -translate-x-1/2 select-none"
    >
      <div className="relative rounded-2xl p-[10px] shadow-sm bg-fill-brand-subtle-default_2">
        <p className="whitespace-nowrap text-caption2-semibold text-brand-strongUseThis-hover">
          로그인 후 이용하실 수 있어요
        </p>
        <div
          className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-[6px] border-b-transparent border-l-transparent border-r-transparent border-t-flatGreen-25"
          aria-hidden
        />
      </div>
    </div>
  );
};

export default LoginRequiredNotice;
