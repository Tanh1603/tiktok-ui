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
    leftIcon,
    rightIcon,
    className,
    onClick,
}) {
    let Comp = "button";
    const _props = {
        onClick,
    };
    // Remove event listener
    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith("on") && typeof _props[key] === "function") {
                delete _props[key];
            }
        });
    }
    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = "a";
    }
    const classes = cx("wrapper", {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        rounded,
        disabled,
    });
    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
