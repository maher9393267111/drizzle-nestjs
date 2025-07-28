import customerHttp from './customerHttp';

export const initiateRegistration = async (customerData) => {
  const { data } = await customerHttp.post('/customer/register/initiate', customerData);
  return data;
};

export const verifyCustomerCode = async (verificationData) => {
  const { data } = await customerHttp.post('/customer/register/verify', verificationData);
  return data;
};

export const loginCustomer = async (credentials) => {
  const { data } = await customerHttp.post('/customer/login', credentials);
  return data;
};


//customer/profile
export const getCustomerAuth = async () => {
  const { data } = await customerHttp.get('/customer/profile');
  return data;
};


export const initiateEmailRegistration = async (customerData) => {
  const { data } = await customerHttp.post('/customer/register-email', customerData);
  return data;
};

export const verifyEmailCode = async (verificationData) => {
  const { data } = await customerHttp.post('/customer/verify-email', verificationData);
  return data;
};

export const resendEmailVerification = async (customerId) => {
  const { data } = await customerHttp.post('/customer/resend-email-verification', { customerId });
  return data;
};


///customer/resend-sms-verification
export const resendSMSVerification = async (customerId) => {
  const { data } = await customerHttp.post('/customer/resend-sms-verification', { customerId });
  return data;
};

//customer/reset-test'
export const resetTest = async (vendorId) => {
  const { data } = await customerHttp.post('/customer/reset-test', { vendorId });
  return data;
};

export const createOrderPaymentIntent = async (orderData) => {
  const { data } = await customerHttp.post('/customer/order/create-payment-intent', orderData);
  return data;
};

export const confirmOrder = async (orderData) => {
  const { data } = await customerHttp.post('/customer/order/confirm-order', orderData);
  return data;
};

export const createPayLaterOrder = async ({ customerId, orderDetails }) => {
  try {
    const response = await customerHttp.post('/customer/order/pay-later', {
      customerId,
      orderDetails
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create pay later order');
  }
};

export const getPayLaterOrders = async (customerId) => {
  try {
    const response = await customerHttp.get(`/customer/order/pay-later/${customerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch pay later orders');
  }
};


export const createCustomerProperty = async (propertyData) => {
  const { data } = await customerHttp.post('/customer/property/create', propertyData);
  return data;
};



// export const getAllOrders = async (params) => {
//   const { data } = await customerHttp.get('/customer/orders', { params });
//   return data;
// };



export const getAllOrders = async (page, search,limit ,sort) => {
  const { data } = await customerHttp.get(`/customer/orders?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
  return data;
};



export const getOrderById = async (id) => {
  const { data } = await customerHttp.get(`/customer/orders/${id}`);
  return data;
};



export const updateOrderImagesByCustomer = async (orderNo, images) => {
  const { data } = await customerHttp.put(`/customer/order-images-update?orderNo=${orderNo}`, { images });
  return data;
};

//updateOrderCustomer
export const updateOrderCustomer = async (orderId, orderData) => {
  const { data } = await customerHttp.put(`/customer/order/update/${orderId}`, orderData);
  return data;
};







export const updateCustomerProperty = async ({ id, ...payload }) => {
  console.log(id , 'propertyId')
  const { data } = await customerHttp.put(`/customer/property/update/${id}`, payload);
  return data;
};

export const deleteCustomerProperty = async (propertyId) => {
  const { data } = await customerHttp.delete(`/customer/property/delete/${propertyId}`);
  return data;
};



export const getCustomerProperties = async (page, search, limit, sort,customerId) => {
  const { data } = await customerHttp.get(
    `/customer/properties?search=${search}&page=${page}&limit=${limit}&sort=${sort}&customerId=${customerId}`
  );
  return data;
};

///customers/update-profile/:id 
export const updateCustomerProfile = async (customerData) => {
  const { data } = await customerHttp.put(`/customers/update-profile`, customerData);
  return data;
};



export const getCustomerOrderAnalytics = async () => {
  const { data } = await customerHttp.get(`/vendor/customer-order/customer-order-analytics`);
  return data;
};

