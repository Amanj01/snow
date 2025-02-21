export const brandData = {
  id: 1,
  name: "EcoFriendly Gear",
  description: "Sustainable outdoor equipment brand",
  heroImage: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  logo: "/logos/eco-logo.png",
  items: [
    {
      id:1,
      name: "Recycled Backpack",
      cardImage: "https://img.freepik.com/free-photo/doctor-suggesting-hospital-program-patient_53876-14807.jpg?t=st=1739995759~exp=1739999359~hmac=8ee582090021e1328a00c3975660174da6d2ee5adc1e5aa9ed0b9b85244dd5fd&w=1060",
      description: "100% recycled material backpack",
      showOnHomepage: true,
      brandId: 1,
      createdAt: "2023-10-15T11:00:00Z",
    },
  ],
  comments: [
    {
      id: 501,
      name: "Sarah Johnson",
      review: "Love their sustainability efforts!",
      showOnHomepage: true,
      brandId: 1,
      createdAt: "2023-10-15T12:00:00Z",
    },
  ],
  resources: [
    {
      id: 1,
      filePath: "https://plum-jori-71.tiiny.site/",
      brandId: 1,
      createdAt: "2023-10-15T13:00:00Z",
    },
  ],
  socials: [
    {
      id: 1,
      name: "Instagram",
      url: "https://instagram.com/eco_gear",
      icon: "/icons/instagram.svg",
      brandId: 1,
      createdAt: "2023-10-15T10:00:00Z",
    },
    {
      id: 2,
      name: "Twitter",
      url: "https://twitter.com/eco_gear",
      icon: "/icons/twitter.svg",
      brandId: 1,
      createdAt: "2023-10-15T10:05:00Z",
    },
  ],
};

export default brandData;
