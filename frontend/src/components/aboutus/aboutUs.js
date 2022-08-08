import React from "react";
import NavBarContainer from "../nav/navBarContainer";
import './about.scss'

class AboutUs extends React.Component {
    render() {
        return (
            <>
                <header>
                    <NavBarContainer />
                </header>
                <div className="about-us">
                    <h1>Meet the devs!</h1>
                    <div className="dev-card-container">
                        <div className="dev-card adam">
                            <div className="dev-photo adam"></div>
                            <div className="dev-info" >
                                <h3>Adam Lin</h3>
                                <h2>Project Lead</h2>
                                <p>Fun Fact: "I'm really good at timing the microwave so that my food comes out the perfect temperature"</p>
                                <p>Future Goals: "I hope to one day work for a company where I can leverage both my knowledge in software and my skills in mechanical engineering"</p>
                            </div>
                            <div className="dev-socials">
                                <a href="https://www.linkedin.com/in/adam-lin-2020/"><i className="fab fa-linkedin"></i></a>
                                <a href="https://github.com/ablin2012"><i className="fab fa-github"></i></a>
                                <a href="https://angel.co/u/adam-lin-10"><i className="fab fa-angellist"></i></a>
                                <a href="#"><i className="fas fa-folder"></i></a>
                            </div>
                        </div>
                        <div className="dev-card lucy">
                        <div className="dev-photo lucy"></div>
                            <div className="dev-info">
                                <h3>Lucy Luo</h3>
                                <h2>Backend Lead</h2>
                                <p>Fun Fact: "I once won second place in a pair badminton competition... but there was only two teams."</p>
                                <p>Future Goals: "To leverage my technical expertise on projects that improve people's lives."</p>
                            </div>
                            <div className="dev-socials">
                            <a href="https://www.linkedin.com/in/lucyluo08/"><i className="fab fa-linkedin"></i></a>
                                <a href="https://github.com/xlucyluo"><i className="fab fa-github"></i></a>
                                <a href="https://angel.co/u/lucyluo"><i className="fab fa-angellist"></i></a>
                                <a href="https://xlucyluo.github.io/portfolio/"><i className="fas fa-folder"></i></a>
                            </div>
                        </div>
                        <div className="dev-card quang">
                        <div className="dev-photo quang"></div>
                            <div className="dev-info">
                                <h3>Quang Tran</h3>
                                <h2>Frontend Lead</h2>
                                <p>Fun Fact: ""</p>
                                <p>Future Goals: ""</p>
                            </div>
                            <div className="dev-socials">
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                                <a href="#"><i className="fab fa-github"></i></a>
                                <a href="#"><i className="fab fa-angellist"></i></a>
                                <a href="#"><i className="fas fa-folder"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AboutUs;