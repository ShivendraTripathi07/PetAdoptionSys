// src/components/Input.jsx
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name} 
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}
