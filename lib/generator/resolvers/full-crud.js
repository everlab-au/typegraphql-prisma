"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateCrudResolverClassFromMapping;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const config_1 = require("../config");
const imports_1 = require("../imports");
const helpers_1 = require("./helpers");
function generateCrudResolverClassFromMapping(project, baseDirPath, mapping, model, dmmfDocument, generatorOptions) {
    const resolverDirPath = path_1.default.resolve(baseDirPath, config_1.resolversFolderName, config_1.crudResolversFolderName, model.typeName);
    const filePath = path_1.default.resolve(resolverDirPath, `${mapping.resolverName}.ts`);
    const sourceFile = project.createSourceFile(filePath, undefined, {
        overwrite: true,
    });
    (0, imports_1.generateTypeGraphQLImport)(sourceFile);
    (0, imports_1.generateGraphQLInfoImport)(sourceFile);
    (0, imports_1.generateArgsImports)(sourceFile, mapping.actions
        .filter(it => it.argsTypeName !== undefined)
        .map(it => it.argsTypeName), 0);
    (0, imports_1.generateHelpersFileImport)(sourceFile, 3);
    const distinctOutputTypesNames = [
        ...new Set(mapping.actions.map(it => it.outputTypeName)),
    ];
    const modelOutputTypeNames = distinctOutputTypesNames.filter(typeName => dmmfDocument.isModelTypeName(typeName));
    const otherOutputTypeNames = distinctOutputTypesNames.filter(typeName => !dmmfDocument.isModelTypeName(typeName));
    (0, imports_1.generateModelsImports)(sourceFile, modelOutputTypeNames, 3);
    (0, imports_1.generateOutputsImports)(sourceFile, otherOutputTypeNames, 2);
    sourceFile.addClass({
        name: mapping.resolverName,
        isExported: true,
        decorators: [
            {
                name: "TypeGraphQL.Resolver",
                arguments: [`_of => ${model.typeName}`],
            },
        ],
        methods: mapping.actions.map(action => (0, helpers_1.generateCrudResolverClassMethodDeclaration)(action, mapping, dmmfDocument, generatorOptions)),
    });
}
//# sourceMappingURL=full-crud.js.map