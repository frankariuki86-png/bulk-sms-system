export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children }) {
  return <div>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`flex gap-4 justify-end mt-6 pt-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
