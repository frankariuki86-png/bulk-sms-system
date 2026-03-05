export function Badge({ children, variant = 'gray' }) {
  const variants = {
    gray: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-warning text-orange-800',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
