import { useState, useEffect } from "react";
import { ModalRegister, DrawerList } from "../../components";
import { get } from "../../service";
import Pusher from "pusher-js";
import HeaderLayout from "../../layaout";

const Chat = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { id } = JSON.parse(localStorage.getItem("user"));
 
   const response = await get(`/user/${id}`);
 
   setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("e2d15ca3b72fc61fa8cb", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("my-chat");
    channel.bind("my-list-contacts", async ({ message }) => {
      console.log("message from pusher", message);
    });
  }, []);

  return (
    <HeaderLayout>
      {users.length > 0 && <DrawerList users={users} />}
      <ModalRegister fetchUsers={fetchUsers} />
    </HeaderLayout>
  );
};

export default Chat;
