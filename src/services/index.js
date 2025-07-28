import axios from 'axios';
import http from './http';
import { format } from 'date-fns';

// -----------IMAGE FILES API---------

export const singleDeleteFileDigitalOcean = async (id) => {
  console.log("HTTPS -->" , id)
  const { data } = await http.delete(`/deletefile?fileName=${id}`);
  return data;
};






export const register = async (payload) => {
  const { data } = await http.post(`/auth/register`, payload);
  return data;
};
export const verifyOTP = async (payload) => {
  const { data } = await http.post(`/auth/verify-otp`, payload);
  return data;
};
export const resendOTP = async (payload) => {
  const { data } = await http.post(`/auth/resend-otp`, payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await http.post(`/auth/login`, payload);
  return data;
};

export const forgetPassword = async (payload) => {
  const { data } = await http.post('/auth/forget-password', payload);
  return data;
};

export const resetPassword = async ({ newPassword, token }) => {
  const { data } = await http.post('/auth/reset-password', {
    newPassword: newPassword,
    token: token  // Backend expects 'otp' instead of 'token'
  });
  return data;
};

export const adminDashboardAnalytics = async () => {
  const { data } = await http.get(`/admin/dashboard-analytics`);
  return data;
};
export const getNotifications = async (page) => {
  const { data } = await http.get(`/admin/notifications?limit=${page}`, {});
  return data;
};

export const getBrandsByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/brands?search=${search}&page=${page}`);
  return data;
};
export const getBrandByAdmin = async (id) => {
  const { data } = await http.get(`/admin/brands/${id}`);
  return data;
};
export const getAllBrandsByAdmin = async () => {
  const { data } = await http.get(`/admin/all-brands`);
  return data;
};
export const addBrandByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/brands`, payload);
  return data;
};
export const updateBrandByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/brands/${currentSlug}`, payload);
  return data;
};
export const deleteBrandByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/brands/${slug}`);
  return data;
};

export const getCategoriesByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/categories?search=${search}&page=${page}`);
  return data;
};
export const getCategoryByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/categories/${slug}`);
  return data;
};
export const deleteCategoryByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/categories/${slug}`);
  return data;
};
export const addCategoryByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/categories`, payload);
  return data;
};
export const updateCategoryByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/categories/${currentSlug}`, payload);
  return data;
};
export const getAllCategoriesByAdmin = async () => {
  const { data } = await http.get(`/admin/all-categories`);
  return data;
};

export const getSubCategoryByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/subcategories/${slug}`);
  return data;
};
export const getSubCategoriesByAdmin = async (params) => {
  const { data } = await http.get(`/admin/subcategories?${params}`);
  return data;
};
export const deleteSubCategoryByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/subcategories/${slug}`);
  return data;
};
export const addSubCategoryByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/subcategories`, payload);
  return data;
};
export const updateSubCategoryByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/subcategories/${currentSlug}`, payload);
  return data;
};

export const getProductsByAdmin = async (params) => {
  const { data: response } = await http.get(`/admin/products?${params}`);
  return response;
};
export const createProductByAdmin = async (payload) => {
  const { data: response } = await http.post(`/admin/products`, payload);
  return response;
};





export const updateProductByAdmin = async ({ currentSlug, ...payload }) => {
  console.log('PAYLOAd', payload);
  const { data: response } = await http.put(`/admin/products/${currentSlug}`, payload);
  return response;
};

export const deleteProductByAdmin = async (slug) => {
  const { data: response } = await http.delete(`/admin/products/${slug}`);
  return response;
};

export const getOrdersByAdmin = async (payload) => {
  const { data } = await http.get(`/admin/orders?${payload}`);
  return data;
};
export const getOrderByAdmin = async (id) => {
  const { data } = await http.get(`/admin/orders/${id}`);
  return data;
};
export const deleteOrderByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/orders/${id}`);
  return data;
};
export const updateOrderStatus = async ({ id, ...payload }) => {
  const { data } = await http.put(`/admin/orders/${id}`, payload);
  return data;
};
export const getUserByAdminsByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/users?search=${search}&page=${page}`);
  return response;
};


//admin/users-for-search
export const getAllUsersForSearchByAdmin = async () => {
  const { data: response } = await http.get(`/admin/users-for-search`);
  return response;
};


export const getAllUsersByAdminNoPagination = async () => {
  const { data: response } = await http.get(`/admin/users-all`);
  return response;
};


//delete user by admin
export const deleteUserByAdmin = async (id) => {
  const { data: response } = await http.delete(`/admin/users/${id}`);
  return response;
};


export const getUserByAdmin = async (id) => {
  const { data: response } = await http.get(`/admin/users/${id}`);
  return response;
};
export const updateUserRoleByAdmin = async (id) => {
  const { data: response } = await http.post(`/admin/users/role/${id}`);
  return response;
};

export const getCouponCodesByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/coupon-codes?search=${search}&page=${page}`);
  return response;
};

export const getCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.get(`/admin/coupon-codes/${id}`);
  return response;
};

export const addCouponCodeByAdmin = async (payload) => {
  const { data: response } = await http.post(`/admin/coupon-codes`, payload);
  return response;
};
export const updateCouponCodeByAdmin = async ({ currentId, ...others }) => {
  const { data: response } = await http.put(`/admin/coupon-codes/${currentId}`, others);
  return response;
};
export const deleteCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.delete(`/admin/coupon-codes/${id}`);
  return response;
};

export const getNewsletter = async (page) => {
  const { data } = await http.get(`/admin/newsletter?page=${page}`);
  return data;
};
export const getShopDetailsByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/shops/${slug}`);
  return data;
};
export const addAdminShopByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/shops`, payload);
  return data;
};
export const updateAdminShopByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/shops/${currentSlug}`, payload);
  return data;
};
export const deleteShop = async (slug) => {
  const { data: response } = await http.delete(`/admin/shops/${slug}`);
  return response;
};
export const getLowStockProductsByAdmin = async (page) => {
  const { data: response } = await http.get(`/admin/low-stock-products?page=${page}`);
  return response;
};
export const getShopsByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/shops?search=${search}&page=${page}`);
  return response;
};
export const getShopIncomeByAdmin = async (slug, page) => {
  const { data } = await http.get(`/admin/shops/${slug}/income?page=${page || 1}`);

  return data;
};
export const getIncomeDetailsByAdmin = async (pid, page) => {
  const { data } = await http.get(`/admin/payments/${pid}?page=${page || 1}`);
  return data;
};
export const editPaymentByAdmin = async ({ pid, ...payload }) => {
  const { data } = await http.put(`/admin/payments/${pid}`, { ...payload });
  return data;
};
export const createPaymentByAdmin = async ({ ...payload }) => {
  const { data } = await http.post(`/admin/payments`, { ...payload });
  return data;
};
export const getPayoutsByAdmin = async (params) => {
  const { data } = await http.get(`/admin/payouts?${params}`);
  return data;
};
export const getAllShopsByAdmin = async () => {
  const { data } = await http.get(`/admin/all-shops`);
  return data;
};
export const getCurrenciesByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/currencies?page=${page || 1}&search=${search || ''}`);
  return data;
};
export const addCurrencyByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/currencies`, payload);
  return data;
};
export const updateCurrencyByAdmin = async ({ _id, ...others }) => {
  const { data } = await http.put(`/admin/currencies/${_id}`, others);
  return data;
};
export const getCurrencyByAdmin = async (cid) => {
  const { data } = await http.get(`/admin/currencies/${cid}`);
  return data;
};
export const getCompaignsByAdmin = async (page, search) => {
  const { data } = await http.get(`/admin/compaigns?page=${page || 1}&search=${search || ''}`);
  return data;
};
export const addCompaignByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/compaigns`, payload);
  return data;
};
export const updateCompaignByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/compaigns/${currentSlug}`, payload);
  return data;
};
export const getCompaignByAdmin = async (slug) => {
  const { data } = await http.get(`/admin/compaigns/${slug}`);
  return data;
};
export const deleteCompaignByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/compaigns/${slug}`);
  return data;
};

export const getVendorProductBySlug = async (slug) => {
  const { data } = await http.get(`/vendor/products/${slug}`);
  return data;
};
export const getVendorShop = async () => {
  const { data } = await http.get(`/vendor/shop`);
  return data;
};
export const vendorDashboardAnalytics = async () => {
  const { data } = await http.get(`/vendor/dashboard-analytics`);
  return data;
};
export const getVendorLowStockProducts = async (page) => {
  const { data: response } = await http.get(`/vendor/low-stock-products?page=${page}`);
  return response;
};
export const getVendorProducts = async (page, search) => {
  const { data: response } = await http.get(`/vendor/products?search=${search}&page=${page}`);
  return response;
};
export const deleteVendorProduct = async (slug) => {
  const { data: response } = await http.delete(`/vendor/products/${slug}`);
  return response;
};
export const createVendorProduct = async (payload) => {
  const { data: response } = await http.post(`/vendor/products`, payload);
  return response;
};
export const updateVendorProduct = async ({ currentSlug, ...payload }) => {
  const { data: response } = await http.put(`/vendor/products/${currentSlug}`, payload);
  return response;
};
export const getOrdersByVendor = async (payload) => {
  const { data } = await http.get(`/vendor/orders?${payload}`);
  return data;
};
export const addShopByVendor = async (payload) => {
  const { data } = await http.post(`/vendor/shops`, payload);
  return data;
};
export const updateShopByVendor = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/vendor/shops/${currentSlug}`, payload);
  return data;
};
export const getShopDetailsByVendor = async () => {
  const { data } = await http.get(`/vendor/shop/stats`);
  return data;
};
export const getIncomeByVendor = async (slug, page) => {
  const { data } = await http.get(`/vendor/shops/income?page=${page || 1}`);
  return data;
};

export const getProducts = async (query = '', cat, rate) => {
  const { data } = await http.get(`/products${query || '?'}&rate=${rate}`);
  return data;
};
export const getProductDetails = async (pid) => {
  const { data } = await http.get(`/products/${pid}`);
  return data;
};

export const getProductsByCategory = async (query = '', category, rate) => {
  const { data } = await http.get(`/category/products/${category}${query || '?'}&rate=${rate}`);
  return data;
};
export const getProductsByCompaign = async (query = '', slug, rate) => {
  const { data } = await http.get(`/compaign/products/${slug}${query || '?'}&rate=${rate}`);
  return data;
};

export const getProductSlugs = async () => {
  const { data } = await http.get(`/products-slugs`);
  return data;
};
export const getProductsBySubCategory = async (query = '', subcategory, rate) => {
  const { data } = await http.get(`/subcategory/products/${subcategory}${query || '?'}&rate=${rate}`);
  return data;
};

export const getProductsByShop = async (query = '', shop, rate) => {
  const { data } = await http.get(`/shop/products/${shop}${query || '?'}&rate=${rate}`);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await http.get(`/products/all`);
  return data;
};
export const getAllFilters = async () => {
  const { data } = await http.get(`/products/filters`);
  return data;
};

export const getNewProducts = async () => {
  const { data } = await http.get(`/products/new`);
  return data;
};
export const getFiltersByShop = async (shop) => {
  const { data } = await http.get(`/filters/${shop}`);
  return data;
};

export const getNewArrivels = async () => {
  const { data } = await http.get('/new-arrivals');
  return data;
};
export const getRelatedProducts = async (pid) => {
  const { data } = await http.get(`/related-products/${pid}`);
  return data;
};
export const getProductBySlug = async (slug) => {
  const { data } = await http.get(`/products/${slug}`);
  return data;
};

