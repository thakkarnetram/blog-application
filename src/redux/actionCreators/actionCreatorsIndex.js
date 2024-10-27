export const updateName = name => {
  return disptach => {
    disptach({
      type: 'updateName',
      payload: name,
    });
  };
};

export const updateEmail = email => {
  return dispatch => {
    dispatch({
      type: 'updateEmail',
      payload: email,
    });
  };
};

export const updatePassword = password => {
  return dispatch => {
    dispatch({
      type: 'updatePassword',
      payload: password,
    });
  };
};

export const updateBlogTitle = blogTitle => {
  return dispatch => {
    dispatch({
      type: 'updateBlogTitle',
      payload: blogTitle,
    });
  };
};

export const updateBlogDescription = blogDescription => {
  return dispatch => {
    dispatch({
      type: 'updateBlogDescription',
      payload: blogDescription,
    });
  };
};

export const updateAllBlogs = allBlogs => {
  return dispatch => {
    dispatch({
      type: 'updateAllBlogs',
      payload: allBlogs,
    });
  };
};
