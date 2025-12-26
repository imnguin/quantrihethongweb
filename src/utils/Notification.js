import { notification } from "antd";

export const Notification = (title, description, type, placement) => {
  notification[type ?? 'success']({
    message: title ?? 'Thông báo!',
    description: description ?? '',
    placement: placement ?? 'bottomRight',
  });
}