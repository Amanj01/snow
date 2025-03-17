import axios from 'axios';

// get hero componet data from api endpoint 
export const getActiveHomes = async()=> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/homes/active`,{
      next: { revalidate: 3 } 
    });
    return response.data;
  }
  catch(error) {
    return [];
  }
}


// get items data for home page because we have to query showONHomePage from api endpoint
export const getHomeItems = async ()=> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
    return response.data;
  }
  catch(error) {
    return [];
  }
};


// get brand items data for brand page
export const getBrandItems = async ()=> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
    return response.data;
  }
  catch(error) {
    return [];
  }
};

// get all comments data for carousel component
export const getAllComments = async ()=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments`);
    return response.data;
  }
  catch(error){
    return [];
  }
};

// get all comments data for spesfic brand 
export const getCommentsByBrand = async (brandId)=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments?brandId=${brandId}/comments`);
    return response.data;
  }
  catch(error){
    return [];
  }
};

// get all brands data for logo slider component
export const getAllBrands = async ()=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
    });
    return response.data;
  }
  catch(error){
    return {
      data: [],
    }
  }
};

// get specific brand data for brand page
export const getBrand = async(brandId)=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands/${brandId}`);
    return response.data;
  }
  catch(error){
    return [];
  }
}
// get all events data for logo slider component
export const getAllBlogsAndEvents = async (page = 1 , pageSize= 6, prefixLink )=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${prefixLink}`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  }
  catch(error){
    return {
      data: [],
      meta: {
        totalPages: 1
      }
    }
  }
};

// get specific brand data for brand page
export const getBlog = async(blogId)=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`);
    return response.data;
  }
  catch(error){
    return [];
  }
}

// get all events data for logo slider component
export const getAllEvents = async ()=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      params: {
        page: 1,
        pageSize: 6,
      },
    });
    return response.data;
  }
  catch(error){
    return {
      data: [],
      meta: {
        totalPages: 1
      }
    }
  }
};

// get specific brand data for brand page
export const getEvent = async(eventId)=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
    return response.data;
  }
  catch(error){
    return [];
  }
}

// post request to api endpoint to send feedback from contact page
export const postFeedback = async (data)=>{
  try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact-me`, data);
    return response.data;
  }
  catch(error){
    return [];
  }
};

// get all Resources data for resources page
export const getAllResources = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
      params: {
        page,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return {
      data: [],
      meta: {
        totalPages: 1
      }
    };
  }
}

// get specific Resource data for resource page


// get website social media data for footer component
export const getWebSocialMedias = async ()=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/website-socials`);
    return response.data;
  }
  catch(error){
    return [];
  }
}
