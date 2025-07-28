/* Instruments */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use other storage options if needed

// slices
import productReducer from './slices/product';
import UserReducer from './slices/user';
import WishlistReducer from './slices/wishlist';
import CompareReducer from './slices/compare';
import SettingsReducer from './slices/settings';
import CategoriesReducer from './slices/categories';
import BrandsReducer from './slices/brands';
import ShopsReducer from './slices/shops';
import VerificationReducer from './slices/verification';
import NotificationsReducer from './slices/notifications';
 import PresenceReducer from './slices/presence';
import ChatReducer from './slices/chat'; // Add this line


const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};
const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['wishlist']
};
const comparePersistConfig = {
  key: 'compare',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['products']
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['themeMode', 'themeColor', 'rate', 'currency' ,'sidebarBgColor', 'sidebarTextColor']
};
const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'isAuthenticated']
};

const reducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
  wishlist: persistReducer(wishlistPersistConfig, WishlistReducer),
  compare: persistReducer(comparePersistConfig, CompareReducer),
  categories: CategoriesReducer,
  brands: BrandsReducer,
  shops: ShopsReducer,
  verification: VerificationReducer,
  notifications: NotificationsReducer,
  // presence: PresenceReducer,
  chat: ChatReducer, // Add this line
  
});
export { rootPersistConfig, reducer };
