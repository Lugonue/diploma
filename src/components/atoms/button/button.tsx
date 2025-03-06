import { forwardRef, ComponentProps } from "react";
import styles from "./button.module.css";


const Button = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, 'className'> & {
    color?: 'primary' | 'secondary';
    size?: 'sm' | 'lg';
    additionalClasses?: string
  }
>(({ children, color, size, ...rest }, ref) => {

  const getClasses = () => {
    let classes = 'p-2 rounded hover:opacity-80 transition-all duration-200 ease-in-out'

    if (color) {
      classes += ` ${styles[color]}`
    }
    if (size) {
      classes += ` ${styles[size]}`
    }
    return classes + " " + rest.additionalClasses
  }

  return (
    <button
      ref={ref}
      className={getClasses()}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
