import React from "react";
import './Footer.css'
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as FcIcons from "react-icons/fc";
import henrygames from "../../images/iconsFooter/henrygames.png"


const Footer = () => {
  return (
    <div className="containerFooter">
      <div className="Contact">
        <p>Contact me</p>
        <ul className="containerInfoFooter">
          <li>
            <a href='https://www.linkedin.com/in/leandrojuliangomez/'>
              <FaIcons.FaLinkedin size={50} color="#0072b1"/>
            </a>
          </li>
          <li>
            <a href='https://github.com/JulianG1808'>
              <FaIcons.FaGithub size={50} color="#6e5494"/>
            </a>
          </li>
          <li>
            <a href='juliangomez.xvii@gmail.com'>
              <SiIcons.SiGmail size={50} color="#DB4437"/>
            </a>
          </li>
        </ul>
      </div>
      <div className="TechStack">
        <p>Technologies</p>
        <ul className="containerInfoFooter">
          <li>
              <SiIcons.SiJavascript size={50} color="#f7df1e"/>
          </li>
          <li>
            <FaIcons.FaReact size={50} color="#00d8ff"/>
          </li>
          <li>
            <SiIcons.SiRedux size={50} color="#764abc"/>
          </li>
          <li>
            <SiIcons.SiNodedotjs size={50} color="#6cc24a"/>
          </li>
          <li>
            <SiIcons.SiSequelize size={50} color="#0099e5"/>
          </li>
          <li>
            <SiIcons.SiPostgresql size={50} color="#0064a5"/>
          </li>
          <li>
            <FaIcons.FaGitAlt size={50} color="#f34f29"/>
          </li>
          <li>
            <FaIcons.FaCss3 size={50} color="#264de4"/>
          </li>
          <li>
            <FaIcons.FaHtml5 size={50} color="#e34f26"/>
          </li>
        </ul>
      </div>
      <div className="Projects">
        <p>Other Projects</p>
        <ul className="containerInfoFooter">
          <li>
            <a href='https://portfolio-julian.vercel.app/'>
              <FcIcons.FcBriefcase size={50}/>
            </a>
          </li>
          <li>
            <a href='https://henry-games-pg.vercel.app/'>
              <img src={henrygames} alt="henrygames logo" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;