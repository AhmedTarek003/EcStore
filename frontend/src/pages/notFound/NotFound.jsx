const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-[#363535] overflow-hidden ">
      <div className="relative z-10">
        <div className="text-[380px] text-red-200 opacity-[.7] max-md:text-[150px]">
          404
        </div>
        <div className="absolute bottom-[23%] left-[18%] -z-10 text-5xl text-white uppercase tracking-wider max-md:text-[20px]">
          Page not found
        </div>
      </div>
    </div>
  );
};

export default NotFound;
