export const Spinner = ({ size = 16, color = "white" }) => {
  return (
    <span
      className={`animate-spin rounded-full border-2 border-t-transparent`}
      style={{
        width: size,
        height: size,
        borderColor: `${color}`,
        borderTopColor: "transparent",
      }}
    />
  );
};
