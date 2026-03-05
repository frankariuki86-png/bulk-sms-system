export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children }) {
  return <div>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
