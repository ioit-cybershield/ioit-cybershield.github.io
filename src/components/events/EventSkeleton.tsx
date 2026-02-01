// components/events/EventsSkeleton.tsx
export default function EventsSkeleton() {
  return (
    <section
      className="w-full bg-f5f5f3"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-12 pt-16 md:pt-20 pb-16 space-y-6">
        {/* Hero skeleton */}
        <div className="py-8 md:py-10 border-y-2 border-1a1a1a bg-[#f7f7f5] animate-pulse">
          <div className="w-full h-[180px] md:h-[240px] bg-e5e5e5 mb-5" />
          <div className="max-w-3xl mx-auto text-center px-4 space-y-4">
            <div className="h-9 md:h-10 bg-e5e5e5 mx-auto rounded" />
            <div className="h-3 bg-e5e5e5 mx-auto rounded w-24" />
            <div className="h-12 bg-e5e5e5 mx-auto rounded w-full" />
          </div>
        </div>

        {/* Card skeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-b-2 border-1a1a1a/80 bg-[#f8f8f6] py-6 md:py-7 animate-pulse"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <div className="md:col-span-6 aspect-[16/9] bg-e5e5e5" />
              <div className="md:col-span-6 flex flex-col justify-center gap-3">
                <div className="h-3 bg-e5e5e5 rounded w-16" />
                <div className="h-7 bg-e5e5e5 rounded w-11/12" />
                <div className="h-3 bg-e5e5e5 rounded w-32" />
                <div className="h-10 bg-e5e5e5 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
