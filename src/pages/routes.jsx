import { Routes, Route } from "react-router-dom";
import LogInPage from "./LogPage";
import MainPage from "./MainPage/mainPage";
import UniverPage from "./tablePage/Index";




export default () => (
   <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/:id" element={<UniverPage />} />
      
   </Routes>
)