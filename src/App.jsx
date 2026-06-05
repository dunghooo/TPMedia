import Nav from "./components/Nav/Nav";
import "./components/Nav/Nav.css";
import Banner from "./components/Banner/banner";
import "./components/outlines/outlines";
import Outlines from "./components/outlines/outlines";
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";
import ListProject from "./assets/listProject/listProject";
import NavList from "./assets/NavList/NavList";
import ProjectDetail from "./components/projectdetail/projectdetail";
import MemberCard from "./components/MemberCard/membercard";
import ContactUs from "./components/ContactUs/contactUs";
import NotFound from "./components/NotFound/notfound";
import About from "./components/About/about";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Outlines />
              <Footer />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <NavList />
              <ListProject />
              <Footer />
            </>
          }
        />
        <Route
          path="/projectdetail"
          element={
            <>
              <NavList />
              <ProjectDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/memberCards"
          element={
            <>
              <NavList />
              <MemberCard />
              <Footer />
            </>
          }
        />
        <Route
          path="/contactUs"
          element={
            <>
              <NavList />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <NavList />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
