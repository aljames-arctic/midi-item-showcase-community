import { workflowApi } from "./bakanaUtils/registerWorkflow.js";
import { templateApi } from "./bakanaUtils/template.js";

/**
 * Removes a previously exported function or variable and exports the specifed function or variable if the macro is active.
 *
 * @param {array} exportedIdentifierName the array of exported functions to be merged
 */
function setupApiCalls(exportedFunctions) {
    globalThis.macroUtil = foundry.utils.mergeObject(globalThis.macroUtil ?? {}, exportedFunctions);
}

/**
 * Initializes the environment with macroUtil for macros
 */
let debugLevel = 0;
export function setupBakanaMacros() {
    // Initialize debugLevel variable
    globalThis.macroUtil = foundry.utils.mergeObject(globalThis.macroUtil ?? {}, {debugLevel});

    setupApiCalls(workflowApi);
    setupApiCalls({template : templateApi});
}