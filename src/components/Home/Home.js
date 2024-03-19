import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Headercarousel from '../Headercarousel/Headercarousel'
import Subscriptionservice from '../Subscriptionservice/Subscriptionservice'
import Latest from '../Latest/Latest'

const Home = () => {

    return (
        <>
           {/* <Navbar/> */}
           <Headercarousel/>
           <Subscriptionservice/>
           <Latest/>

           {/* <Footer/> */}

           
        </>
    );
};

export default Home;