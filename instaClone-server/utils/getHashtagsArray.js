const getHashtagsArray = (string) => {
    if(string){
     return string.toLowerCase()
      .split("#")
      .map((hash) => hash.trim())
      .filter((hash) => hash !== "");
    }
    return undefined
  };

  module.exports = getHashtagsArray