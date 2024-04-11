import { Cloudinary } from "@cloudinary/url-gen"
import { auto } from "@cloudinary/url-gen/actions/resize"

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME
  }
})

interface Props {
  src: string
  width: number
  height: number
  quality?: string
}

export function resolveImageURL({ src, width, height, quality = "auto" }: Props) {
  const cldSrc = cloudinary
    .image(src)
    .format("auto")
    .quality(quality)
    .resize(auto().width(width).height(height).gravity("auto"))
  if (src.startsWith("http")) cldSrc.setDeliveryType("fetch")
  return cldSrc.toURL()
}
