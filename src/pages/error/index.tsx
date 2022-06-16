import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { NotificationKeys } from "../../services/localKey";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const { addNotification } = useNotification();

  useEffect(() => {
    navigate("/");
    addNotification("Error 404", NotificationKeys.ERROR);
  }, []);

  return <div>Error 404</div>;
};
