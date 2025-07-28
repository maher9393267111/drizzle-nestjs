// bolile_dashboard/src/services/customer.js
import engineerHttp from './engineerHttp';



// Add to your services file
export const createEngineer = async (data) => {
    const response = await engineerHttp.post('/engineer/register', data);
    return response.data;
  };
  
  export const loginEngineer = async (credentials) => {
    const response = await engineerHttp.post('/engineer/login', credentials);
    return response.data;
  };
  
  export const getEngineersByVendor = async (vendorId) => {
    const response = await engineerHttp.get(`/engineer/vendor/${vendorId}`);
    return response.data;
  };


  //engineer/get-profile
  export const getEngineerAuth = async () => {
    const response = await engineerHttp.get('/engineer/get-profile');
    return response.data;
  };

  //engineer/update-profile
  export const updateEngineerAuth = async (data) => {
    const response = await engineerHttp.put('/engineer/update-profile', data);
    return response.data;
  };




  // Engineer calendar services
  export const getEngineerCalendar = async () => {
    const response = await engineerHttp.get('/engineer-calendar');
    return response.data;
  };

  export const updateEngineerCalendar = async (data) => {
    const response = await engineerHttp.post('/engineer-calendar', data);
    return response.data;
  };

  export const deleteEngineerCalendarEntry = async (date) => {
    const response = await engineerHttp.delete(`/engineer-calendar/${date}`);
    return response.data;
  };

  export const getEngineerAvailableDates = async () => {
    const response = await engineerHttp.get('/engineer-available');
    return response.data;
  };

  export const bookEngineerDate = async (data) => {
    const response = await engineerHttp.post('/engineer-book', data);
    return response.data;
  };

  export const checkEngineerAvailability = async (params) => {
    const response = await engineerHttp.get('/engineer-check-availability', { params });
    return response.data;
  };

  ///engineer/get-assigned-orders
  export const getEngineerAssignedOrders = async () => {
    const response = await engineerHttp.get('/engineer/get-assigned-orders');
    return response.data;
  };



  //engineer/handle-assignment-response
  export const handleAssignmentResponse = async (data) => {
    const response = await engineerHttp.post('/engineer/handle-assignment-response', data);
    return response.data;
  };



  export const getEngineerOrder = async (orderId) => {
    const response = await engineerHttp.get(`/engineer/order/${orderId}`);
    return response.data;
  };


  export const createEngineerOrderInfo = async (data) => {
    const response = await engineerHttp.post('/engineer/order-info', data);
    return response.data;
  };

  export const getEngineerOrderInfo = async (orderId) => {
    const response = await engineerHttp.get(`/engineer/order-info?orderId=${orderId}`);
    return response.data;
  };

  export const updateEngineerOrderInfo = async (data) => {
    const response = await engineerHttp.put('/engineer/order-info', data);
    return response.data;
  };

  export const getEngineerVendorOrderInfoForm = async () => {
    const response = await engineerHttp.get('/engineer/order-info/form');
    return response.data;
  };



  export const createRecall = async (data) => {
    const response = await engineerHttp.post('/engineer/recall', data);
    return response.data;
  };


  //engineer/notifications
  export const getEngineerNotifications = async (page) => {
    const { data } = await engineerHttp.get(`/engineer/notifications?limit=${page}`);
    return data;
  };


  //engineer/notifications/read
  // export const readEngineerNotification = async (notificationId) => {
  //   const response = await engineerHttp.put(`/engineer/notifications/read/${notificationId}`);
  //   return response.data;
  // };


  // ... existing code ...

// Read single notification
export const readEngineerNotification = async (notificationId) => {
  const response = await engineerHttp.put(`/engineer/notifications/read/${notificationId}`);
  return response.data;
};

// Read all notifications
export const readAllEngineerNotifications = async () => {
  const response = await engineerHttp.put('/engineer/notifications/read-all');
  return response.data;
};


