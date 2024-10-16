
/**
 * Main Module Organizational Tools
 */
//import { MyLogger } from './my-logger.js';

import {Core} from './modules/core.mjs'
import * as Apps from './modules/apps.mjs'
import * as Lib from './modules/lib.mjs'

export class MODULE {

  static get meta() {
    return {
      id: 'archon',
    }
  }

  static get EVENTS() {
    return {
      CREATE: this.meta.id + "-create",
      CHANGE: this.meta.id + "-change",
    }
  }

  static get paths() {
    return {
      apps: (relativePath) => `modules/${MODULE.meta.id}/scripts/modules/apps/${relativePath}`,
      assets: (relativePath) => `modules/${MODULE.meta.id}/assets/${relativePath}`,
      cssAsset: (filename) => `../assets/${filename}`
    }
  }

  static get Core() { return Core };
  static get Apps() { return Apps };
  static get Lib() { return Lib };

  static MODULE_INIT = {
    Core,
    ...Lib,
    ...Apps,
  };

  static build() {
    
    /* Initialize all Sub Modules */
    Hooks.on(`setup`, () => {
      Object.values(MODULE.MODULE_INIT).forEach(cl => cl.build ? cl.build(this) : null);
      game.modules.get(`${this.meta.id}`).Archon = Lib.Archon;
      game.modules.get(`${this.meta.id}`).ArchonControl = Apps.ArchonControl;
    });
  }
}


/*
  Initialize Module
*/
MODULE.build();

