"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateActionResolverClass;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const config_1 = require("../config");
const imports_1 = require("../imports");
const helpers_1 = require("./helpers");
function generateActionResolverClass(project, baseDirPath, model, action, mapping, dmmfDocument, generatorOptions) {
    const sourceFile = project.createSourceFile(path_1.default.resolve(baseDirPath, config_1.resolversFolderName, config_1.crudResolversFolderName, model.typeName, `${action.actionResolverName}.ts`), undefined, { overwrite: true });
    (0, imports_1.generateTypeGraphQLImport)(sourceFile);
    (0, imports_1.generateGraphQLInfoImport)(sourceFile);
    if (action.argsTypeName) {
        (0, imports_1.generateArgsImports)(sourceFile, [action.argsTypeName], 0);
    }
    (0, imports_1.generateModelsImports)(sourceFile, [model.typeName, action.outputTypeName].filter(typeName => dmmfDocument.isModelTypeName(typeName)), 3);
    (0, imports_1.generateOutputsImports)(sourceFile, [action.outputTypeName].filter(typeName => !dmmfDocument.isModelTypeName(typeName)), 2);
    (0, imports_1.generateHelpersFileImport)(sourceFile, 3);
    sourceFile.addClass({
        name: action.actionResolverName,
        isExported: true,
        decorators: [
            {
                name: "TypeGraphQL.Resolver",
                arguments: [`_of => ${model.typeName}`],
            },
        ],
        methods: [
            (0, helpers_1.generateCrudResolverClassMethodDeclaration)(action, mapping, dmmfDocument, generatorOptions),
        ],
    });
}
//# sourceMappingURL=separate-action.js.map