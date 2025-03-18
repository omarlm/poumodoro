import {
  createContext,
  useContext,
  useState,
  //   useEffect,
  ReactNode,
} from "react";

type MuteSoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
};

const MuteSoundContext = createContext<MuteSoundContextType | undefined>(
  undefined,
);

export const MuteSoundProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const savedMuteState = localStorage.getItem("isMuted");
    return savedMuteState ? JSON.parse(savedMuteState) : false;
  });

  //   useEffect(() => {
  //     localStorage.setItem("isMuted", JSON.stringify(isMuted));
  //   }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <MuteSoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MuteSoundContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useMuteSound = () => {
  const context = useContext(MuteSoundContext);
  if (!context) {
    throw new Error("useMuteSound must be used within a MuteSoundProvider");
  }
  return context;
};
