import Image, { ImageProps } from 'next/image'
import React from 'react'

const CustomImage = ({ src, alt, width, height, ...other }: ImageProps) => (
    <Image src={src} alt={alt} width={width} height={height} {...other} />
)
export default CustomImage
