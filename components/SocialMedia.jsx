import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const icons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const SocialMedia = ({ socials }) => {
  return (
    <div className="mt-8 text-center bg-gray-50 container mx-auto w-screen px-2 ">
      <h2 className="text-2xl md:text-5xl uppercase">Follow Us</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-6 md:mt-8">
        {socials.map(({ id, name, url }) => {
          const Icon = icons[name];
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              {Icon && <Icon size={24} />}
              <span className="capitalize">{name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default SocialMedia;