export const getProductReviews = async (pid) => {
  const { data } = await http.get(`/reviews/${pid}`);
  return data;
};
export const addReview = async (payload) => {
  const { data } = await http.post(`/reviews`, payload);
  return data;
};

export const getUserInvoice = async (page) => {
  const { data: response } = await http.get(`/users/invoice${page}`);
  console.log('responmse--->', response);
  return response;
};

export const updateProfile = async ({ ...payload }) => {
  const { data } = await http.put(`/users/profile`, payload);
  return data;
};
export const changePassword = async ({ ...payload }) => {
  const { data } = await http.put(`/users/change-password`, payload);
  return data;
};

export const getAddress = async (payload) => {
  const { data } = await http.get(`/users/addresses?id=${payload}`);
  return data;
};
export const updateAddress = async ({ _id, ...payload }) => {
  const { data } = await http.put(`/users/addresses/${_id}`, payload);
  return data;
};
export const createAddress = async ({ ...payload }) => {
  const { data } = await http.post(`/users/addresses/`, payload);
  return data;
};
export const deleteAddress = async ({ _id }) => {
  const { data } = await http.delete(`/users/addresses/${_id}`);
  return data;
};
export const search = async (payload) => {
  const { data } = await http.post(`/search`, payload);
  return data;
};
export const getSearchFilters = async () => {
  const { data } = await http.get(`/search-filters`);
  return data;
};
export const getInvoices = async () => {
  const { data } = await http.get(`/users/invoice`);
  return data;
};
export const placeOrder = async (payload) => {
  const { data } = await http.post(`/orders`, payload);
  return data;
};
export const getLayout = async () => {
  const { data } = await http.get(`/layout`);
  return data;
};
export const singleDeleteFile = async (id) => {
  const { data } = await http.delete(`/delete-file/${id}`);
  return data;
};

export const sendNewsletter = async (payload) => {
  const { data } = await http.post(`/newsletter`, payload);
  return data;
};

export const getWishlist = async () => {
  const { data } = await http.get(`/wishlist`);
  return data;
};
export const updateWishlist = async (pid) => {
  const { data } = await http.post(`/wishlist`, { pid });
  return data;
};
export const getCompareProducts = async (products) => {
  const { data } = await http.post(`/compare/products`, { products });
  return data;
};

export const getProfile = async () => {
  const { data } = await http.get(`/users/profile`);
  return data;
};

export const getCart = async (ids) => {
  const { data } = await http.post(`/cart`, {
    products: ids
  });
  return data;
};

export const getAllCategories = async () => {
  const { data } = await http.get(`/all-categories`);
  return data;
};
export const getHomeCategories = async () => {
  const { data } = await http.get(`/home/categories`);
  return data;
};

export const getHomeShops = async () => {
  const { data } = await http.get(`/shops?limit=5`);
  return data;
};
export const getHomeCompaigns = async () => {
  const { data } = await http.get(`/compaigns`);
  return data;
};
export const getBestSellingProducts = async () => {
  const { data } = await http.get(`/home/products/best-selling`);
  return data;
};
export const getFeaturedProducts = async () => {
  const { data } = await http.get(`/home/products/featured`);
  return data;
};

export const getTopRatedProducts = async () => {
  const { data } = await http.get(`/home/products/top`);
  return data;
};
export const getHomeBrands = async () => {
  const { data } = await http.get(`/home/brands`);
  return data;
};
export const getBrands = async () => {
  const { data } = await http.get(`/brands`);
  return data;
};


export const applyCouponCode = async (code) => {
  const { data: response } = await http.get(`/coupon-codes/${code}`);
  return response;
};

export const paymentIntents = async (amount, currency) => {
  const { data } = await http.post(`/payment-intents`, {
    amount,
    currency
  });
  return data;
};

export const addShopByUser = async (payload) => {
  const { data } = await http.post(`/shops`, {
    ...payload
  });

  return data;
};
export const getShopByUser = async () => {
  const { data } = await http.get(`/user/shop`);
  return data;
};

export const getShops = async () => {
  const { data } = await http.get(`/shops`);
  return data;
};
export const getAllCategoriesByUser = async () => {
  const { data } = await http.get(`/all-categories`);
  return data;
};

export const getCurrencies = async () => {
  const { data } = await http.get(`/currencies`);
  return data;
};
export const getCategoryTitle = async (category) => {
  const { data } = await http.get(`/category-title/${category}`);
  return data;
};

export const getCategoryBySlug = async (category) => {
  const { data } = await http.get(`/categories/${category}`);
  return data;
};

export const getCategorySlugs = async () => {
  const { data } = await http.get(`/categories-slugs`);
  return data;
};
export const getShopSlugs = async () => {
  const { data } = await http.get('/shops-slugs');
  return data;
};
export const getShopBySlug = async (shop) => {
  const { data } = await http.get(`/shops/${shop}`);
  return data;
};
export const getShopTitle = async (shop) => {
  const { data } = await http.get(`/shop-title/${shop}`);
  return data;
};

export const getSubCategoryTitle = async (subcategory) => {
  const { data } = await http.get(`/subcategory-title/${subcategory}`);
  return data;
};
export const getSubCategoryBySlug = async (subcategory) => {
  const { data } = await http.get(`/subcategories/${subcategory}`);
  return data;
};

export const getSubCategorySlugs = async () => {
  const { data } = await http.get(`/subcategories-slugs`);
  return data;
};

export const getCompaignSlugs = async () => {
  const { data } = await http.get('/compaigns-slugs');
  return data;
};
export const getCompaignBySlug = async (slug) => {
  const { data } = await http.get(`/compaigns/${slug}`);
  return data;
};
export const getCompaignTitle = async (slug) => {
  const { data } = await http.get(`/compaign-title/${slug}`);
  return data;
};

export const followShop = async (shopId) => {
  const { data } = await http.put(`/shops/${shopId}/follow`);
  return data;
};
// export const contactUs = async (payload) => {
//   const { data } = await http.post(`/contact-us`, payload);
//   return data;
// };

// ----------------🔶️🔷️🔶️ CITIES API 🔶️🔷️🔶️ -----------

export const getCitiesByVendor = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/vendor/cities?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

export const getAllCitiesByVendor = async () => {
  const { data } = await http.get(`/vendor/allcities/all-cities`);

  return data;
};

export const getCityByVendor = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/vendor/cities/${slug}`);
  return data;
};

export const addCityByVendor = async (payload) => {
  const { data } = await http.post(`/vendor/city`, payload);
  return data;
};
export const updateCityByVendor = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/vendor/city/${currentSlug}`, payload);
  return data;
};

export const deleteCityByVendor = async (slug) => {
  const { data } = await http.delete(`/vendor/city/${slug}`);
  return data;
};



// CITIES ADMIN

export const getCitiesByAdmin = async (page, search , limit ,sort) => {
  const { data } = await http.get(`/admin/cities?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

export const getAllCitiesByAdmin = async () => {
  const { data } = await http.get(`/admin/citiesnopagination`);

  return data;
};

export const addCityByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/city`, payload);
  return data;
};

export const updateCityByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/city/${currentSlug}`, payload);
  return data;
};


// ----------------🔶️🔷️🔶️POSTALS API 🔶️🔷️🔶️ -----------

export const getPostalsByVendor = async (page, search ,limit ,sort,city) => {
  const { data } = await http.get(`/vendor/postals?search=${search}&page=${page}&limit=${limit}&sort=${sort}&city=${city}`);
  return data;
};


export const getPostalByVendor = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/vendor/postal/${slug}`);
  return data;
};

export const addPostalByVendor = async (payload) => {
  const { data } = await http.post(`/vendor/postal`, payload);
  return data;
};
export const updatePostalByVendor = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/vendor/postal/${currentSlug}`, payload);
  return data;
};

export const deletePostalByVendor = async (slug) => {
  const { data } = await http.delete(`/vendor/postal/${slug}`);
  return data;
};



export const getCitiesWithPostalsFormat = async () => {
  const { data } = await http.get(`/admin/formatedpostals`);
  return data;
};



// Admin postals


export const getPostalsByAdmin = async (page, search ,limit ,sort,city) => {
  const { data } = await http.get(`/admin/postals?search=${search}&page=${page}&limit=${limit}&sort=${sort}&city=${city}`);
  return data;
};

export const getPostalByAdmin = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/postal/${slug}`);
  return data;
};

export const addPostalByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/postal`, payload);
  return data;
};
export const updatePostalByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/postal/${currentSlug}`, payload);
  return data;
};

//postalsnopagination

export const getPostalsNoPaginationByAdmin = async () => {
  const { data } = await http.get(`/admin/postalsnopagination`);
  return data;
};


// ----------------🔶️🔷️🔶️ BoilerTypes API 🔶️🔷️🔶️ -----------

export const getBoilersType = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/boilers?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// /vendor/productboiler/vendorfrontend
export const getBoilerBySlugVendorFrontend = async (slug) => {
  const { data } = await http.get(`/vendor/productboiler/vendorfrontend/${slug}`);
  return data;
};

//router.get('/vendor/boilers-library', boiler.getBoilersInLibrary);
export const getBoilersInLibrary = async (brand, fuelType, boilerType) => {
  const { data } = await http.get(`/vendor/boilers-library?brand=${brand}&fuelType=${fuelType}&boilerType=${boilerType}`);
  return data;
};


//clone boiler /vendor/boiler/clone
export const cloneBoilerFromLibrary = async (payload) => {
  const { data } = await http.post(`/vendor/boiler/clone`, payload);
  return data;
};



// get boliler types no pagination

export const getBoilersTypeNoPagination = async () => {
  const { data } = await http.get(`/admin/boilertypespagination`);
  return data;
};


export const getBoilerType = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/boiler/${slug}`);
  return data;
};

export const addBoilerTypeByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/boiler`, payload);
  return data;
};
export const updateBoilerTypeByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/boiler/${currentSlug}`, payload);
  return data;
};

export const deleteBoilerTypeByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/boiler/${slug}`);
  return data;
};

// ----------------🔶️🔷️🔶️ Sizes API 🔶️🔷️🔶️ -----------

export const getSizes = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/admin/sizes?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

export const getSize = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/size/${slug}`);
  return data;
};

export const addSizeByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/size`, payload);
  return data;
};
export const updateSizeByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/size/${currentSlug}`, payload);
  return data;
};

export const deleteSizeByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/size/${slug}`);
  return data;
};



// formated sizes with sizeoptions for add product


export const getFormatedSizes = async () => {
  const { data } = await http.get(`/admin/sizeformat`);
  return data;
};



// ----------------🔶️🔷️🔶️ Fuels API 🔶️🔷️🔶️ -----------

export const getFuels = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/admin/fuels?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

//get all no pagination

export const getFuelsNoPagination = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/admin/fuelsnopag`);
  return data;
};




export const getFuel = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/fuel/${slug}`);
  return data;
};

export const addFuelByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/fuel`, payload);
  return data;
};
export const updateFuelByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/fuel/${currentSlug}`, payload);
  return data;
};

export const deleteFuelByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/fuel/${slug}`);
  return data;
};

// ----------------🔶️🔷️🔶️ DependencesType API 🔶️🔷️🔶️ -----------

export const getDependenceTypes = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/dependencetypes?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

//dependencetypesnopagination
export const getAllDependenceTypes = async (page, search) => {
  const { data } = await http.get(`/admin/dependencetypesnopagination`);
  return data;
};

export const getDependencetype = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/dependencetype/${slug}`);
  return data;
};

