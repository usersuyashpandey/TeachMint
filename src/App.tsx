import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import post from "./utils/data/PostList.json";
import user from "./utils/data/UserList.json";
import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";
import { useState } from "react";
import { Tpost, Tuser } from "./utils/types";

function App() {
  const [posts, setPosts] = useState<Tpost[]>(post);
  const [users, setusers] = useState<Tuser[]>(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList users={users} posts={posts} />} />
        <Route path="/user/:userId" element={<UserDetails user={users} />} />
      </Routes>
    </Router>
  );
}

export default App;
