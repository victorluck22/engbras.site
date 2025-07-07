import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendPageView } from "../api/services/logService";
import path from "path";

const usePageTracker = () => {
  //const location = useLocation;
  const { user } = useAuth();

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    const sendLog = async () => {
      try {
        const pathName = location.pathname;
        const timeStamp = new Date().toISOString();
        await sendPageView({
          pathName,
          timeStamp,
          user: user?.id ?? null,
        });
      } catch (error) {
        console.error("Erro ao enviar log:", error);
      }
    };

    sendLog();
  }, [location.pathname]);
};

export default usePageTracker;
