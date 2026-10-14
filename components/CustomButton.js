export default function CustomButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-orange-400 transition-colors duration-300 shadow-md"
    >
      {text}
    </button>
  );
}
