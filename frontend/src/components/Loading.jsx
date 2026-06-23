
const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#070a13] text-zinc-400">
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 animate-pulse">
          Loading Cinematic Universe...
        </p>
      </div>
    </div>
  );
};

export default Loading;