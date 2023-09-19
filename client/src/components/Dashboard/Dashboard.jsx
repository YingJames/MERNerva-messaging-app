// import { useContext } from "react";
// import { CurrentUserContext } from "../../App";
import { Content, Theme } from "@carbon/react";
import Navbar from "../organisms/Navbar";
import './_dashboard.scss'
import ChatRoom from "../ChatRoom";
import ChatRoomsSideBar from "../organisms/ChatRoomsSideBar";
import { createContext, useState } from "react";

export const CurrentRoomContext = createContext(null);
const Dashboard = () => {
    const [currentRoom, setCurrentRoom] = useState(null);

    return (
        <>

            <Theme theme={'g90'}>
                <Navbar />
            </Theme>


            <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
                <Content className="cds--content">
                    <ChatRoomsSideBar />
                    <ChatRoom />
                    {/* <h1>Dashboard, Hi {user.displayName}!</h1> */}
                </Content>
            </CurrentRoomContext.Provider>

        </>
    );
};

export default Dashboard;