export const addDependenceTypByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/dependencetype`, payload);
  return data;
};
export const updateDependenceTypeByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/dependencetype/${currentSlug}`, payload);
  return data;
};

export const deleteDependenceTypeByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/dependencetype/${slug}`);
  return data;
};

// ----------------🔶️🔷️🔶️ DependencesType API 🔶️🔷️🔶️ -----------

export const getDependences = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/dependences?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

//dependencetynopagination
export const getAllDependenceNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/dependencenopagination`);
  return data;
};

export const getDependence = async (slug) => {
  console.log(' SLUG -->', slug);
  const { data } = await http.get(`/admin/dependence/${slug}`);
  return data;
};
//

export const getDependencesNoPa = async (slug) => {
  console.log(' SLUG -->', slug);
  const { data } = await http.get(`/admin/dependence/${slug}`);
  return data;
};

export const addDependenceByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/dependence`, payload);
  return data;
};
export const updateDependenceByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/dependence/${currentSlug}`, payload);
  return data;
};

export const deleteDependenceByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/dependence/${slug}`);
  return data;
};





// ----------------🔶️🔷️🔶️ BoilerOption API 🔶️🔷️🔶️ -----------

export const getBoilerOptions = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/boileroptions?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllBoilerOptionsNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/boileroptionsnopagination`);
  return data;
};

export const getBoilerOption = async (slug) => {
  console.log(' SLUG --> GET BOILER OPTION', slug);
  const { data } = await http.get(`/admin/boileroption/${slug}`);
  return data;
};

export const addBoilerOptionByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/boileroption`, payload);
  return data;
};
export const updateBoilerOptionByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/boileroption/${currentSlug}`, payload);
  return data;
};

export const deleteBoilerOptionByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/boileroption/${slug}`);
  return data;
};

// ----------------🔶️🔷️🔶️ SizeOption API 🔶️🔷️🔶️ -----------

export const getSizeOptions = async (page, search,limit , sort) => {
  const { data } = await http.get(`/admin/sizeoptions?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllSizeOptionsNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/sizeoptionsnopagination`);
  return data;
};

export const getSizeOption = async (slug) => {
  console.log(' SLUG --> GET BOILER OPTION', slug);
  const { data } = await http.get(`/admin/sizeoption/${slug}`);
  return data;
};

export const addSizeOptionByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/sizeoption`, payload);
  return data;
};
export const updateSizeOptionByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/sizeoption/${currentSlug}`, payload);
  return data;
};

export const deleteSizeOptionByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/sizeoption/${slug}`);
  return data;
};





// ----------------🔶️🔷️🔶️ QUESTIONS API 🔶️🔷️🔶️ -----------

export const getQuestions = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/questions?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllQuestionsNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/questionsnopagination`);
  return data;
};

export const getQuestion = async (slug) => {
  console.log(' SLUG --> GET  Question', slug);
  const { data } = await http.get(`/admin/question/${slug}`);
  return data;
};

export const addQuestionAdmin = async (payload) => {
  const { data } = await http.post(`/admin/question`, payload);
  return data;
};
export const updateQuestionByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/question/${currentSlug}`, payload);
  return data;
};

export const deleteQuestionByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/question/${slug}`);
  return data;
};


// main questions only add edit question

export const getAllMainQuestions = async (page, search) => {
  const { data } = await http.get(`/admin/questionsmain`);
  return data;
};




// ----------------🔶️🔷️🔶️ Prices API 🔶️🔷️🔶️ -----------

export const getPrices = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/prices?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  console.log("PRICES --->" , data)
  return data;
};

// boileroptionpagination
export const getAllPricesNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/pricesnopagination`);
  return data;
};


// all main prices parents no pagination pricemainnopagination

export const getAllMainPricesNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/pricemainnopagination`);
  return data;
};

//admin/pricewithparent
export const getAllPricesWithParent = async (page, search) => {
  const { data } = await http.get(`/admin/pricewithparent`);
  return data;
};

//admin/questiontwodropdown
export const getQuestionsTargetDropdown = async () => {
  const { data } = await http.get(`/admin/questiontwo-dropdown`);
  return data;
};


export const getPrice = async (slug) => {
  console.log(' SLUG --> GET  PRICE', slug);
  const { data } = await http.get(`/admin/price/${slug}`);
  return data;
};

export const addPriceAdmin = async (payload) => {
  const { data } = await http.post(`/admin/price`, payload);
  return data;
};
export const updatePriceByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/price/${currentSlug}`, payload);
  return data;
};

export const deletePriceByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/price/${slug}`);
  return data;
};


//Prices format

export const getPricesFormat = async () => {
  
  const { data } = await http.get(`/admin/priceformat`);
  return data;
};



// ----------------🔶️🔷️🔶️ Boilers PRODUCTS API 🔶️🔷️🔶️ -----------

export const getProductBoilers = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/productboilers?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};


// no pagination /admin/productboilersnopagination
export const getProductBoilersNoPagination = async () => {
  const { data } = await http.get(`/admin/productboilersnopagination`);
  return data;
};



export const getProductBoiler = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/productboiler/${slug}`);
  return data;
};

export const addProductBoilerByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/productboiler`, payload);
  return data;
};


//admin/productboilerwithoutshop without shop for admin only

export const addProductBoilerWithoutShopByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/productboilerwithoutshop`, payload);
  return data;
};



export const updateProductBoilerByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/productboiler/${currentSlug}`, payload);
  return data;
};

export const deleteProductBoilerByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/productboiler/${slug}`);
  return data;
};






// ----------------🔶️🔷🔶️ ADDONS CATEGORIES API 🔶️🔷🔶️ -----------

export const getAddonCategories = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/addonscategories?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

export const getAddonCategory = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/addonscategory/${slug}`);
  return data;
};

export const addAddonCategoryByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/addonscategory`, payload);
  return data;
};
export const updateAddonCategoryByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/addonscategory/${currentSlug}`, payload);
  return data;
};

export const deleteAddonCategoriesByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/addonscategory/${slug}`);
  return data;
};


// no pagination /admin/addonscategorysnopagination

export const getAllAddonsNoPagination = async () => {
  const { data } = await http.get(`/admin/addonscategorysnopagination`);
  return data;
};

///vendor/addonvendorfrontend query vendorid

export const getAddonsByVendorFrontend = async (vendorId) => {
  const { data } = await http.get(`/vendor/addonvendorfrontend?vendorId=${vendorId}`);
  return data;
};





// ----------------🔶️🔷️🔶️ ADDONS  API 🔶️🔷️🔶️ -----------

export const getAddons = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/addons?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

export const getAddon = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/addon/${slug}`);
  return data;
};

export const addAddonByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/addon`, payload);
  return data;
};
export const updateAddonByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/addon/${currentSlug}`, payload);
  return data;
};

export const deleteAddonByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/addon/${slug}`);
  return data;
};


//addons with format cats

export const getAddonsFormat = async () => {
  
  const { data } = await http.get(`/admin/addonformat`);
  return data;
};



// ----------------🔶️🔷️🔶️ BRANDS MAIN  API 🔶️🔷️🔶️ -----------

export const getBrandsMain = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/brandsmain?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};


//vendor/brandmainnopagination
export const getAllBrandsVendorFront = async (vendorId) => {
  const { data } = await http.get(`/vendor/brandsfront?vendor=${vendorId}`);
  return data;
};

export const getBrandMain = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/brandmain/${slug}`);
  return data;
};

export const addBrandMainByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/brandmain`, payload);
  return data;
};
export const updateBrandMainByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/brandmain/${currentSlug}`, payload);
  return data;
};

export const deleteBrandMainByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/brandmain/${slug}`);
  return data;
};

//admin brands for get in vendor and select admin/brandsfront
export const getAllBrandsFrontAdmin = async () => {
  const { data } = await http.get(`/admin/brandsfront`);
  return data;
};


// no pagination /admin/brandmainnopagination

export const getAllBrandsMain = async () => {
  const { data } = await http.get(`/admin/brandmainnopagination`);
  return data;
};

// GET ALL BRANDS FORM VENDOR AUTH  vendor/brandmainnopagination

export const getAllBrandsMainVendor = async () => {
  const { data } = await http.get(`/vendor/brandmainnopagination`);
  return data;
};



// ----------------🔶️🔷️🔶️ PLANS  API 🔶️🔷️🔶️ -----------

export const getPlans = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/plans?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

//plansnopagination plans no pagination
export const getPlansNoPagination = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/plansnopagination`);
  return data;
};

export const getPlansNoPaginationVendorQuery = async (vendor) => {
  const { data } = await http.get(`/admin/plansnopaginationvendorquery?vendor=${vendor}`);
  return data;
};


export const getPlan = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/plan/${slug}`);
  return data;
};

export const addPlan = async (payload) => {
  const { data } = await http.post(`/admin/plan`, payload);
  return data;
};
export const updatePlanByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/plan/${currentSlug}`, payload);
  return data;
};

export const deletePlanByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/plan/${slug}`);
  return data;
};






// ----------------🔶️🔷️🔶️ PLANS  API 🔶️🔷️🔶️ -----------

export const getImages = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/images?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};


//get brand image
export const getBrandImages = async (brand) => {
  const { data } = await http.get(`/admin/brandimages?brand=${brand}`);
  return data;
};



//plansnopagination plans no pagination
export const getImagesNoPagination = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/admin/imagenopagination`);
  return data;
};

//imagewithparentname parent name
export const getImagesWithParentName = async (parent='question') => {

  const { data } = await http.get(`/admin/imagewithparentname?parent=${parent}`);
  return data;
};


export const getImage = async (slug) => {
  console.log('BOILER SLUG -->', slug);
  const { data } = await http.get(`/admin/image/${slug}`);
  return data;
};

export const addImage = async (payload) => {
  const { data } = await http.post(`/admin/image`, payload);
  return data;
};
export const updateImageByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/image/${currentSlug}`, payload);
  return data;
};

export const deleteImageByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/image/${slug}`);
  return data;
};


// ----------------🔶️🔷️🔶️ MAIN COUPONS CODES API 🔶️🔷️🔶️ -----------

export const getMinCouponCodesByAdmin = async (page, search) => {
  const { data: response } = await http.get(`/admin/coupon-codes-main?search=${search}&page=${page}`);
  return response;
};

export const getMainCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.get(`/admin/coupon-code-main/${id}`);
  return response;
};

export const addMainCouponCodeByAdmin = async (payload) => {
  const { data: response } = await http.post(`/admin/coupon-code-main`, payload);
  return response;
};
export const updateMainCouponCodeByAdmin = async ({ currentId, ...others }) => {
  const { data: response } = await http.put(`/admin/coupon-code-main/${currentId}`, others);
  return response;
};
export const deleteMainCouponCodeByAdmin = async (id) => {
  const { data: response } = await http.delete(`/admin/coupon-code-main/${id}`);
  return response;
};





// ----------------🔶️🔷️🔶️ IMAGE TYPE API 🔶️🔷️🔶️ -----------

export const getImageTypes = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/admin/imagetypes?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};


//use /vendor/imagetypes-by-domain" send query domain
export const getImageTypesByDomain = async (domain) => {
  const { data } = await http.get(`/vendor/imagetypes-by-domain?domain=${domain}`);
  return data;
};



export const getImageType = async (slug) => {
  console.log('CITE SLUG -->', slug);
  const { data } = await http.get(`/admin/imagetype/${slug}`);
  return data;
};

export const addImageTypeByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/imagetype`, payload);
  return data;
};
export const updateImageTypeByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/imagetype/${currentSlug}`, payload);
  return data;
};

export const deleteImageTypeByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/imagetype/${slug}`);
  return data;
};






