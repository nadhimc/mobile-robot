const BaseInput = ({ name, label, defaultValue, disabled, type = "text" }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type || "text"}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-300"
      />
    </div>
  );
};

export default BaseInput;
