import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default async function Icon() {
  const imagePath = path.join(process.cwd(), "public/favicon-md.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <img
          src={base64Image}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "scale(1.35)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
