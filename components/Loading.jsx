import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold font-mansory text-center mb-2">SNOW</h2>
      <p className="text-gray-600 text-center">
        Loading...
      </p>
      <div className="mt-4 flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

export default Loading;