const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
