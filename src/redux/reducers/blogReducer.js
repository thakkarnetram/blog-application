const initialState = {
  allBlogs: [],
  blogTitle: '',
  blogDescription: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateBlogTitle':
      return {...state, blogTitle: action.payload};
    case 'updateBlogDescription':
      return {...state, blogDescription: action.payload};
    case 'updateAllBlogs':
      return {...state, allBlogs: action.payload};
    default:
      return state;
  }
};

export default reducer;
