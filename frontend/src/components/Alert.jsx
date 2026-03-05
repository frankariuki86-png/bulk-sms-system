export function Alert({ type = 'info', title, message, onClose }) {
  const types = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-warning bg-orange-50 border-warning border-orange-200 text-orange-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`p-4 rounded-lg border ${types[type]} flex justify-between items-start`}>
      <div>
        {title && <h3 className="font-medium">{title}</h3>}
        {message && <p className="text-sm mt-1">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-lg leading-none opacity-50 hover:opacity-75">
          ×
        </button>
      )}
    </div>
  );
}
