import { createContext, useEffect, useState } from "react";

type ProfileContextType = {
  photo: string | null;
  setPhoto: (photo: string) => void;
};

export const ProfileContext = createContext({} as ProfileContextType);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile_photo");
    if (saved) setPhoto(saved);
  }, []);

  function updatePhoto(photo: string) {
    setPhoto(photo);
    localStorage.setItem("profile_photo", photo);
  }

  return (
    <ProfileContext.Provider value={{ photo, setPhoto: updatePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
}
