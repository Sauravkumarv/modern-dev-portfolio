const buttonVariants = {
  primary: "primary-button",
  secondary: "secondary-button",
};

const Button = ({
  as: Component = "a",
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const variantClass = buttonVariants[variant] ?? buttonVariants.primary;

  return (
    <Component className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export default Button;
