"use client";

const ImageGridLoader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
      {
        Array.from({ length: 8 }).map((_, i) => (
            <div
                key={i}
                className="relative w-full aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
            </div>
        ))
      }
    </div>
  );
};

export default ImageGridLoader;