import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
    PopoverContent, 
    Button, 
    Stack, 
} from '@carbon/react';
import Avvvatars from 'avvvatars-react';
import { Link } from 'react-router-dom';
import CustomPopover from "../../molecules/CustomPopover/";
import { logout } from "../../../auth";
import { useContext } from "react";
import { CurrentUserContext } from "../../../App";
import './_navbar.scss';


const Navbar = () => {
    const { user } = useContext(CurrentUserContext);
    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <Header aria-label="Carbon Tutorial">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName as={Link} to="/" prefix="">
                        Carbon Login Form App
                    </HeaderName>
                    <HeaderNavigation aria-label="Carbon Tutorial">
                        <HeaderMenuItem as={Link} target="_blank" to="https://github.com/YingJames/MERNerva-messaging-app/tree/feature">Repositories</HeaderMenuItem>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenuItem as={Link} target="_blank" to="https://github.com/YingJames/MERNerva-messaging-app/tree/feature">Repositories</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar>


                        <CustomPopover align={'bottom-right'}>
                            <HeaderGlobalAction aria-label="Account" tooltipAlignment="end">
                                <Avvvatars value={user.email} size="30" />
                            </HeaderGlobalAction>
                            <PopoverContent>
                                <Stack gap={6} className="popover-content">
                                    <div>
                                        <p className="popover-title">{user.displayName}</p>
                                        <p className="popover-details">{user.email}</p>
                                    </div>
                                    <Button onClick={logout}>Log out</Button>
                                </Stack>
                            </PopoverContent>
                        </CustomPopover>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    );
};

export default Navbar;