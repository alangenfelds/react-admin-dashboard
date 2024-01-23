import { Avatar } from "antd";
import { AvatarProps } from "antd/lib";
import { getNameInitials } from "@/utils";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = ({ name = "", style, ...rest }: Props) => {
  return (
    <Avatar
      alt={name || "User avatar"}
      size="small"
      style={{
        backgroundColor: "#1890ff",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name)}
    </Avatar>
  );
};

export default CustomAvatar;
