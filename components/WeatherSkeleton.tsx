import Container from "./Container";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}

export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <div className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="h-10 w-64" />
        </div>
      </div>

      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <SkeletonBlock className="h-8 w-64" />

            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 gap-2">
                <SkeletonBlock className="h-12 w-28" />
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-20" />
              </div>

              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <SkeletonBlock className="h-3 w-12" />
                    <SkeletonBlock className="h-8 w-8 rounded-full" />
                    <SkeletonBlock className="h-3 w-10" />
                  </div>
                ))}
              </div>
            </Container>
          </div>

          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center gap-3">
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-12 w-12 rounded-full" />
            </Container>

            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 py-1">
                  <SkeletonBlock className="h-3 w-16" />
                  <SkeletonBlock className="h-8 w-8 rounded-full" />
                  <SkeletonBlock className="h-3 w-14" />
                </div>
              ))}
            </Container>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4">
          <SkeletonBlock className="h-8 w-44" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Container key={index} className="gap-4 px-4 py-6">
              <div className="flex items-center gap-6 w-full">
                <div className="flex flex-col gap-2 items-center">
                  <SkeletonBlock className="h-8 w-8 rounded-full" />
                  <SkeletonBlock className="h-3 w-20" />
                  <SkeletonBlock className="h-3 w-16" />
                </div>

                <div className="flex flex-col gap-2">
                  <SkeletonBlock className="h-10 w-24" />
                  <SkeletonBlock className="h-3 w-28" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>

                <div className="ml-auto grid grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((__, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col items-center gap-2">
                      <SkeletonBlock className="h-3 w-14" />
                      <SkeletonBlock className="h-6 w-6 rounded-full" />
                      <SkeletonBlock className="h-3 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          ))}
        </section>
      </main>
    </div>
  );
}
