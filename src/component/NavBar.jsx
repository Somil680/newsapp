import React from 'react'
import { Link } from "react-router-dom";

import "./Newstyles.scss"
const NavBar = () => {
    
    const styles = {
        navbar: {
            container: "nfy__navbar__container",
            company_image: "nfy__navbar__company_image",
            navpills: "nfy__navbar__navpills",
            link: "nfy__navbar__link",
        }
    }
    const getCompanyName = () => (
        <div>
            <img className={styles.navbar.company_image} src="./favicon02.png" alt="" />
            <Link className="navbar-brand" to="/">NewsFeedly</Link>
        </div>
    )
    const getNavPillsView = () => (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/General">General</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/business">Business</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/health">Health</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/science">Science</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className={styles.navbar.navpills}><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
        </div>
    )
    const getButtonView = () => (
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    )
return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
        {getCompanyName()}
        {getButtonView()}
        {getNavPillsView()}
    </nav>
)
}
export default NavBar