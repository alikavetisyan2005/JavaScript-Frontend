import type { ImgHTMLAttributes } from "react";
import { BASE } from "../helpers/constants";
type Props = ImgHTMLAttributes<HTMLImageElement>;


export const Image = ({ src, alt, ...otherProps }: Props) => {
    const baseURL = BASE + src

  return <img src={baseURL} alt={alt} {...otherProps} />;
};

