import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import articleReducer from '../features/articles/articlesSlice';
import controlsReducer from '../features/controls/controlsSlice';
import createArticleReducer from '../features/create/createArticleSlice';
import editArticleReducer from '../features/edit/editArticleSlice';
import singleArticleReducer from '../features/singleArticle/singleArticleSlice';
import notificationReducer from '../features/notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationReducer,
    articles: articleReducer,
    singleArticle: singleArticleReducer,
    controls: controlsReducer,
    create: createArticleReducer,
    edit: editArticleReducer,
  },
});
