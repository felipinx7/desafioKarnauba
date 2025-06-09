import { prisma } from "../../config/prisma";
import { TaxiDriver } from "../../domain/entities/taxiDriver";
import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";

export class IPrismaTaxiDriverRepository implements ITaxiDriverRepository {
    async createTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null> {
        const taxiDriverCreated = await prisma.taxiDrivers.create({
            data: {
                id: taxiDriver.id,
                name: taxiDriver.name,
                photoURLs: taxiDriver.photoURLs,
                phone: taxiDriver.phone,
                workingDescription: taxiDriver.workingDescription,
                cityId: taxiDriver.cityId
            }
        })

        return taxiDriverCreated
    }

    async updateTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null> {
        const taxiDriverUpdated = await prisma.taxiDrivers.update({
            where: { id: taxiDriver.id },
            data: {
                name: taxiDriver.name,
                photoURLs: taxiDriver.photoURLs,
                phone: taxiDriver.phone,
                workingDescription: taxiDriver.workingDescription,
                cityId: taxiDriver.cityId
            }
        })
        return taxiDriverUpdated;
    }

    async deleteTaxiDriver(id: string): Promise<void> {
        await prisma.taxiDrivers.delete({
            where: { id }
        });
    }

    async getTaxiDriverById(id: string): Promise<TaxiDriver | null> {
        const taxiDriver = await prisma.taxiDrivers.findUnique({
            where: { id }
        });

        return taxiDriver;
    }

    async getAllTaxiDriversByCityId(cityId: string): Promise<TaxiDriver[]> {
        const taxiDrivers = await prisma.taxiDrivers.findMany({
            where: { cityId }
        });

        return taxiDrivers;
    }
}