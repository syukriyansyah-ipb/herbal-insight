const CardLoading = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 space-y-3 md:space-y-5 animate-pulse">
      <div className="h-48 w-full object-cover rounded-lg flex justify-center items-center bg-gray-200" />
      <div className="h-2 bg-gray-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-gray-200 rounded col-span-2"></div>
          <div className="h-2 bg-gray-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default function CardSkeleton() {
  return (
    <>
      <CardLoading />
      <CardLoading />
      <CardLoading />
      <CardLoading />
    </>
  );
}
