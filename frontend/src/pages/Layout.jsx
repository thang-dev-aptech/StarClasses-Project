import MenuBar from "../components/MenuBar";
import Introduction from "../components/Introduction";
import Course from "../components/Course";
import Teacher from "../components/Teacher";
import Contact from "../components/Contact";
import Achievements from "../components/Achievements";
import Footer from "../components/Footer";


function Layout() {
    return (
        <>
            <MenuBar />
            <Introduction />
            <Course />
            <Teacher />
            <Achievements />
            <Contact />
            <Footer />
        </>
    )
}

export default Layout;