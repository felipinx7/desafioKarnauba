import { FastifyInstance } from "fastify";
import { placeInstance } from "../instances/placeInstance";
import { authGuard } from "../../utils/authGuard";
import { authMiddleware } from "../middleware/authMiddleware";


export function placeRegister(fastify: FastifyInstance){
    fastify.post('/place/register/:cityId', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    category: { type: 'string' },
                    phone: { type: 'string', nullable: true },
                    instagram: { type: 'string', nullable: true },
                    location: { type: 'string' },
                    photos: {type: 'array', items: { type: 'string' }},
                },
                required: ['name', 'description', 'category', 'location', 'cityId']
            },
            params: {
                type: 'object',
                properties: {
                    cityId: { type: 'string' }
                },
                required: ['cityId']
            },
            summary: 'Register a new place',
            description: 'This endpoint allows you to register a new place with its details including name, description, category, city ID, phone number, Instagram handle, location, and photos.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                201: {
                    type: 'object',
                    proprieties: {
                        message: { type: 'string' , enum: ['Place created successfully'] },
                        statusCode: { type: 'number', enum: [201] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.create({req, res}));
}

export function placeUpdate(fastify: FastifyInstance){
    fastify.put('/place/update/:id', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    category: { type: 'string' },
                    phone: { type: 'string', nullable: true },
                    instagram: { type: 'string', nullable: true },
                    location: { type: 'string' },
                    photos: {type: 'array', items: { type: 'string' }},
                }
            },
            summary: 'Update a place',
            description: 'This endpoint allows you to update an existing place with its details including name, description, category, city ID, phone number, Instagram handle, location, and photos.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            params: {
                type: 'object',
                properties: {
                    cityId: { type: 'string' }
                },
                required: ['cityId']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Place updated successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.update({req, res}));
}

export function placeDelete(fastify: FastifyInstance){
    fastify.delete('/place/delete/:id', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete a place',
            description: 'This endpoint allows you to delete an existing place by its ID.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Place deleted successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.delete({req, res}));
}

export function placeByCategory(fastify: FastifyInstance){
    fastify.get('/places/:category', (req, res) => placeInstance.findByCategory({req, res}));
}

export function placeFindUnique(fastify: FastifyInstance){
    fastify.get('/place/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            summary: 'Find a place by ID',
            description: 'This endpoint allows you to find a specific place by its ID.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Place found successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.findUnique({req, res}));
}

export function placeFindAll(fastify: FastifyInstance){
    fastify.get('/places', {
        schema: {
            summary: 'Find all places',
            description: 'This endpoint allows you to retrieve a list of all places.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            category: { type: 'string' },
                            cityId: { type: 'string' },
                            phone: { type: 'string', nullable: true },
                            instagram: { type: 'string', nullable: true },
                            location: { type: 'string' },
                            photos: { type: 'array', items: { type: 'string' } }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.findAll({req, res}));
}

export function placeUpdatePhoto(fastify: FastifyInstance){
    fastify.put('/place/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                properties: {
                    photo: { type: 'string' }
                },
                required: ['photo']
            },
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            summary: 'Update a place photo',
            description: 'This endpoint allows you to update an existing place photo by its ID.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo updated successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.updatePhoto({req, res}))
}

export function placeCreatePhoto(fastify: FastifyInstance){
    fastify.post('/place/create/photo/:placeId', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                properties: {
                    photo: { type: 'string' }
                },
                required: ['photo']
            },
            params: {
                type: 'object',
                properties: {
                    placeId: { type: 'string' }
                },
                required: ['placeId']
            },
            summary: 'Create a new place photo',
            description: 'This endpoint allows you to create a new photo for a specific place by its ID.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo created successfully'] },
                        statusCode: { type: 'number', enum: [201] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.createPhoto({req, res}))
}

export function placeDeletePhoto(fastify: FastifyInstance){
    fastify.delete('/place/delete/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            summary: 'Delete a place photo',
            description: 'This endpoint allows you to delete a specific photo of a place by its ID.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo deleted successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                        statusCode: { type: 'number', enum: [400] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                        statusCode: { type: 'number', enum: [401] },
                    }
                },
            }
        }
    }, (req, res) => placeInstance.deletePhoto({req,res}))
}