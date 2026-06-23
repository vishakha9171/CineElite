const Title = ({ text1, text2 }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100 flex items-center gap-2">
        <span className="text-zinc-400 font-normal">{text1}</span>
        <span className="relative">
          {text2}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff2c55] rounded-full" />
        </span>
      </h1>
    </div>
  );
};

export default Title;