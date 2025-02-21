import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const icons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const SocialMedia = ({ socials }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Follow Us</h2>
      <div className="flex gap-4 mt-4">
        {socials.map(({ id, platform, url }) => {
          const Icon = icons[platform.toLowerCase()];
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              {Icon && <Icon size={24} />}
              <span className="capitalize">{platform}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default SocialMedia;