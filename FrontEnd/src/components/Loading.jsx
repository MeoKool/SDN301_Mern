export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-primary">Loading...</p>
    </div>
  );
}
