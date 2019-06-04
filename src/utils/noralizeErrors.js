export default errors => errors.reduce((acc, cv) => {
  // Check if error path already has a key in the acc
  if (cv.path in acc) {
    // Push on to the message array if it does
    acc[cv.path].push(cv.message);
  } else {
    // Otherwise create the error key 
    acc[cv.path] = [cv.message];
  }

  // Return normalized error object
  return acc;
}, {});
