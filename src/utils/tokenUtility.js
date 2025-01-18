import { jwtDecode } from "jwt-decode";

// Function to decode the token
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log(error);
    console.error("Failed to decode token:", error);
  }
};
// https://fieldmanagement.cropgenapp.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIEphbiAxMCAyMDI1IDIwOjE0OjQzIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImZpcnN0TmFtZSI6IkFqYXkiLCJsYXN0TmFtZSI6IlByYWphcGF0aSIsInBob25lIjoiOTg5MzY5NTExMSIsImVtYWlsIjoiYWpheUBnbWFpbC5jb20iLCJvcmdhbml6YXRpb24iOiJDcm9weSBEZWFscyIsInJvbGUiOiJmYXJtZXIiLCJ0ZXJtcyI6InRydWUiLCJ1c2VySWQiOiI0IiwiaWF0IjoxNzM2NTIwMjgzfQ.Ympmo0yzciIvc6DqZVhZfQFjp7M1QMKYV-uRta3_3Rw
