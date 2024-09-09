import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    rounded = false,
    children,
    onClick,
}) {
    let Comp = "button";
    const _props = {
        onClick,
    };
    // Remove event listener
    if(disabled) {
        Object.keys(_props).forEach(key => {
            if(key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        })
    }
    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = "a";
    }
    const classes = cx("wrapper", {
        primary,
        outline,
        small,
        large,
        text,
        rounded,
        disabled
    });
    return (
        <Comp className={classes} {..._props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
