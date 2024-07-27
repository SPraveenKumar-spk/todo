import React from "react";
import { GoMoveToTop } from "react-icons/go";
import { FaGithub,FaLinkedin,FaTwitter } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
const Footer = React.forwardRef((props, ref) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return(
    <>
    <footer className=" mb-0" ref={ref}>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <h3 className="text-light">Contact US</h3>
      <ul className="contact">
      
        <li>
          <a href="" target="_blank" title="likedin"><FaLinkedin /></a>
        </li>
        <li>
          <a href="mailto:99210042006@klu.ac.in" target="_blank" title="email"><MdAttachEmail /></a>
        </li>
        <li>
          <a href="https://x.com/im_praveen_s" target="_blank" title="twitter"><FaTwitter /></a>
        </li>
      </ul>
     
      <p className="mt-2 text-light">&copy;2024 S.Praveen Kumar | All rights reserved.</p>
      <button onClick={scrollToTop} className="btn btn-light  move-to-top" title="move to top"><GoMoveToTop /></button>
    </footer>
    
    </>
  )
});

export default Footer;