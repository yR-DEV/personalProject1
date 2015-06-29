module.exports = {
  loginCheckFunction: function(userName, passWord) {
    var errorArr = [];

  },

  accountCreationCheck: function(userName, passWord1, passWord2){
    var errorArr = [];

    if(userName === ""){
      errorArr.push("You cannot leave the Username field Blank");
    }

    if(passWord1 === ""){
      errorArr.push('You cannot leave the first Password field blank');
    }

    if(passWord2 === ""){
      errorArr.push("You cannot leave the second Password field blank");
    }

    if (userName.length < 4){
      errorArr.push('Your Username Must Be At Least 4 characters.');
    }

    if(passWord1 != passWord2){
      errorArr.push("Your Passwords do not match!");
    }

    if(passWord1.length < 6){
      errorArr.push("Your password must contain at least 6 characters");
    }

    return errorArr;
  }

}
