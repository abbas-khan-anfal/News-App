import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Post1 from './components/POST CARDS/Post1';
import Post2 from './components/POST CARDS/Post2';
import Post3 from './components/POST CARDS/Post3';
import Title from './components/Title/Title';
import Footer from './components/Footer/Footer';
import BlogPost from './components/BlogPost/BlogPost';
import Contact from './components/contact/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import Search from './components/Search/Search';
import NotFoundMessage from './components/NotFound/NotFoundMessage';
import NotFound from './components/NotFound/NotFound';
import Admin from './components/Admin/Admin';
import { Toaster } from 'react-hot-toast';
import LgLoader from './components/Loaders/LgLoader';
import Single from './components/Single/Single';

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  },[]);

  if(loader)
  {
    return <LgLoader/>
  }

  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={
          <>
            <Header/>
            <Title title="Latest News"/>
            <Post1/>
            <Title title="Trendings"/>
            <Post2/>
            <Title title="More News"/>
            <Post3/>
            <Footer/>
          </>
        } />
        <Route path="/blog" element={
          <>
            <Header/>
            <Title title="Blogs"/>
            <BlogPost/>
            <Footer/>
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header/>
            <Title title="Contact Us"/>
            <Contact/>
            <Footer/>
          </>
        } />
        <Route path="/about" element={
          <>
            <Header/>
            <Title title="About Us"/>
            <About/>
            <Footer/>
          </>
        } />
        <Route path="/search" element={
          <>
            <Header/>
            <NotFoundMessage/>
            <Footer/>
          </>
        } />
        <Route path="/search/:search" element={
          <>
            <Header/>
            <Search/>
            <Footer/>
          </>
        } />
        <Route path="/postdetail/:id" element={
          <>
            <Header/>
            <Single/>
            <Footer/>
          </>
        } />
        <Route path="*" element={
          <>
            <NotFound/>
          </>
        } />
        <Route path="/admin/*" element={
          <>
            <Admin/>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App;