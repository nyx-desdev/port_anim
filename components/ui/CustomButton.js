// Custom Button Component
const CustomButton = ({ children, ...props }) => {
  return (
    <a
      {...props}
      className="inline-block bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
    >
      {children}
    </a>
  );
};
export default CustomButton;
