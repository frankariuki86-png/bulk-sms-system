export function Input({
  label,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <input
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
          error ? 'border-danger' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
}
