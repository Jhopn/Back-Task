import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Task API',
        description: 'API para registro de tarefas diárias'
    },
    host: 'localhost:4000',
    schemes: ['http'], 
}

const outputFile: string = './swagger-output.json';
const endpointsFiles: string[] = ['../server.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    require('../server.ts');
}).catch(error => {
    console.error("Erro ao gerar a documentação Swagger:", error);
});