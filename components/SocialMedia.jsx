import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const icons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const SocialMedia = ({ socials }) => {
  return (
    <section className="px-2 md:px-4 lg:px-6">
    <div className="h-max container mx-auto">
      <h2 className="text-2xl md:text-5xl uppercase font-mansory text-left">reach us</h2>
      <div className="flex flex-wrap gap-8 mt-6 md:mt-8">
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
    </section>

  );
}

export default SocialMedia;