import { workflowApi } from './bakanaUtils/runWorkflows.js';
import { templateApi } from './bakanaUtils/template.js';
import { combatApi } from './bakanaUtils/combat.js';
import { effectsApi } from './bakanaUtils/effect.js';
import { itemApi } from './bakanaUtils/item.js';
import { dependencyApi } from './bakanaUtils/dependency.js';
import { animationApi } from './bakanaUtils/animations.js';
import { genericApi } from './bakanaUtils/generic.js';

/**
 * Removes a previously exported function or variable and exports the specifed function or variable if the macro is active.
 *
 * @param {array} exportedIdentifierName the array of exported functions to be merged
 */
function setupApiCalls(exportedFunctions) {
  globalThis.macroUtil = foundry.utils.mergeObject(
    globalThis.macroUtil ?? {},
    exportedFunctions
  );
}

/**
 * Initializes the environment with macroUtil for macros
 */
let debugLevel = 0;
const version = '0.12.1';
export function setupBakanaMacros() {
  if (globalThis.macroUtil?.version > version) return;  // only take newest changes
  // Initialize debugLevel variable
  globalThis.macroUtil = foundry.utils.mergeObject(globalThis.macroUtil ?? {}, {
    debugLevel,
    version,
  });

  setupApiCalls(workflowApi);
  setupApiCalls({ template: templateApi });
  setupApiCalls({ combat: combatApi });
  setupApiCalls({ effect: effectsApi });
  setupApiCalls({ item: itemApi });
  setupApiCalls({ dependsOn: dependencyApi });
  setupApiCalls({ animation: animationApi });
  setupApiCalls({ generic: genericApi });
}
