import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import Navbar from "./component/Navbar";
// import CreateBlog from "./blogComponent/CreateBlog";
// import BlogDetails from "./blogComponent/BlogDetail";
// import NotFound from "./component/NotFound";
// import Footer from "./component/Footer";
import { Suspense, lazy, useEffect, useState } from "react";
import useFetch from "./util/useFetch";

/* react.lazy()와 suspense를 사용해 App 컴포넌트를 리팩토링 해보세요. */

const Home = lazy(() => import("./Home"));
const Navbar = lazy(() => import("./component/Navbar"));
const CreateBlog = lazy(() => import("./blogComponent/CreateBlog"));
const BlogDetails = lazy(() => import("./blogComponent/BlogDetail"));
const NotFound = lazy(() => import("./component/NotFound"));
const Footer = lazy(() => import("./component/Footer"));
const Loading = lazy(() => import("./component/Loading"));

function App() {
  const { data: blogs, isPending, error } = useFetch("http://localhost:3001/blogs");

  return (
    // <BrowserRouter>
    //   {error && <div>{error}</div>}
    //   <div className="app">
    //     <Navbar />
    //     <div className="content">
    //       <Routes>
    //         <Route exact path="/" element={<Home blogs={blogs} isPending={isPending} />} />
    //         <Route path="/create" element={<CreateBlog />} />
    //         <Route path="/blogs/:id" element={<BlogDetails />} />
    //         <Route path="/blogs/:id" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //     <Footer />
    //   </div>
    // </BrowserRouter>
    <BrowserRouter>
      {error && <div>{error}</div>}
      <Suspense fallback={<Loading />}>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home blogs={blogs} isPending={isPending} />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              {/* 이렇게 path에 *(와일드카드)를 넣으면 매치되는 URL이 없을 때 해당 컴포넌트를 보여줍니다. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
