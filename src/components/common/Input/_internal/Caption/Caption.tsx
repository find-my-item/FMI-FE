interface CaptionProps {
  isSuccess?: boolean;
  hasError?: boolean;
  successMessage?: string;
  errorMessage?: string;
  rule?: string;
}

const Caption = ({ isSuccess, hasError, successMessage, errorMessage, rule }: CaptionProps) => {
  const caption = {
    Success: { text: successMessage, color: "text-system-success" },
    Error: { text: errorMessage, color: "text-system-warning" },
    Rule: { text: rule, color: "text-fg-layout-body-default" },
  };
  const state = () => {
    if (isSuccess) {
      return "Success";
    } else {
      return hasError ? "Error" : "Rule";
    }
  };
  const isState = state();

  return <p className={caption[isState].color}>{caption[isState].text}</p>;
};

export default Caption;