// ----------------🔶️🔷️🔶️ SizeOption API 🔶️🔷️🔶️ -----------

export const getImageOptions = async (page, search,limit , sort) => {
  const { data } = await http.get(`/admin/imageoptions?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllImageOptionsNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/imageoptionsnopagination`);
  return data;
};

export const getImageOption = async (slug) => {
  console.log(' SLUG --> GET BOILER OPTION', slug);
  const { data } = await http.get(`/admin/imageoption/${slug}`);
  return data;
};

export const addImageOptionByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/imageoption`, payload);
  return data;
};
export const updateImageOptionByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/imageoption/${currentSlug}`, payload);
  return data;
};

export const deleteImageOptionByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/imageoption/${slug}`);
  return data;
};





// ----------------🔶️🔷️🔶️ STRIPE VENDOR SUBSCRIBE API 🔶️🔷️🔶️ -----------

export const CheckoutVendor = async (payload) => {
  console.log('payload' , payload)
  const { data } = await http.post(`/vendor/checkout`, payload);
  return data;
};


export const SubscribeVendor = async (payload) => {
  const { data } = await http.post(`/vendor/subscribe`, payload);
  return data;
};

export const SubscribeCancelVendor = async () => {
  const { data } = await http.get(`/vendor/cancelsubscribe`);
  return data;
};


export const SyncSubscriptionHistory = async () => {
  const { data } = await http.post(`/vendor/sync-history`);
  return data;
};

//getStripeConnectStatus
export const getStripeConnectStatus = async () => {
  const { data } = await http.get(`/vendor/stripe-connect-status`);
  return data;
};

//createStripeConnectAccount
export const createStripeConnectAccount = async () => {
  const { data } = await http.post(`/vendor/stripe-connect-account`);
  return data;
};

//manual-check
export const ManualCheckSubscription = async () => {
  const { data } = await http.post(`/manual-check`);
  return data;
};



//admin/user/:userId/sync-history
export const SyncUserSubscriptionHistoryByAdmin = async (userId) => {
  const { data } = await http.post(`/admin/user/${userId}/sync-history`);
  return data;
};

//admin/user/:userId/check-status
export const CheckSubscriptionStatusByAdmin = async (userId) => {
  const { data } = await http.get(`/admin/user/${userId}/check-status`);
  return data;
};

//vendor/subscription/reactivate
export const ReactivateSubscriptionVendor = async () => {
  const { data } = await http.post(`/vendor/subscription/reactivate`);
  return data;
};





// ----------------🔶️🔷️🔶️ PERMESSIONS API 🔶️🔷️🔶️ -----------


export const getPermessions = async (page, search,limit , sort) => {
  const { data } = await http.get(`/admin/permessions?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllPermessionsNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/permessionsnopagination`);
  return data;
};

export const getPermession = async (slug) => {
  
  const { data } = await http.get(`/admin/permession/${slug}`);
  return data;
};

export const addPermessionByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/permession`, payload);
  return data;
};
export const updatePermessionByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/permession/${currentSlug}`, payload);
  return data;
};

export const deletePermessionByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/permession/${slug}`);
  return data;
}





// ----------------🔶️🔷️🔶️ SUBSCRIPEPLAN CRUD API 🔶️🔷️🔶️ -----------


