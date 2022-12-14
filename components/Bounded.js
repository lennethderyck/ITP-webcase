import clsx from "clsx";

export const Bounded = ({
  as: Comp = "div",
  size = "base",
  className,
  children,
}) => {
  return (
    <Comp className={clsx("px-4 py-8 md:py-10 md:px-6 lg:py-12", className)}>
      <div
        className={clsx(
          "mx-auto w-100",
          size === "small" && "mw-60",
          size === "base" && "mw-70",
          size === "wide" && "mw-80",
          size === "widest" && "mw-100"
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
