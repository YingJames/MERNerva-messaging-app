// import { useContext } from "react";
// import { CurrentUserContext } from "../../App";
import { Content, Theme } from "@carbon/react";
import Navbar from "../organisms/Navbar";
import './_dashboard.scss'
import ChatRoom from "../ChatRoom";
import ChatRoomsSideBar from "../organisms/ChatRoomsSideBar";

const Dashboard = () => {

    return (
        <>

            <Theme theme={'g90'}>
                <Navbar />
            </Theme>


            <Content className="cds--content">
                <ChatRoomsSideBar />
                <ChatRoom />
                {/* <h1>Dashboard, Hi {user.displayName}!</h1> */}
            </Content>

        </>
    );
};

export default Dashboard;