export const getSubscribePlans = async (page, search,limit , sort) => {
  const { data } = await http.get(`/admin/subscribeplans?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};

// boileroptionpagination
export const getAllSubscribePlansNoPagination = async (page, search) => {
  const { data } = await http.get(`/admin/subscribeplansnopagination`);
  return data;
};

export const getSubscribePlan = async (slug) => {
  
  const { data } = await http.get(`/admin/subscribeplan/${slug}`);
  return data;
};

export const addSubscribePlanByAdmin = async (payload) => {
  const { data } = await http.post(`/admin/subscribeplan`, payload);
  return data;
};
export const updateSubscribePlanByAdmin = async ({ currentSlug, ...payload }) => {
  const { data } = await http.put(`/admin/subscribeplan/${currentSlug}`, payload);
  return data;
};

export const deleteSubscribePlanByAdmin = async (slug) => {
  const { data } = await http.delete(`/admin/subscribeplan/${slug}`);
  return data;
}


export const createPortalSession = async () => {
  const response = await http.post('/vendor/subscription/portal');
  return response.data;
};

export const checkSubscriptionStatus = async () => {
  const response = await http.get('/vendor/subscription/check-status');
  return response.data;
};

export const getSubscribePlansVendor = async () => {
  const response = await http.get('/vendor/subscription/plans');
  return response.data;
};


//history of supscriptions
export const getSubscriptionHistory = async () => {
  const response = await http.get('/vendor/subscription/history');
  return response.data;
};


// Ajouter ces nouvelles fonctions API
export const updateUserDiscountForAllPlans = async (data) => {
  const response = await http.post('/user-discount', data);
  return response.data;
};

export const getUserDiscounts = async (userId) => {
  const response = await http.get(`/user-discount/${userId}`);
  return response.data;
};

export const verifySubdomain = async (subdomain) => {
  try {
    const response = await http.get(`/verify-subdomain/${subdomain}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateShopDomain = async (shopId, domainData) => {
  try {
    const response = await http.put(`/shops/${shopId}/domain`, domainData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//shops/subdomain/:subdomain/vendor
export const getVendorBySubdomain = async (subdomain) => {
  const { data } = await http.get(`/shops/subdomain/${subdomain}/vendor`);
  return data;
};




export const checkCustomDomainStatus = async () => {
  const response = await http.post('/user/custom-domain/check-status');
  return response.data;
};

export const verifyCustomDomain = async () => {
  const response = await http.post('/user/custom-domain/verify');
  return response.data;
};




export const getShopBySubdomain = async (subdomain) => {
  try {
    const response = await http.get(`/shops/subdomain/${subdomain}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBoilersBySubdomain = async (subdomain) => {
  try {
    const response = await http.get(`/shops/subdomain/${subdomain}/boilers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopStripeKeys = async () => {
  const response = await http.get('/shop/stripe-keys');
  return response.data;
};




export const updateShopStripeKeys = async (data) => {
  const response = await http.post('/shop/stripe-keys', data);
  return response.data;
};

export const updateUserDomain = async (data) => {
  const response = await http.put('/vendor/update-domain', data);
  return response.data;
};

export const removeCustomDomain = async () => {
  const response = await http.delete('/vendor/custom-domain');
  return response.data;
};

export const disconnectStripeConnect = async () => {
  const response = await http.delete('/vendor/stripe-connect-account');
  return response.data;
};

export const handleStripeCallback = async (code, state) => {
  const response = await http.get(`/vendor/connect-callback?code=${code}&state=${state}`);
  return response.data;
};

//vendor transfer test
export const transferToVendor = async (payload) => {
  const response = await http.post('/vendor/transfer', payload);
  return response.data
}

export const transferToVendorByKeys = async (payload)=>{
  const response = await http.post('/vendor/transfer-by-keys', payload);
  return response.data
}

//vendor/update-business-representative

export const filterBoilers = async (filters) => {
  const { data } = await http.post(`/boiler/filter`, { filters });
  return data;
};

//boilers tags
export const getUniqueBoilerTags = async () => {
  const { data } = await http.get(`/vendor/boiler/tags`);
  return data;
};


// ----------------🔶️🔷️🔶️ Question Two API 🔶️🔷️🔶️ -----------

export const getQuestionsTwoAdmin = async (page, search, limit, sort, userId = '') => {
  try {
    const response = await http.get(
      `/admin/questionstwo?page=${page}&search=${search}&limit=${limit}&sort=${sort}${userId ? `&userId=${userId}` : ''}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionsTwoNoPagination = async (vendorId) => {
  const { data } = await http.get(`/admin/questionstwonopagination${vendorId ? `?vendorId=${vendorId}` : ''}`);
  return data;
};


export const getQuestionsTwoNoPaginationDashboard = async () => {
  const { data } = await http.get(`/vendor/questionstwonopaginationdashboard`);
  return data;
};





export const getQuestionTwoByIdAdmin = async (id) => {
  const { data } = await http.get(`/admin/questiontwo/${id}`);
  return data;
};

export const addQuestionTwoAdmin = async (payload) => {
  const { data } = await http.post(`/admin/questiontwo`, payload);
  return data;
};

export const updateQuestionTwoByAdmin = async ({ currentId, ...payload }) => {
  const { data } = await http.put(`/admin/questiontwo/${currentId}`, payload);
  return data;
};

export const deleteQuestionTwoByAdmin = async (id) => {
  const { data } = await http.delete(`/admin/questiontwo/${id}`);
  return data;
};

// Add these functions to handle question two reordering
export const reorderQuestionTwoOptions = async ({ questionId, options }) => {
  const { data } = await http.put(`/admin/questiontwo/${questionId}/reorder-options`, { options });
  return data;
};




//Faq for admin
export const getFaqDashboard = async (page, search ,limit ,sort) => {
  const { data } = await http.get(`/admin/faqs?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};




export const getFaqBySlug = async (slug) => {
  const { data } = await http.get(`/admin/faq/${slug}`);
  return data;
};

export const createFaq = async (payload) => {
  const { data } = await http.post('/admin/faq', payload);
  return data;
};

export const updateFaqBySlug = async (slug, payload) => {
  const { data } = await http.put(`/admin/faq/${slug}`, payload);
  return data;
};

export const deleteFaqBySlug = async (slug) => {
  const { data } = await http.delete(`/admin/faq/${slug}`);
  return data;
};

//Faq for vendor frontend
export const getFaqsByVendorFrontend = async (vendorId) => {
  const { data } = await http.get(`/vendor/faqsfront?vendorid=${vendorId}`);
  return data;
};


//sessions
export const saveSession = async ({ filterData, sessionId, customerInfo }) => {
  const payload = {
    filterData,
    sessionId,
    customerInfo
  };
  console.log('PAYLOAD API -->', payload);
  const { data } = await http.post('/session-save', payload);
  return data; // Ensure to return the data
};


export const getSession = async (sessionId) => {
  const { data } = await http.get(`/session/${sessionId}`);
  return data;
};

//update session data
export const updateSessionData = async (sessionId, payload) => {
  const { data } = await http.put(`/session-update/${sessionId}`, payload);
  return data;
};

export const deleteExpiredSessions = async () => {
  const { data } = await http.delete('/session');
  return data;
};

export const resetSession = async (sessionId) => {
  const { data } = await http.delete(`/session-reset/${sessionId}`);
  return data;
};

// Add these new calendar-related API functions

export const getVendorCalendar = async (startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const { data } = await http.get(`/vendor/calendar?${params}`);
  return data;
};

export const updateCalendarEntry = async (payload) => {
  const { data } = await http.post('/vendor/calendar', payload);
  return data;
};

export const deleteCalendarEntry = async (date) => {
  const { data } = await http.delete(`/vendor/calendar/${date}`);
  return data;
};

export const getVendorAvailableDates = async (vendorId, startDate, endDate) => {
  const params = new URLSearchParams({
    vendorId,
    ...(startDate && { startDate }),
    ...(endDate && { endDate })
  });
  
  const { data } = await http.get(`/calendar/available?${params}`);
  return data;
};

//first available date calendar/first-available'
export const getFirstAvailableDate = async (vendorId) => {
  const { data } = await http.get(`/calendar/first-available?vendorId=${vendorId}`);
  return data;
};


//endor/calendar-by-subdomain
export const getVendorCalendarBySubdomain = async (subdomain) => {
  const { data } = await http.get(`/vendor/calendar-bysub?subdomain=${subdomain}`);
  return data;
};

// Add these new calendar-related services

export const bookInstallationDate = async (payload) => {
  const { data } = await http.post('/calendar/book', {
    date: payload.date,
    subdomain: payload.subdomain,
     sessionId: payload.sessionId
  });
  return data;
};

export const checkDateAvailability = async (vendorId, date) => {
  const { data } = await http.get(`/calendar/check-availability?vendorId=${vendorId}&date=${date}`);
  return data;
};


///ask-boiler-helper 
export const askBoilerHelper = async (question,shopId) => {
  const { data } = await http.post('/ask-boiler-helper', { question,shopId });
  return data;
};


//potentialcustomers of vendor
export const getPotentialCustomersOfVendor = async (page, search,limit ,sort) => {
  const { data } = await http.get(`/vendor/potentialcustomers?page=${page}&search=${search}&limit=${limit}&sort=${sort}`);
  return data;
};

export const deletePotentialCustomerByEmail = async (email) => {
  const { data } = await http.delete(`/vendor/potentialcustomers/${email}`);
  return data;
};


export const createPotentialCustomer = async (customerData) => {
  const { data } = await http.post('/vendor/potentialcustomers', customerData);
  return data;
};

export const findPotentialCustomerBySessionId = async (sessionId) => {
  const { data } = await http.get(`/vendor/potentialcustomers/${sessionId}`);
  return data;
};

// Boiler Settings API endpoints
export const getBoilerSettings = () => http.get('/boiler-settings');

export const updateBoilerSettings = (data) => http.patch('/boiler-settings', data);

export const getBoilerSettingsByVendorId = (vendorId) => 
  http.get(`/boiler-settings/frontend/${vendorId}`);







// Install Info API endpoints
export const createInstallInfo = async (payload) => {
  const { data } = await http.post('/vendor/install-info', payload);
  return data;
};

export const getAllInstallInfos = async () => {
  const { data } = await http.get('/vendor/install-info');
  return data;
};

export const getInstallInfoById = async () => {
  const { data } = await http.get(`/vendor/install-info`);
  return data;
};

export const updateInstallInfo = async ( payload) => {
  const { data } = await http.put(`/vendor/install-info`, payload);
  return data;
};

export const deleteInstallInfo = async () => {
  const { data } = await http.delete(`/vendor/install-info`);
  return data;
};


///vendor/install-info/fron
export const getInstaInfoFront = async (vendorId) => {
  const { data } = await http.get(`/vendor/install-info-front?vendorId=${vendorId}`);
  return data;
};




// Charge API endpoints
export const createTopUpIntent = async (data) => {
  const { data: response } = await http.post('/vendor/charge/create-top-up-intent', data);
  return response;
};

export const confirmTopUp = async (data) => {
  const { data: response } = await http.post('/vendor/charge/confirm-top-up', data);
  return response;
};





// Vendor Orders API endpoints
export const getVendorOrders = async (page, search, limit, sort, status, paymentMethod, paymentStatus, 
  // orderDate
  orderYear,
  orderMonth,
  today,
  date
  ) => {
  const params = new URLSearchParams({
    limit: limit?.toString(),
    page: page?.toString(),
    search: search || '',
    sort: sort || '',
    paymentMethod: paymentMethod || '',
    paymentStatus: paymentStatus || '',
    orderYear: orderYear || '',
    orderMonth: orderMonth || '',
    today: today || 'false',
    date: date || ''   

    // orderDate: orderDate || '' // Add orderDate parameter
  });
  if (status !== 'all') {
    params.append('status', status);
  }
  const { data } = await http.get(`/vendor/customer/orders?${params.toString()}`);
  return data;
};

export const getVendorOrderById = async (id) => {
  const { data } = await http.get(`/vendor/customer/order/${id}`);
  return data;
};

export const updateVendorOrder = async (id, payload) => {
  const { data } = await http.put(`/vendor/customer/order/${id}`, payload);
  return data;
};

export const deleteVendorOrder = async (id) => {
  const { data } = await http.delete(`/vendor/customer/order/${id}`);
  return data;
};





export const moveOrderStage = async (orderId, stageData) => {
  const { data } = await http.patch(`/orders/${orderId}/move-stage`, stageData);
  return data;
};


export const loadMoreOrders = async ({ lastOrderId, search = '', limit = 5, sort = 'createdAt',pipelineId }) => {
  const queryParams = new URLSearchParams({
    limit: String(limit),
    search,
    sort,
  });
  
  // Add pipelineId only if it's provided and not 'all'
  if (pipelineId && pipelineId !== 'all' && pipelineId !== 'undefined') {
    queryParams.append('pipelineId', pipelineId);
  }
  
  // Add lastOrderId if provided (Prisma uses cuid format, not ObjectId)
  if (lastOrderId && typeof lastOrderId === 'string' && lastOrderId.trim().length > 0) {
    queryParams.append('lastOrderId', lastOrderId);
  }

  console.log('🔍 LoadMoreOrders API call:', {
    pipelineId,
    lastOrderId,
    search,
    sort,
    queryString: queryParams.toString()
  });

  const { data } = await http.get(`/vendor/customer/order/loadMore?${queryParams.toString()}`);
  return {
    data: data.orders || [],
    hasMore: data.hasMore,
    lastOrderId: data.lastOrderId
  };
};




// Pipeline management endpoints
export const createPipeline = async (data) => {
  const { data: response } = await http.post('/vendor/pipelines', data);
  return response;
};

export const getPipelines = async () => {
  const { data } = await http.get('/vendor/pipelines');
  return data;
};

export const addPipelineStage = async (pipelineId, stageData) => {
  const { data } = await http.post(`/vendor/pipelines/${pipelineId}/stages`, stageData);
  return data;
};




export const deletePipeline = async (pipelineId) => {
  const { data } = await http.delete(`/vendor/pipelines/${pipelineId}`);
  return data;
};

export const updatePipeline = async (pipelineId, pipelineData) => {
  console.log('PIPELINE ID', pipelineId);
  const { data } = await http.put(`/vendor/pipelines/${pipelineId}`, pipelineData);
  return data;
};

export const deleteStage = async (pipelineId, stageId) => {
  const { data } = await http.delete(`/vendor/pipelines/${pipelineId}/stages/${stageId}`);
  return data;
};


export const getPipeline = async (pipelineId) => {
  const { data } = await http.get(`/vendor/pipelines/${pipelineId}`);
  return data;
};



export const getVendorOrder = async (orderId) => {
  const { data } = await http.get(`/vendor/customer/order/${orderId}`);
  return data;
};

export const getVendorBoilersAndAddons = async () => {
  const { data } = await http.get(`/vendor/customer/order-boilers&addons`);
  return data;
};


export const createVendorOrderCustomer = async (orderData) => {
  const { data } = await http.post('/vendor/customer/order/create', orderData);
  return data;
};

export const updateVendorOrderCustomer = async (orderId, orderData) => {
  console.log('XXXXXXX')
  if (!orderId) throw new Error('Order ID is required');
  const { data } = await http.put(`/vendor/customer/order/update/${orderId}`, orderData);
  return data;
};



export const createOrderStatus = async (orderStatusData) => {
  const { data } = await http.post('/order-status', orderStatusData);
  return data;
};

export const getOrderStatusBySlug = async (slug) => {
  const { data } = await http.get(`/order-status/${slug}`);
  return data;
};

export const getAllOrderStatus = async (page, search, limit, sort) => {
  const params = new URLSearchParams({
    page: page?.toString() || '1',
    search: search || '',
    limit: limit?.toString() || '10',
    sort: sort || ''
  });
  const { data } = await http.get(`/admin/order-status?${params.toString()}`);
  return data;
};

export const updateOrderStatusBySlug = async (id, orderStatusData) => {
  const { data } = await http.put(`/admin/order-status/${id}`, orderStatusData);
  return data;
};

export const deleteOrderStatusBySlug = async (id) => {
  const { data } = await http.delete(`/admin/order-status/${id}`);
  return data;
};

//get orders in details
export const getOrdersInDetails = async () => {
  const { data } = await http.get('/admin/order-status/orders-all');
  return data;
};



// ... existing code ...

// ----------------🔶️🔷️🔶️ VENDOR CUSTOMERS API 🔶️🔷️🔶️ -----------

export const getVendorCustomers = async (page, search, limit, sort) => {
  const { data } = await http.get(
    `/vendor/customers?search=${search}&page=${page}&limit=${limit}&sort=${sort}`
  );
  return data;
};

export const getVendorCustomerById = async (id) => {
  const { data } = await http.get(`/vendor/customers/${id}`);
  return data;
};

export const createVendorCustomer = async (payload) => {
  const { data } = await http.post('/vendor/customers', payload);
  return data;
};

export const updateVendorCustomer = async ({ id, ...payload }) => {
  const { data } = await http.put(`/vendor/customers/${id}`, payload);
  return data;
};

export const deleteVendorCustomer = async (id) => {
  const { data } = await http.delete(`/vendor/customers/${id}`);
  return data;
};

// ... rest of the file ...

// ----------------🔶️🔷️🔶️ VENDOR CUSTOMER PROPERTY API 🔶️🔷️🔶️ -----------

export const getVendorCustomerProperties = async (page, search, limit, sort,customerId) => {
  const { data } = await http.get(
    `/vendor/customer/properties?search=${search}&page=${page}&limit=${limit}&sort=${sort}&customerId=${customerId}`
  );
  return data;
};

export const getVendorCustomerPropertyById = async (id) => {
  const { data } = await http.get(`/vendor/customer/property/${id}`);
  return data;
};

export const createVendorCustomerProperty = async (payload) => {
  const { data } = await http.post('/vendor/customer/property', payload);
  return data;
};

export const updateVendorCustomerProperty = async ({ id, ...payload }) => {
  const { data } = await http.put(`/vendor/customer/property/${id}`, payload);
  return data;
};

export const deleteVendorCustomerProperty = async (id) => {
  const { data } = await http.delete(`/vendor/customer/property/${id}`);
  return data;
};



export const updateOrderImages = async (orderNo, images) => {
  const { data } = await http.put(`/customer/upload/order-images?orderNo=${orderNo}`, { images });
  return data;
};

//customer/order-isUploaded 
export const getOrderIsUploaded = async (orderNo) => {
  const { data } = await http.get(`/customer/order-isUploaded?orderNo=${orderNo}`);
  return data;
};


//router.get('/customer/orderNumber/:orderNumber', getSettingsByOrderNumber);
 
export const getSettingsByOrderNumber = async (orderNumber) => {
  const { data } = await http.get(`/boiler-settings/customer/orderNumber?orderNo=${orderNumber}`);
  return data;
};



///vendor/customer-order-send-notification
export const sendCustomerNotification = async (payload) => {
  const { data } = await http.post('/vendor/customer-order-send-notification', payload);
  return data;
};



///vendor/customer-order/analaytics
export const getOrderAnalytics = async () => {
  const { data } = await http.get('/vendor/customer-order/analaytics');
  return data;
};

///vendor/customer-order/monthly-analaytics
export const getMonthlyOrderAnalytics = async (year) => {
  const { data } = await http.get(`/vendor/customer-order/monthly-analaytics?year=${year}`);
  return data;
};


//vendor/customer-order/payment-method-analytics
export const getPaymentMethodAnalytics = async () => {
  const { data } = await http.get('/vendor/customer-order/payment-method-analytics');
  return data;
};

//vendor/customer-order/top-selling-items
export const getTopSellingItems = async () => {
  const { data } = await http.get('/vendor/customer-order/top-selling-items');
  return data;
};



// services/index.js
// Add these new functions

export const createEngineerForm = async (payload) => {
  const { data } = await http.post('/vendor/engineer-form', payload);
  return data;
};

export const getVendorEngineerForm = async () => {
  const { data } = await http.get('/vendor/engineer-form');
  return data;
};

export const updateEngineerForm = async (payload) => {
  console.log('payload🟦🔸️🔷️', payload)
  const { data } = await http.put('/vendor/engineer-form', payload);
  return data;
};

//vendor/engineer-form/:vendorId
export const getVendorFormFrontend = async (vendorId) => {
  const { data } = await http.get(`/enginner/get-form-no-token/${vendorId}`);
  return data;
};


export const getEngineersByVendor = async (page, search, limit, sort, status) => {
  const { data } = await http.get(`/vendor/engineers?search=${search}&page=${page}&limit=${limit}&sort=${sort}&status=${status}`);
  return data;
};

///vendor/engineers/:id
export const getEngineerById = async (id) => {
  const { data } = await http.get(`/vendor/engineers/${id}`);
  return data;
};


export const updateEngineer = async (id, payload) => {  
  
  const { data } = await http.put(`/vendor/engineers/${id}`, payload);
  return data;
};

export const createEngineer = async (payload) => {
  const { data } = await http.post('/vendor/engineers', payload);
  return data;
};

export const deleteEngineer = async (id) => {
  const { data } = await http.delete(`/vendor/engineers/${id}`);
  return data;
};


export const updateEngineerStatusByVendor = async ({ id, status }) => {
  const { data } = await http.patch(`/vendor/engineers/${id}/status`, { status });
  return data;
};


/// vendor/engineers/notification
export const sendEngineerNotification = async (payload) => {
  const { data } = await http.post('/vendor/engineers/notification', payload);
  return data;
};



//check postal coverage
// export const checkPostalCoverage = async () => {
//   const { data } = await http.post(`/session/session-postal-check`);
//   return data;
// };



export const checkPostalCoverage = async (payload) => {
  const { data } = await http.post(`/session/session-postal-check`,payload);
  return data;
};




///engineer/coverage/:vendorid
export const getEngineerCoverageCitiesAndPostals = async (vendorid) => { 
  const { data } = await http.get(`/engineer/coverage/${vendorid}`);
  return data;
};



//engineer/coverage-with-auth-vendor
export const getEngineerCoverageCitiesAndPostalsAuthVendor = async () => {
  const { data } = await http.get(`/engineer/coverage-with-auth-vendor`);
  return data;
};




// Add these new endpoints


export const updateAllCitiesStatusByVendor = async (data) => {
  const response = await http.put('/vendor/cities/status/all', data);
  return response.data;
};

//vendor/postals/status/all

export const updateAllPostalsStatusByVendor = async (data) => {
  const response = await http.put('/vendor/postals/status/all', data);
  return response.data;
};

// Add this for admin bulk status update if missing
export const updateAllPostalsStatusByAdmin = async (data) => {
  const response = await http.put('/admin/postals/status/all', data);
  return response.data;
};

// Task endpoints
export const createTask = async (taskData) => {
  const { data } = await http.post('/vendor/task', taskData);
  return data;
};

// export const getAllTasks = async (orderId) => {
//   const url = orderId 
//     ? `/vendor/tasks?orderId=${orderId}`
//     : '/vendor/tasks';
//   const { data } = await http.get(url);
//   return data;
// };


export const getAllTasks = async (orderId, page = 1, search = '', limit = 10, sort = '', status = '', noPagination = false) => {
  let url = '/vendor/tasks';
  
  // Build query parameters
  const params = new URLSearchParams();
  if (orderId) params.append('orderId', orderId);
  if (page) params.append('page', page);
  if (search) params.append('search', search);
  if (limit) params.append('limit', limit);
  if (sort) params.append('sort', sort);
  if (status) params.append('status', status);
  if (noPagination) params.append('noPagination', noPagination);
  
  // Add query string if we have parameters
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const { data } = await http.get(url);
  return data;
};


export const getTaskById = async (id) => {
  const { data } = await http.get(`/vendor/task/${id}`);
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await http.put(`/vendor/task/${id}`, taskData);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await http.delete(`/vendor/task/${id}`);
  return data;
};

export const updateTaskStatus = async (id, statusData) => {
  const { data } = await http.patch(`/vendor/task/status/${id}`, statusData);
  return data;
};


// Add this to your existing services
export const updateTasksOrder = async (orderData) => {
  const { data } = await http.patch('/vendor/tasks/order', { tasks: orderData });
  return data;
};

// Get filtered engineers by name, service type and work type
export const getFilteredEngineers = async (filters) => {
  const { data } = await http.get('/vendor/engineers-filtered', { 
    params: filters 
  });
  return data;
};


// Add this new endpoint after your existing functions
export const assignEngineerToOrder = async (assignmentData) => {
  const { data } = await http.post('/vendor/engineers/assign', assignmentData);
  return data;
};





export const getVendorOrderInfoForm = async () => {
  const { data } = await http.get('/vendor/order-info-form');
  return data;
};

export const createVendorOrderInfoForm = async (formData) => {
  const { data } = await http.post('/vendor/order-info-form', formData);
  return data;
};



export const updateVendorOrderInfoForm = async (formData) => {
  const { data } = await http.put('/vendor/order-info-form', formData);
  return data;
};

export const getOrderHistory = async (orderId) => {
  const { data } = await http.get('/vendor/customer-order/order-history', {
    params: { orderId }
  });
  return data;
};


export const getVendorEngineersCalendar = async (engineerId) => {
  const { data } = await http.get(`/vendor/engineer-calendar/${engineerId}`);
  return data;
};

export const updateVendorEngineerCalendar = async (engineerId, calendarData) => {
  const { data } = await http.put(`/vendor/engineer-calendar/${engineerId}`, calendarData);
  return data;
};

export const deleteVendorEngineerCalendarEntry = async (engineerId, date) => {
  const { data } = await http.delete(`/vendor/engineer-calendar/${engineerId}/${date}`);
  return data;
};



export const getCurrentAssignedEngineer = async (orderId) => {
  const { data } = await http.post('/vendor/customer-order/current-assigned-engineer', { orderId });
  return data;
};


// ... existing code ...

export const rejectEngineerOrderInfo = async ({ orderId, engineerId, rejectReasons }) => {
  const { data } = await http.post('/vendor/engineer/order-info-reject', {
    orderId,
    engineerId,
    rejectReasons
  });
  return data;
};

export const acceptEngineerOrderInfo = async ({ orderId, engineerId }) => {
  const { data } = await http.post('/vendor/engineer/order-info-accept', {
    orderId,
    engineerId
  });
  return data;
};


///vendor/customer-order/billing-items
export const getVendorOrdersBillingItems = async () => {
  const { data } = await http.get('/vendor/customer-order/billing-items');
  return data;
};




export const getRecallByOrderId = async ({ orderId, engineerId }) => {
  const { data } = await http.get('/vendor/recall/get-by-orderid-and-engineerid', {
    params: {
      orderId,
      engineerId
    }
  });
  return data;
};


export const updateRecall = async ({ orderId, engineerId, status, description, files }) => {
  const { data } = await http.put('/vendor/recall', {
    orderId,
    engineerId,
    status,
    description,
    files
  });
  return data;
};


// router.put('/vendor/order-info/reject-reasons', verifyToken, engineerOrderInfoController.editRejectReasons);

export const editRejectReasons = async ({ orderId, engineerId, rejectReasons }) => {
  const { data } = await http.put('/vendor/order-info/reject-reasons', {
    orderId,
    engineerId,
    rejectReasons
  });
  return data;
};


// Read single vendor notification
export const readVendorNotification = async (notificationId) => {
  const { data } = await http.put(`/admin/notifications/read/${notificationId}`);
  return data;
};

// Read all vendor notifications
export const readAllVendorNotifications = async () => {
  const { data } = await http.put('/admin/notifications/read-all');
  return data;
};

//'/vendor/order-info/status'
 export const updateOrderInfoStatus = async (orderId, newStatus ,engineerId) => {
  const { data } = await http.put('/vendor/order-info/status', {
    orderId,
    newStatus,
    engineerId
  });
  return data;
};




export const deleteOrderHistoryItem = async (historyId) => {
  const response = await http.delete(`/vendor/order-history/${historyId}`);
  return response.data;
};

export const resetOrderHistory = async (orderId) => {
  const response = await http.delete(`/vendor/order-history/reset/${orderId}`);
  return response.data;
};

// Add in the vendor services section
export const sendChatMessage = async (data) => {

console.log('data MESSAGE SEND ???>?>', data)

    const headers = data instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };

    const response = await http.post('/chat/send-no-token', data, { headers });
    return response.data;
};

// export const getChatHistory = async (orderId) => {
//   const { data } = await http.get(`/chat/history/${orderId}`);
//   return data;
// };



// Add in the engineer services section
export const engineerSendChatMessage = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'attachments') {
      value.forEach(file => formData.append('attachments', file));
    } else {
      formData.append(key, value);
    }
  });
  
  const { data } = await http.post('/chat/send/no-token', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};




export const engineerGetChatHistory = async (orderId) => {
  const { data } = await http.get(`/chat/history/${orderId}`);
  return data;
};


export const getChatHistory = async (orderId, page = 1, limit = 12) => {
  const { data } = await http.get(`/chat/history/${orderId}/no-token?page=${page}&limit=${limit}`);
  return data;
};






export const setUserOnlineStatus = async (userId, userType, orderId, isOnline) => {
  const { data } = await http.post('/user/pusher/set-online-no-token', {
    userId,
    userType, 
    orderId,
    isOnline
  });
  console.log('DATA ONLINE STATUS❎✳❎✳', data)
  return data;
};



export const setUserTypingStatus = async (orderId, userId, userType, isTyping, name) => {
  const { data } = await http.post('/user/pusher/typing-status-no-token', {
    orderId,
    userId,
    userType,
    isTyping,
    name
  });
  return data;
};



// ... existing chat services ...
export const markMessagesAsRead = async (orderId, { userId, userType }) => {
  const { data } = await http.post(
    `/chat/mark-read/${orderId}/no-token`,
    { userId, userType }
  );
  return data;
};



// ... existing code ...

export const getVendorAllOrderChats = async (search = '') => {
  const params = new URLSearchParams({ search });
  const { data } = await http.get(`/vendor/order-chats?${params}`);
  return data;
};




// ----------

// ... existing code ...

export const getVendorCustomerChats = async (search = '') => {
  const response = await http.get(`/chat/vendor/customer-chats?search=${search}`);
  return response.data;
};

export const getCustomerChatHistory = async (shopId, customerId) => {
  const response = await http.get(`/chat/customer/history-no-token/${shopId}/${customerId}`);
  return response.data;
};




export const getCustomerChatById = async (chatId) => {
  const response = await http.get(`/chat/customer/${chatId}`);
  return response.data;
};


export const markCustomerMessagesAsRead = async (shopId, customerId, { userId, userType }) => {
  const { data } = await http.post(
    `/chat/customer/mark-read-no-token/${shopId}/${customerId}`,
    { userId, userType }
  );
  return data;
};







// export const sendCustomerVendorMessage = async (data) => {
//   const formData = new FormData();
  
//   // Add text fields
//   formData.append('shopId', data.shopId);
//   formData.append('customerId', data.customerId);
//   formData.append('content', data.content);
//   formData.append('senderType', data.senderType);
//   formData.append('userId', data.userId);
  
//   // Add attachments if any
//   if (data.attachments && data.attachments.length > 0) {
//     data.attachments.forEach((file, index) => {
//       formData.append('attachments', file);
//     });
//   }
  
//   const response = await http.post('/chat/customer/send-no-token', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
  
//   return response.data;
// };



export const sendCustomerVendorMessage = async (data) => {

  console.log('data MESSAGE SEND ???>?>', data)
  
      const headers = data instanceof FormData 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' };
  
      const response = await http.post('/chat/customer/send-no-token', data, { headers });
      return response.data;
  };






// export const setCustomerTypingStatus = async (chatId, userId, userType, isTyping, name) => {
//   const response = await http.post('/chat/customer/typing-status', {
//     chatId,
//     userId,
//     userType,
//     isTyping,
//     name
//   });
//   return response.data;

// };


// Add or update this function in your services file
export const setCustomerTypingStatus = async (params) => {
  try {
    const { chatId, userId, userType, isTyping, name } = params;
    const response = await http.post('/chat/customer/typing-status-no-token', {
      chatId,
      userId,
      userType,
      isTyping,
      name
    });
    return response.data;
  } catch (error) {
    console.error('Error setting customer typing status:', error);
    throw error;
  }
};




// ... existing code ...

// export const setVendorTypingStatus = async (shopId, customerId, isTyping, vendorName) => {
//   const response = await http.post('/chat/customer/vendor-typing-status-no-token', {
//     shopId,
//     customerId,
//     isTyping,
//     vendorName
//   });
//   return response.data;
// };


// Add or update this function in your services file
export const setVendorTypingStatus = async (params) => {
  try {
    const { shopId, customerId, chatId, userId, userType, isTyping, name } = params;
    const response = await http.post('/chat/customer/vendor-typing-status-no-token', {
      shopId,
      customerId,
      chatId,
      userId,
      userType,
      isTyping,
      name
    });
    return response.data;
  } catch (error) {
    console.error('Error setting vendor typing status:', error);
    throw error;
  }
};

// Add this new function to update chat status
export const updateCustomerChatStatus = async (chatId, status, userId, userType) => {
  try {
    const response = await http.put(`/chat/status-no-token/${chatId}`, {
      status,
      userId,
      userType
    });
    return response.data;
  } catch (error) {
    console.error('Error updating chat status:', error);
    throw error;
  }
};



export const updateVendorEngineerChatStatus = async (chatId, status, userId, userType) => {
  try {
    const response = await http.put(`/chat/vendor-engineer-status-no-token/${chatId}`, {
      status,
      userId,
      userType
    });
    return response.data;
  } catch (error) {
    console.error('Error updating chat status:', error);
    throw error;
  }
};


export const markChatAsSolvedOrOpen = async (chatId, status) => {
  try {
    const response = await http.put(`/chat/solve-or-open/${chatId}`, {
      status
    });
    return response.data;
  } catch (error) {
    console.error('Error marking chat as solved/open:', error);
    throw error;
  }
};



export const markCustomerChatAsSolvedOrOpen = async (chatId, status) => {
  try {
    const response = await http.put(`/chat/customer/solve-or-open/${chatId}`, {
      status
    });
    return response.data;
  } catch (error) {
    console.error('Error marking chat as solved/open:', error);
    throw error;
  }
};



// Tracking Customer 


export const trackCustomerVisit = async (data) => {
  try {
    const response = await http.post('/chat/customer-no-token/track-visit', data);
    return response.data;
  } catch (error) {
    console.error('Error tracking customer visit:', error);
    throw error;
  }
};

export const updateCustomerOnlineStatus = async (data) => {
  try {
    const response = await http.post('/chat/customer-no-token/online-status', data);
    return response.data;
  } catch (error) {
    console.error('Error updating customer online status:', error);
    throw error;
  }
};

export const getCustomerTracking = async (chatId) => {
  try {
    const response = await http.get(`/chat/customer/tracking/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting customer tracking:', error);
    throw error;
  }
};






export const getChatSettings = async () => {
  const response = await http.get(`/chat-settings`);
  return response.data;
};

export const updateChatSettings = async (data) => {
  const response = await http.patch(`/chat-settings`, data);
  return response.data;
};



export const getSettingsByVendorId = async (vendorId) => {
  try {
    const response = await http.get(`/chat-settings/frontend-no-token/${vendorId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting chat settings by vendor ID:', error);
    throw error;
  }
};


export const submitCustomerChatRating = async ({ shopId, customerId, rating }) => {
  const response = await http.post('/chat/customer/update-rating-no-token', { shopId, customerId, rating });
  return response.data;
};



// Add this function in the services file where the other chat-related functions are

export const sendContactMessage = async (data) => {
  try {
    const response = await http.post('/chat/customer/save-contact-message-no-token', data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};




export const resetCustomerChat = async (chatId) => {
  try {
    const response = await http.post(`/chat/customer/reset-chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error resetting customer chat:', error);
    throw error;
  }
};

export const deleteCustomerChat = async (chatId) => {
  try {
    const response = await http.delete(`/chat/customer/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer chat:', error);
    throw error;
  }
};





export const resetChat = async (chatId) => {
  try {
    const response = await http.post(`/chat/vendor-engineer/reset-chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error resetting customer chat:', error);
    throw error;
  }
};

export const deleteChat = async (chatId) => {
  try {
    const response = await http.delete(`/chat/vendor-engineer/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer chat:', error);
    throw error;
  }
};


//contact services



export const getContactMessages = async (params) => {
  const response = await http.get('/contacts', { params });
  return response.data;
};

export const getContactMessage = async (id) => {
  const response = await http.get(`/contacts/${id}`);
  return response.data;
};

export const getContactMessageCounts = async () => {
  const response = await http.get('/contacts/counts');
  return response.data;
};

export const getContactLabels = async () => {
  const response = await http.get('/contacts/labels');
  return response.data;
};

export const updateMessageStatus = async ({ id, status }) => {
  const response = await http.patch(`/contacts/${id}/status`, { status });
  return response.data;
};

export const updateMessageProperties = async ({ id, ...properties }) => {
  const response = await http.patch(`/contacts/${id}/properties`, properties);
  return response.data;
};

export const bulkUpdateMessages = async (data) => {
  const response = await http.post('/contacts/bulk-update', data);
  return response.data;
};

export const permanentlyDeleteMessages = async (ids) => {
  const response = await http.delete('/contacts/permanent', { data: { ids } });
  return response.data;
};

export const submitContactMessage = async (formData) => {
  const response = await http.post('/contacts/submit-no-token', formData);
  return response.data;
};

export const sendContactsVendorMessage = async (data) => {
  const response = await http.post('/contacts/send-message', data);
  return response.data;
};



// ... existing imports and code ...

export const sendEmailReply = async ({ id, content, subject, fromEmail }) => {
  return http.post(`/contacts/reply/email/${id}`, { content, subject, fromEmail });
};

export const sendSmsReply = async ({ id, content }) => {
  return http.post(`/contacts/reply/sms/${id}`, { content });
};





// ... existing code ...

// Contact settings endpoints
export const getContactSettings = async () => {
  return http.get('/contact-settings');
};

export const updateContactSettings = async (data) => {
  return http.patch('/contact-settings', data);
};

export const getContactSettingsByVendorId = async (vendorId) => {
  return http.get(`/contact-settings/vendor/${vendorId}`);
};



export const addMessageLabel = async ({ id, label }) => {
  return http.post(`/contacts/${id}/labels`, { label });
};

// Remove label from message
export const removeMessageLabel = async ({ id, label }) => {
  return http.delete(`/contacts/${id}/labels/${label}`);
};

/**
 * Get email suggestions for autocomplete
 * @param {string} query - Search query
 * @returns {Promise} - Promise with suggestions
 */
export const getEmailSuggestions = async (query) => {
  return http.get(`/contacts/get/email-suggestions?query=${encodeURIComponent(query)}`);
};

/**
 * Send bulk contact message to multiple recipients
 * @param {Object} data - Message data
 * @returns {Promise} - Promise with response
 */
export const sendBulkContactMessage = async (data) => {
  const formData = new FormData();
  
  // إضافة متلقي الرسائل كسلسلة JSON
  formData.append('recipients', JSON.stringify(data.recipients));
  
  // إضافة بقية البيانات
  formData.append('subject', data.subject || '');
  formData.append('serviceType', data.serviceType || 'General');
  formData.append('message', data.message || '');
  formData.append('phone', data.phone || '');
  
  // إضافة المرفقات
  if (data.attachments && data.attachments.length > 0) {
    data.attachments.forEach((attachment, index) => {
      formData.append(`attachment_${index}`, JSON.stringify(attachment));
    });
  }
  
  return http.post('/contacts/send-bulk-message', data);
};



export const forwardContactMessage = async ({ id, recipients, message , fromEmail }) => {
  // Ensure recipients is always an array, even if a single email is passed
  const recipientsArray = Array.isArray(recipients) 
    ? recipients 
    : typeof recipients === 'string' 
      ? [recipients] 
      : [];
      
  return http.post(`/contacts/forward/${id}`, {
    recipients: recipientsArray,
    message,
    fromEmail
  });
};


export const generateGmailAuthUrl = async ({title}) => {
  try {
    const response = await http.get(`/gmail/auth-url?title=${title}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const handleGmailCallback = async (code) => {
  try {
    const response = await http.get(`/gmail/callback-no-token?code=${code}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const sendGmailEmail = async (data) => {
  try {
    const response = await http.post('/gmail/send-email', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const disconnectGmail = async ({title}) => {
  try {
    const response = await http.post(`/gmail/disconnect?title=${title}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getGmailStatus = async () => {
  try {
    const response = await http.get('/gmail/status');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const testEmailSending = async (data) => {
  return http.post('/gmail/test-email', data);
};


//setPrimaryGmailAccount 
export const setPrimaryGmailAccount = async (data) => {
  return http.post('/gmail/set-primary', data);
};

/**
 * Configure SMTP server
 * @param {Object} smtpConfig SMTP configuration
 */
export const configureSMTP = async (smtpConfig) => {
  return http.post('/smtp/configure', smtpConfig);
};

/**
 * Test SMTP connection
 * @param {Object} testData Test email data
 */
export const testSMTPConnection = async (testData) => {
  return http.post('/smtp/test', testData);
};

/**
 * Get SMTP status
 */
export const getSMTPStatus = async () => {
  return http.get('/smtp/status');
};

/**
 * Set SMTP as primary email service
 */
export const setPrimarySMTPServer = async () => {
  return http.post('/smtp/set-primary');
};

/**
 * Disconnect SMTP server
 */
export const disconnectSMTP = async () => {
  return http.delete('/smtp/disconnect');
};



// ... existing code ...

// Add Reply All function
export const sendEmailReplyAll = async ({ id, content, subject }) => {
  try {
    const response = await http.post(`/contacts/reply-all/email/${id}`, { 
      content, 
      subject 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reply to all recipients');
  }
};

// ... existing code ...





// ... existing imports and functions ...

// Virtual Email related services
export const createVirtualEmail = async (data) => {
  try {
    const response = await http.post('/virtual-email', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getVirtualEmails = async () => {
  try {
    const response = await http.get('/virtual-emails');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteVirtualEmail = async (virtualEmail) => {
  try {
    const response = await http.delete(`/virtual-email/${encodeURIComponent(virtualEmail)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const testVirtualEmail = async (data) => {
  try {
    const response = await http.post('/virtual-email/test', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};










// Add this function to your index.js services file

export const getVirtualEmailStats = async (virtualEmail) => {
  try {
    const response = await http.get(`/virtual-email/${encodeURIComponent(virtualEmail)}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching virtual email stats:', error);
    throw error;
  }
};





// Add this function to your services index.js

// Get all email options available to the vendor
export const getVendorEmails = async () => {
  return http.get('/vendor/emails');
};


// Add this new function in your services/index.js file

export const testSendGrid = async (data) => {
  return http.post('/sendgrid/test', data);
};


// -------------JOB MANAGMENT APIS START HERE ---------------

// Job Product API services

export const getJobProductsByVendor = async (page, search, limit, sort) => {
  return http.get(`/vendor/jobproducts?page=${page}&search=${search}&limit=${limit}&sort=${sort}`);
};

export const getJobProductsNoPagination = async () => {
  return http.get(`/vendor/jobproductformat`);
};

export const getJobProductByVendor = async (slug) => {
  return http.get(`/vendor/jobproduct/${slug}`);
};

export const addJobProductByVendor = async (payload) => {
  return http.post(`/vendor/jobproduct`, payload);
};

export const updateJobProductByVendor = async ({ currentSlug, ...payload }) => {
  return http.put(`/vendor/jobproduct/${currentSlug}`, payload);
};

export const deleteJobProductByVendor = async (slug) => {
  return http.delete(`/vendor/jobproduct/${slug}`);
};

export const getJobProductsByVendorFrontend = async (vendorId) => {
  return http.get(`/vendor/jobproductvendorfrontend?vendorId=${vendorId}`);
};

// Job Product Categories API services

export const getJobProductCategoriesByVendor = async (page, search, limit, sort) => {
  return http.get(`/vendor/jobproductcategories?page=${page}&search=${search}&limit=${limit}&sort=${sort}`);
};

// export const getJobProductCategoriesNoPagination = async () => {
//   return http.get(`/vendor/jobproductcategoriesformat`);
// };
// Job Product Categories API service
export const getJobProductCategoriesNoPagination = async () => {
  return http.get(`/vendor/jobproductformat`);
};


export const getJobProductCategoryByVendor = async (slug) => {
  return http.get(`/vendor/jobproductcategory/${slug}`);
};

export const addJobProductCategoryByVendor = async (payload) => {
  return http.post(`/vendor/jobproductcategory`, payload);
};

export const updateJobProductCategoryByVendor = async ({ currentSlug, ...payload }) => {
  return http.put(`/vendor/jobproductcategory/${currentSlug}`, payload);
};

export const deleteJobProductCategoryByVendor = async (slug) => {
  return http.delete(`/vendor/jobproductcategory/${slug}`);
};



//----------Service Duration API services ---------------
// Add to src/services/index.js
export const getServiceDurationsByVendor = async (page, search, limit, sort) => {
  return http.get(`/vendor/servicedurations?page=${page}&search=${search}&limit=${limit}&sort=${sort}`);
};

export const getServiceDurationsNoPagination = async () => {
  return http.get(`/vendor/servicedurationformat`);
};

export const getServiceDurationByVendor = async (slug) => {
  return http.get(`/vendor/serviceduration/${slug}`);
};

export const addServiceDurationByVendor = async (payload) => {
  return http.post(`/vendor/serviceduration`, payload);
};

export const updateServiceDurationByVendor = async ({ currentSlug, ...payload }) => {
  return http.put(`/vendor/serviceduration/${currentSlug}`, payload);
};

export const deleteServiceDurationByVendor = async (slug) => {
  return http.delete(`/vendor/serviceduration/${slug}`);
};


export const generateProductDescription = async (data) => {
  return http.post('/vendor/jobproduct-ai-description', data);
};




//------------Job Forms API services ---------------

// Job Forms API
export const getJobFormsByVendor = async (page, search, limit, sort) => {
  return http.get(`/vendor/jobforms?page=${page}&search=${search}&limit=${limit}&sort=${sort}`);
};

export const getJobFormsNoPagination = async () => {
  return http.get('/vendor/jobforms?limit=1000');
};

export const getJobFormByVendor = async (slug) => {
  return http.get(`/vendor/jobform/${slug}`);
};

export const createJobFormByVendor = async (payload) => {
  return http.post('/vendor/jobform', payload);
};

export const updateJobFormByVendor = async (slug, payload) => {
  return http.put(`/vendor/jobform/${slug}`, payload);
};

export const deleteJobFormByVendor = async (slug) => {
  return http.delete(`/vendor/jobform/${slug}`);
};

export const reorderFormSections = async (payload) => {
  return http.post('/vendor/jobform/reorder-sections', payload);
};

export const reorderSectionFields = async (payload) => {
  return http.post('/vendor/jobform/reorder-fields', payload);
};

export const getJobFormPreviewByVendor = async (slug) => {
  return http.get(`/vendor/jobform-preview/${slug}`);
};

export const getJobFormsByVendorFrontend = async (vendorId) => {
  return http.get(`/vendor/jobformsvendorfrontend?vendorId=${vendorId}`);
};





// Add these functions to your services/index.js file

export const getJobSettings = () => http.get('/job-settings');

export const updateJobSettings = (data) => http.patch('/job-settings', data);

export const getJobSettingsByVendorId = (vendorId) => 
  http.get(`/job-settings/frontend/${vendorId}`);




//------------Job Product CSV Import/Export API services ---------------

// Add these functions to your services/index.js file

// Get sample CSV file for job products
export const getJobProductSampleCSV = async () => {
  try {
    const response = await http.get('/vendor/jobproduct-sample-csv', {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Import job products from CSV


// Export job products to CSV
export const exportJobProductsToCSV = async () => {
  try {
    const response = await http.get('/vendor/jobproduct-export-csv', {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Import job products from CSV
export const importJobProductsFromCSV = async (formData) => {
  return http.post('/vendor/jobproduct-import-csv', formData);
};


// Add this to your services file
export const parseJobProductsCSV = async (formData) => {
  return http.post('/jobproduct/parse-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const bulkCreateJobProducts = async (products) => {
  return http.post('/jobproduct/bulk-create', products);
};

// In src/services/index.js

// Add this new service function
export const getOnlineActiveJobProducts = async () => {
  return http.get('/vendor/online-active-jobproducts');
};

// Add these new service functions
export const searchJobProducts = async (searchTerm = "") => {
  return http.get(`/vendor/search-job-products?search=${encodeURIComponent(searchTerm)}`);
};

export const toggleProductOnlineBooking = async (id, onlineBooking) => {
  return http.patch(`/vendor/toggle-product-booking/${id}`, { onlineBooking });
};


//----------------Custom Field API services ---------------

// Add these functions to your existing index.js

// Custom Fields
export const getCustomFields = async (category, archived = false) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (archived) params.append('archived', 'true');
  
  return http.get(`/vendor/customfields?${params.toString()}`);
};

export const getCustomField = async (id) => {
  return http.get(`/vendor/customfield/${id}`);
};

export const createCustomField = async (fieldData) => {
  return http.post('/vendor/customfield', fieldData);
};

export const updateCustomField = async (id, fieldData) => {
  return http.put(`/vendor/customfield/${id}`, fieldData);
};

export const archiveCustomField = async (id) => {
  return http.patch(`/vendor/customfield/archive/${id}`);
};

export const restoreCustomField = async (id) => {
  return http.patch(`/vendor/customfield/restore/${id}`);
};

export const deleteCustomField = async (id) => {
  return http.delete(`/vendor/customfield/${id}`);
};

export const reorderCustomFields = async (fields, category) => {
  return http.post('/vendor/customfields/reorder', { fields, category });
};

export const getFieldUsageStats = async (id) => {
  return http.get(`/vendor/customfield/usage/${id}`);
};

// ... existing code ...

export const moveFieldBetweenCategories = async (fieldId, sourceCategory, targetCategory, newOrder) => {
  const { data } = await http.post('/vendor/customfields/move-between-categories', {
    fieldId,
    sourceCategory,
    targetCategory,
    newOrder,
  });
  return data;
};



//---------JOB  API services ---------------




// Job Management
export const createJob = async (jobData) => {
  const { data } = await http.post('/jobs', jobData);
  return data;
};

export const getAllJobs = async (page, search, limit,  status = 'all', priority = '', category = '', jobType = '',sort = 'createdAt', filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page,
    search: search || '',
    limit: limit,
    sort: sort || 'createdAt',
    status: status || 'all',
    priority: priority || '',
    category: category || '',
    jobType: jobType || '',
    ...filters
  });
  
  const { data } = await http.get(`/jobs?${queryParams.toString()}`);
  return data;
};

export const getJobById = async (id) => {
  const { data } = await http.get(`/jobs/${id}`);
  return data;
};

export const updateJob = async (id, jobData) => {
  const { data } = await http.put(`/jobs/${id}`, jobData);
  return data;
};

//jobs/:id/main-calendar

export const updateJobinMainCalendar = async (id, jobData) => {
  const { data } = await http.put(`/jobs/${id}/main-calendar`, jobData);
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await http.delete(`/jobs/${id}`);
  return data;
};



export const getJobCalendar = async (startDate, endDate, engineerId) => {
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);
  if (engineerId) queryParams.append('engineerId', engineerId);
  
  const { data } = await http.get(`/job-calendar?${queryParams}`);
  return data;
};

export const updateJobCalendarEntry = async (id, entryData) => {
  const { data } = await http.put(`/job-calendar/${id}`, entryData);
  return data;
};

export const deleteJobCalendarEntry = async (id) => {
  const { data } = await http.delete(`/job-calendar/${id}`);
  return data;
};

export const addJobNote = async (jobId, note) => {
  const { data } = await http.post(`/jobs/${jobId}/notes`, note);
  return data;
};





export const checkJobAvailability = async (date, startTime, endTime, engineerIds, excludeJobId) => {
  const params = new URLSearchParams();
  params.append('date', format(date, 'yyyy-MM-dd'));
  if (startTime) params.append('startTime', startTime);
  if (endTime) params.append('endTime', endTime);
  
  if (engineerIds && engineerIds.length > 0) {
    engineerIds.forEach(id => {
      params.append('engineerIds', id);
    });
  }
  
  if (excludeJobId) params.append('excludeJobId', excludeJobId);
  
  // Use the correct endpoint matching the backend controller
  const { data } = await http.get(`/job-availability?${params.toString()}`);
  console.log("Availability check data:IN SERVICES INDEX.JS ", data);
  return data;
};



// Add to your existing API functions
export const unscheduleJob = async (jobId) => {
  const { data } = await http.put(`/jobs/${jobId}/unschedule`);
  return data;
};

// ----------------🔶️🔷️🔶️ PAYMENT METHODS API 🔶️🔷️🔶️ -----------

export const getPaymentMethods = async () => {
  const { data } = await http.get('/vendor/payment-methods');
  return data;
};

export const createSetupIntent = async () => {
  const { data } = await http.post('/vendor/setup-intent');
  return data;
};

export const deletePaymentMethod = async (paymentMethodId) => {
  const { data } = await http.delete(`/vendor/payment-methods/${paymentMethodId}`);
  return data;
};

export const setDefaultPaymentMethod = async (paymentMethodId) => {
  const { data } = await http.put(`/vendor/payment-methods/${paymentMethodId}/default`);
  return data;
};
