import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class AdminDeleteUseCase {
    constructor(
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(req: FastifyRequest){
        const user = req.user;
        if (!user) throw new Error("Unauthorized");

        const isAdminExist = await this.adminRepository.getAdminById(user.id);
        if (!isAdminExist) throw new Error("Admin not found");

        await this.adminRepository.deleteAdmin(user.id);
        return isAdminExist;
    }
}