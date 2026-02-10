import Icon from "../../Icon/Icon";

const ScrollToTopButton = () => {
  return (
    <button className="glass-card h-[70px] w-[70px] rounded-full bg-fill-brand-subtle-default flex-center">
      <Icon name="ScrollTopArrow" size={32} />
    </button>
  );
};

export default ScrollToTopButton;
