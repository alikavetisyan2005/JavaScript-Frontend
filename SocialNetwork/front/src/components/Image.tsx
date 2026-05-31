import type { ImgHTMLAttributes } from "react"
type Props = ImgHTMLAttributes<HTMLImageElement>
export const Image = ({src, alt ,...otherProps}: Props) => {
    return (
        <img
        src={src}
        alt={alt}
        {...otherProps}
        />
    )
}