import { AdminCreateUseCase } from "../../../use-cases/admin/adminCreateUseCase";
import { AdminDeleteUseCase } from "../../../use-cases/admin/adminDeleteUseCase";
import { AdminFindUniqueUseCase } from "../../../use-cases/admin/adminFindUniqueUseCase";
import { AdminLoginUseCase } from "../../../use-cases/admin/adminLoginUseCase";
import { AdminUpdateUseCase } from "../../../use-cases/admin/adminUpdateUseCase";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";
import { AdminController } from "../controllers/adminController";

const prismaAdminRepository = new IPrismaAdminReposotory();
const adminCreateUseCase = new AdminCreateUseCase(prismaAdminRepository);
const adminUpdateUseCase = new AdminUpdateUseCase(prismaAdminRepository);
const adminDeleteUseCase = new AdminDeleteUseCase(prismaAdminRepository);
const adminFindUniqueUseCase = new AdminFindUniqueUseCase(prismaAdminRepository);
const adminLoginUseCase = new AdminLoginUseCase(prismaAdminRepository);

export const adminInstace = new AdminController(adminCreateUseCase, adminUpdateUseCase, adminDeleteUseCase, adminFindUniqueUseCase, adminLoginUseCase);