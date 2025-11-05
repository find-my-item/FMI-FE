interface CounterProps {
  maxLength?: number;
  isLength?: number;
}

const Counter = ({ maxLength, isLength }: CounterProps) => {
  return (
    <>
      {maxLength && (
        <span>
          {isLength}/{maxLength}
        </span>
      )}
    </>
  );
};

export default Counter;
