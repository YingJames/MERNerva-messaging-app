import { Children, useState } from "react";
import { Popover } from "@carbon/react";

const CustomPopover = ({ align, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const Button = Children.toArray(children)[0];
    const PopoverContent = Children.toArray(children)[1];

    return (
        <Popover
            open={isOpen}
            align={align}
            isTabTip
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setIsOpen(false);
                }
            }}
            onRequestClose={() => setIsOpen(false)} >
            <div onClick={() => setIsOpen(!isOpen)}>
                {Button}
            </div>
            {PopoverContent}
        </Popover>
    );
};

export default CustomPopover;
