import Image from "../assets/hero.jpg";
import {useNavigate} from "react-router-dom";
function Hero() {
  const navigate = useNavigate();

  const handleStart = () =>{
    navigate("/createtodo")
  }
  return (
    <div className="container p-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            className="img-fluid rounded-3" 
            src={Image} 
            alt="Hero" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
        <div className="col-lg-6">
          <h1 className="fs-1" style={{ color: "#6f42c1" }}>
            From plans to achievements—your journey starts here.
          </h1>
          <p className="mt-4 fs-5">
            "Transform your ideas into actionable steps and see your goals come to life. Start with a clear plan and achieve more with every task completed."
          </p>
          <div className="text-center mt-4 mb-5">
            <button 
              className="btn  rounded-5 p-3 fs-4 fw-semibold " 
              style={{ color: "#6f42c1", borderColor: "#6f42c1" }}
              onClick={handleStart}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
