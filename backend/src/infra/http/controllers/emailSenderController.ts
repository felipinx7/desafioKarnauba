import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { CodeResetPassword } from "../../../use-cases/emailSender/codeResetPasswordUseCase";
import { SenderEmailUseCase } from "../../../use-cases/emailSender/senderEmailUseCase";
import { UpdatePasswordUseCase } from "../../../use-cases/emailSender/updatePasswordUseCase";

export class SenderEmailController {
    constructor(
        private senderEmailUseCase: SenderEmailUseCase,
        private codeResetPassword: CodeResetPassword,
        private updatePassword: UpdatePasswordUseCase
    ){}

    async senderEmail(fastify: FastifyContextDTO){
        const { email } = fastify.req.body as { email: string };
        const ip = fastify.req.ip;

        await this.senderEmailUseCase.execute({email, ip});
        fastify.res.send({message: `Send to email: ${email}`})
    }

    async codeReset(fastify: FastifyContextDTO){
        const { email, code } = fastify.req.body as { email: string, code: string };
        const token = await this.codeResetPassword.execute({email, code});
        fastify.res.send({message: "Correct code", token: token});
    }

    async resetPassword(fastify: FastifyContextDTO){
        const { email, password } = fastify.req.body as {email: string, password: string};
        const { token } = fastify.req.params as { token: string }

        const data = await this.updatePassword.execute({email, password, token})
        fastify.res.send({message: "Password changed successfully", ...data})
    }
}