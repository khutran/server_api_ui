import { normalize } from '@angular-devkit/core';
import { strings } from '@angular-devkit/core';

import { apply, move, Rule, template, url, mergeWith, chain, Tree } from '@angular-devkit/schematics';

function addDeclarationToApiService(options: any): Rule {
  return (host: Tree) => {
    let readVal = host.read('src/app/api/api.service.ts');
    const declarationRecorder = host.beginUpdate('src/app/api/api.service.ts');
    if (readVal) {
      let val = readVal || '';
      if (val) {
        let str = val.toString();
        if (str.indexOf('@Injectable()') > -1) {
          declarationRecorder.insertLeft(str.indexOf('@Injectable()') - 2, `import { ${strings.classify(options.name)}Service } from './${options.name}/${options.name}.service';`);
        }
        if (str.indexOf('constructor(') > -1) {
          declarationRecorder.insertRight(
            str.indexOf('constructor(') + 'constructor('.length + 1,
            `    public ${strings.camelize(options.name)}: ${strings.classify(options.name)}Service,`
          );
        }
      }
    }
    host.commitUpdate(declarationRecorder);
  };
}

function addDeclarationToApiModule(options: any): Rule {
  return (host: Tree) => {
    let readVal = host.read('src/app/api/api.module.ts');
    const declarationRecorder = host.beginUpdate('src/app/api/api.module.ts');
    if (readVal) {
      let val = readVal || '';
      if (val) {
        let str = val.toString();
        if (str.indexOf('@NgModule({') > -1) {
          declarationRecorder.insertLeft(str.indexOf('@NgModule({') - 1, `import { ${strings.classify(options.name)}Service } from './${options.name}/${options.name}.service';`);
        }
        if (str.indexOf('providers: [') > -1) {
          declarationRecorder.insertRight(str.indexOf('providers: [') + 'providers: ['.length, `${strings.classify(options.name)}Service,`);
        }
      }
    }
    host.commitUpdate(declarationRecorder);
  };
}

// function addDeclarationToServiceProvider(options: any): Rule {
//   return (host: Tree) => {
//     let readVal = host.read('src/app/api/service.provider.ts');
//     const declarationRecorder = host.beginUpdate('src/app/api/service.provider.ts');
//     if (readVal) {
//       let val = readVal || '';
//       if (val) {
//         let str = val.toString();
//         if (str.indexOf('const classes = {') > -1) {
//           declarationRecorder.insertLeft(str.indexOf('const classes = {') - 2, `import ${strings.classify(options.name)} from '../models/${strings.classify(options.name)}';`);
//         }
//         if (str.indexOf('const classes = {') > -1) {
//           declarationRecorder.insertRight(str.indexOf('const classes = {') + 'const classes = {'.length, `${strings.classify(options.name)},`);
//         }
//       }
//     }
//     host.commitUpdate(declarationRecorder);
//   };
// }

function addDeclarationToReducer(options: any): Rule {
  return (host: Tree) => {
    let readVal = host.read('src/app/store/reducers.ts');
    const declarationRecorder = host.beginUpdate('src/app/store/reducers.ts');
    if (readVal) {
      let val = readVal || '';
      if (val) {
        let str = val.toString();
        if (str.indexOf('const RootReducer = (') > -1) {
          declarationRecorder.insertLeft(
            str.indexOf('const RootReducer = (') - 2,
            `import { ${strings.classify(options.name)} } from './../components/${options.name}/${options.name}.reducer';`
          );
        }
        if (str.indexOf('combineReducers({') > -1) {
          declarationRecorder.insertRight(str.indexOf('combineReducers({') + 'combineReducers({'.length, `${strings.classify(options.name)},`);
        }
      }
    }
    host.commitUpdate(declarationRecorder);
  };
}

