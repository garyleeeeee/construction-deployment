const API_URL = 'http://localhost:8000/v1';

// Sign Up
const httpSignUpUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error(error);
        return {
          ok: false,
          message: error.message
        };
    }
}

//Sign In
const httpSignInUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
}
catch(error) {
    console.error(error);
    return {
      ok: false,
      message: error.message
    };
}
}

//Update User
const httpUpdateUser = async (userData) => {

}

//Get All Users
const httpGetAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    return data;
}
catch(error) {
    console.error(error);
    return {
      ok: false,
      message: error.message
    };
}
}

export {
    httpSignUpUser,
    httpSignInUser,
    httpGetAllUsers,
    httpUpdateUser
}