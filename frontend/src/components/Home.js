import React, {useState, useEffect} from 'react'
import ("../App.css")

const Home = () => {
   
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const callHomePage = async () => {
    try {
      const res = await fetch('/getData', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
      });

      const data = await res.json()
      console.log(data);
      setUserName(data.name);
      setShow(true);

      if(!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      
    }
  }

  useEffect(() => {
     callHomePage();
  },[]);

  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero">
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
         <h2>{userName}</h2>
          <h1>Welcome to Raje23</h1>
          <h2>{ show ? 'Happy, to have great designer with us' : 'We are designers.'}</h2>
          <a href="#about" className="btn-get-started">Get Started</a>
        </div>
      </section>
      {/* <!-- End Hero Section --> */}
    </>
  )
}

export default Home