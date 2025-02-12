"use server";
import { cookies } from 'next/headers'
const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

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