import client from "./client";

const endpoint = "/store/cleaningjobs/";

// Retrieve a list of cleaning job listings
export const getListings = () => client.get(endpoint);

// Add a new cleaning job listing
export const addListing = async (listing, onUploadProgress) => {
  try {
    const formData = {
      title: listing.title,
      unit_price: listing.price,
      customer: 8,
      collection: listing.category.value,
      description: listing.description,
      location: JSON.stringify(listing.location),
    };

    console.log('Data to be posted:', formData);

    // Send POST request to create a new cleaning job
    const response = await client.post(endpoint, formData, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });

    if (response?.data) {
      console.log('Cleaning job created with id:', response.data.id);

      // If there are images, upload them
      if (listing?.images?.length > 0) {
        const imagesData = new FormData();
        listing.images.forEach((image) => imagesData.append("images", image));

        //Send POST request to upload images for the created cleaning job
        const imagesUploadResponse = await client.patch(
          `/store/cleaningjobs/${response.data.id}/images/`,
          imagesData
        );
        console.log('Images uploaded:', imagesUploadResponse.data);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    console.log(error)
  }
};

// Export the functions
export default {
  addListing,
  getListings,
};
