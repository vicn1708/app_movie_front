import { AdminService } from "../services/admin/admin.service";

export const AdminController = {
  browserPage: AdminService.browserPage,
  detail: AdminService.detailMoviePage,
};
