import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppMenu from "../../views";
import { Layout, Menu as MenuAntd } from "antd";
const { Sider } = Layout;
const Menu = (props) => {
    let {
        collapsed,
        setCollapsed
    } = props;

    const [collapsedWidth, setCollapsedWidth] = useState(70);

    const getItem = (label = null, key = null, icon = null, children = null, path = null, type = null) => {
        let subMenu, item;
        if (!!children && children.length > 0) {
            subMenu = children.map(sub => {
                return getItem(sub.label, sub.name, sub.icon, sub.subItem, sub.path);
            });
        }
        if (!!subMenu) {
            item = {
                label,
                key,
                icon: !!icon ? React.createElement(icon) : '',
                children: subMenu,
                type
            }
        }
        else {
            item = {
                label: <Link to={path}> {label} </Link>,
                key,
                icon: !!icon ? React.createElement(icon) : '',
                children: subMenu,
                type
            }
        }

        return item;
    }

    const items = AppMenu.map(item => {
        return getItem(item.label, item.name, item.icon, item.subItem, item.path);
    });

    const handleBreakPoint = (broken) => {
        if (broken) {
            setCollapsedWidth(0)
            setCollapsed?.(true);
        }
        else {
            setCollapsedWidth(70);
        }
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={collapsedWidth} breakpoint="lg" onBreakpoint={(broken) => handleBreakPoint(broken)}>
            <MenuAntd
                theme="dark"
                mode="inline"
                items={items}
            />
        </Sider>
    );
}
export default Menu;