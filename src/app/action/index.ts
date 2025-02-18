"use server";
import { cookies } from 'next/headers'
const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

const cookieStore =  cookies()
const jwtToken = cookieStore.get("jwt")?.value ?? "";

// Fetch unanswered questions



export const getAllQuestions = async () => {
  try {
    const response = await fetch(`${backendurl}/api/users/questions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const likeQuestion = async (questionId:string) => {
  try {
    const response = await fetch(`${backendurl}/api/users/like/${questionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to like question");

    return await response.json(); // Assuming backend sends back updated question
  } catch (error) {
    console.error("Error liking question:", error);
    throw error; // Propagate error for further handling if needed
  }
};


export const fetchAnsweredQuestions = async () => {
  try {
    const url = `${backendurl}/api/users/answered`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
export const fetchUnansweredQuestions = async () => {
  try {
   
    const url = `${backendurl}/api/users/unanswered`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// Answer a question
export const answerQuestion = async (questionId: string, answer: string) => {
  try {
    const url = `${backendurl}/api/users/answer`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "PUT",
      body: JSON.stringify({ questionId, answer }),
    });

    if (!response.ok) {
      throw new Error("Failed to answer the question");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error answering question:", error);
    return { error: error.message };
  }
};


export const login = async (email:string,password:string) => {
    try {
      const url = `${backendurl}/api/users/auth`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({email,password}),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message);
      }
  
      const data = await response.json();
      if("token" in data){
        const cookieStore = await cookies()
 
        cookieStore.set({
          name: 'jwt',
          value: data.token,
          secure:false,
          httpOnly: true,
          sameSite: 'lax',
        })
      }
      
      return data;
    } catch (error:any) {
      console.error("Error login in:", error);
      return   { error: error.message || "An unknown error occurred" };
    }
};

export const register = async (formData:any) => {
    try {
      const url = `${backendurl}/api/users/`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message);
      }
  
      const data = await response.json();
      if("token" in data){
        const cookieStore = await cookies()
 
        cookieStore.set({
          name: 'jwt',
          value: data.token,
          secure:false,
          httpOnly: true,
          sameSite: 'lax',
        })
      }
      return data;
    } catch (error:any) {
      console.error("Error login in:", error);
      return   { error: error.message || "An unknown error occurred" };
    }
  };


  export const contact = async (formData:any) => {
    try {
      const url = `${backendurl}/api/users/contactMessage`;
      console.log(jwtToken,":");
      
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message);
      }
  
      const data = await response.json();
     
      return data;
    } catch (error:any) {
      console.error("Error login in:", error);
      return   { error: error.message || "An unknown error occurred" };
    }
  };


  export const getProfile = async () => {
    try {
      const url = `${backendurl}/api/users/profile`;
      console.log(jwtToken,":");
      
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        },
        method: "GET",
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message);
      }
  
      const data = await response.json();
     
      return data;
    } catch (error:any) {
      console.error("Error login in:", error);
      return   { error: error.message || "An unknown error occurred" };
    }
  };



  export const postAnnouncement = async (announcementData: any) => {
    try {
      const url = `${backendurl}/api/users/announcement`; 
      console.log(jwtToken, ":"); 
  
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "POST",
        body: JSON.stringify(announcementData), 
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message); 
        throw new Error(data.message);
      }
  
      const data = await response.json();
      return data; 
    } catch (error: any) {
      console.error("Error posting announcement:", error);
      return { error: error.message || "An unknown error occurred" };
    }
  };
  

  export const getAnnouncements = async () => {
    try {
      const url = `${backendurl}/api/users/announcement`; 
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(data.message);
      }
  
      const data = await response.json();
      return data; 
    } catch (error: any) {
      console.error("Error fetching announcements:", error);
      return { error: error.message || "An unknown error occurred" };
    }
  };
  
  export const deleteQuestion = async (id: string) => {    
    try {
      console.log(id, "wew", `${backendurl}/api/users/questions/${id}`);
      
      const res = await fetch(`${backendurl}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete question");
      }

      return await res.json();
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };
