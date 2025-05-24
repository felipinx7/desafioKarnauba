import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { adminLoginDTO } from "../../infra/dto/adminDTO";
import { adminLoginSchema } from "../../infra/schemas/adminSchema";
import bcrypt from "bcryptjs";
import { ServerError } from "../../infra/utils/serverError";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export class AdminLoginUseCase {
    constructor(private readonly adminRepository: IAdminRepository ){}

    async execute(data: adminLoginDTO){
        const parsedData = adminLoginSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { email, password } = parsedData.data;
        const isAdminExist = await this.adminRepository.getAdminByEmail(email);
        if (!isAdminExist) throw new ServerError("invalid credentials");

        const isPassword = await bcrypt.compare(password, isAdminExist.password);
        if (!isPassword) throw new ServerError("invalid credentials");

        const token = jwt.sign({id: isAdminExist.id}, env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return token;
    }
}