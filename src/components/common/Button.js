export default function Button({
  children,
  onClick = () => {},
  className = "",
}) {
  return (
    <button
      className="px-4 py-2 bg-black text-white hover:bg-white hover:text-gray-900 border cursor-pointer border-gray-900 transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
