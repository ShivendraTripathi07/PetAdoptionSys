export default function Button({ text, onClick, type = "button", loading }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex justify-center items-center"
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
      ) : (
        text
      )}
    </button>
  );
}