function addDeclarationToSagas(options: any): Rule {
  return (host: Tree) => {
    let readVal = host.read('src/app/store/sagas.ts');
    const declarationRecorder = host.beginUpdate('src/app/store/sagas.ts');
    if (readVal) {
      let val = readVal || '';
      if (val) {
        let str = val.toString();
        if (str.indexOf('function* watchApiCallError() {') > -1) {
          declarationRecorder.insertLeft(
            str.indexOf('function* watchApiCallError() {') - 2,
            `import ${strings.camelize(options.name)}Saga from './../components/${options.name}/${options.name}.saga';`
          );
        }
        if (str.indexOf('...[fork(watchApiCallError)],') > -1) {
          declarationRecorder.insertRight(str.indexOf('...[fork(watchApiCallError)],') + '...[fork(watchApiCallError)],'.length + 1, `...${strings.camelize(options.name)}Saga,`);
        }
      }
    }
    host.commitUpdate(declarationRecorder);
  };
}

// function addDeclarationToAppRoutingModule(options: any): Rule {
//   return (host: Tree) => {
//     let readVal = host.read('src/app/app-routing.module.ts');
//     const declarationRecorder = host.beginUpdate('src/app/app-routing.module.ts');
//     if (readVal) {
//       let val = readVal || '';
//       if (val) {
//         let str = val.toString();
//         if (str.indexOf('const appRoutes: Routes = [') > -1) {
//           declarationRecorder.insertLeft(
//             str.indexOf('const appRoutes: Routes = [') - 2,
//             `import { ${strings.classify(options.name)}Component } from './components/${options.name}/${options.name}.component';`
//           );
//         }
//         if (str.indexOf("{ path: '', redirectTo: 'inventory', pathMatch: 'full' },") > -1) {
//           declarationRecorder.insertRight(
//             str.indexOf("{ path: '', redirectTo: 'inventory', pathMatch: 'full' },") + "{ path: '', redirectTo: 'inventory', pathMatch: 'full' },".length + 1,
//             `{
//         path: '${options.name}',
//         component: ${strings.classify(options.name)}Component,
//         loadChildren: 'app/components/${options.name}/${options.name}.module#${strings.classify(options.name)}Module'
//       },`
//           );
//         }
//       }
//     }
//     host.commitUpdate(declarationRecorder);
//   };
// }

function addDeclarationToComponentsModule(options: any): Rule {
  return (host: Tree) => {
    let readVal = host.read('src/app/components/components.module.ts');
    const declarationRecorder = host.beginUpdate('src/app/components/components.module.ts');
    if (readVal) {
      let val = readVal || '';
      if (val) {
        let str = val.toString();
        if (str.indexOf('@NgModule({') > -1) {
          declarationRecorder.insertLeft(
            str.indexOf('@NgModule({') - 2,
            `import { ${strings.classify(options.name)}Component } from "./${options.name}/${options.name}.component";`
          );
          declarationRecorder.insertLeft(
            str.indexOf('@NgModule({') - 2,
            `
          import { ${strings.classify(options.name)}Module } from "./${options.name}/${options.name}.module";`
          );
        }
        if (str.indexOf('imports: [') > -1) {
          declarationRecorder.insertRight(str.indexOf('imports: [') + 'imports: ['.length + 1, `${strings.classify(options.name)}Module,`);
        }
        if (str.indexOf('declarations: [') > -1) {
          declarationRecorder.insertRight(str.indexOf('declarations: [') + 'declarations: ['.length, `${strings.classify(options.name)}Component,`);
        }
      }
    }
    host.commitUpdate(declarationRecorder);
  };
}
export default function(options: any): Rule {
  options.path = options.path ? normalize(options.path) : options.path;
  const stringUtils = { ...strings };

  const templateSource = apply(url('./files'), [
    template({
      ...stringUtils,
      ...options
    }),
    move(options.sourceDir)
  ]);
  return chain([
    mergeWith(templateSource),
    addDeclarationToApiService(options),
    addDeclarationToApiModule(options),
    // addDeclarationToServiceProvider(options),
    addDeclarationToReducer(options),
    addDeclarationToSagas(options),
    // addDeclarationToAppRoutingModule(options),
    addDeclarationToComponentsModule(options)
  ]);
}
