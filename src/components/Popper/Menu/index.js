import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import MenuItem from "./MenuItems";
import { Wrapper as PopperWrapper } from '~/components/Popper'
import Header from "./Header";
import { useState } from "react";
import { logRoles } from "@testing-library/react";
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children]);
                }
            }} />
        })
    }
    return (
        <Tippy
            interactive
            
            delay={[0, 700]}
            placement="bottom-end"
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {
                            history.length > 1 && <Header title={'Language'} onClick={() => {
                                setHistory(prev => prev.slice(0, prev.length - 1))


                            }} />
                        }
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;