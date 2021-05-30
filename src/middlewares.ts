const isAuthenticated = (request) => {
  console.log('isAuthenticated : ',request.user);
    if (!request.user) {
      throw Error("You need to log in to perform this action");
    }
    return;
  };
  
export default isAuthenticated
