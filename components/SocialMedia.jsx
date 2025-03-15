import Image from "next/image";
import Link from "next/link";

const SocialMedia = ({ socials }) => {
  return (
    <section className="px-2 md:px-4 lg:px-6">
    <div className="h-max container mx-auto">
      <h2 className="text-2xl md:text-5xl uppercase font-mansory text-left">reach us</h2>
      <div className="flex flex-wrap gap-8 mt-6 md:mt-8">
        {socials.map(({ icon , name, url } , index) => {
          return (
            <Link
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col space-y-2 text-gray-700 hover:text-blue-600"
            >
              <Image src={process.env.NEXT_PUBLIC_API_URL+icon} alt={name} width={35} height={35} />
              <span className="capitalize">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
    </section>

  );
}

export default SocialMedia;