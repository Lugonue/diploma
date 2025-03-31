import { forwardRef, ComponentProps } from "react";
import { getColor, getSizes } from "./buttonStyles";


const Button = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, 'className'> & {
    color?: 'primary' | 'secondary';
    size?: 'sm' | 'lg';
    additionalClasses?: string
  }
>(({ children, color, size, ...rest }, ref) => {

  const getClasses = () => {
    const classes = ` cursor-pointer p-2 rounded hover:opacity-80 transition-all duration-200 ease-in-out ${getColor(color)} ${getSizes(size)}`

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
