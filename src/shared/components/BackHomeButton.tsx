import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
function BackHomeButton() {
  const navigate = useNavigate();

  //function to handle the navigation to go home
  const handleNavigate = () => navigate("/");
  return (
    <ArrowLeft
      className="fixed ml-2 mt-2 cursor-pointer"
      color="white"
      onClick={handleNavigate}
    />
  );
}

export default BackHomeButton;
