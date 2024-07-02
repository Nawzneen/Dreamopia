import Image from "next/image";
import loading from "@public/loading.svg"

const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src={loading}
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;