import * as React from "react"
import { SVGProps } from "react";

const EllipseSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={157}
    height={128}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M156.017 117.054c0 29.292-46.754-10.14-76.046-10.14-29.292 0-79.556 39.432-79.556 10.14S50.679.84 79.97.84c29.292 0 76.046 86.922 76.046 116.214Z"
      fill="#F9BA0F"
    />
  </svg>
)

export default EllipseSvg;
